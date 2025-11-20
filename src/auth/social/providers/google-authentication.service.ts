import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import jwtConfig from 'src/auth/config/jwt.config';
import { GoogleTokenDto } from '../dtos/google-token.dto';
import { UsersService } from 'src/users/providers/users.service';
import { GenerateTokensProvider } from 'src/auth/providers/generate-tokens.provider';
@Injectable()
export class GoogleAuthenticationService {
  private oauthClient: OAuth2Client | null = null;
  private initialized = false;
  private readonly clientId: string;
  private readonly clientSecret: string;

  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    @Inject(jwtConfig.KEY)
    jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly generateTokensProvider: GenerateTokensProvider,
  ) {
    this.clientId = jwtConfiguration.googleClientId ?? '';
    this.clientSecret = jwtConfiguration.googleClientSecret ?? '';
  }

  private setupOAuthClient() {
    if (!this.initialized) {
      this.oauthClient = new OAuth2Client(this.clientId, this.clientSecret);
      this.initialized = true;
    }
  }

  public async authenticate(googleTokenDto: GoogleTokenDto) {
    try {
      this.setupOAuthClient();

      if (!this.oauthClient) {
        throw new UnauthorizedException('OAuth client not available');
      }
      const loginTicket = await this.oauthClient.verifyIdToken({
        idToken: googleTokenDto.token,
      });
      const payload = loginTicket?.getPayload();
      if (!payload?.email || !payload?.sub) {
        throw new UnauthorizedException('Invalid Google token');
      }
      const {
        email,
        sub: googleId,
        given_name: firstName = '',
        family_name: lastName = '',
      } = payload;
      const user = await this.usersService.findOneByGoogleId(googleId);
      if (!user) {
        const newUser = await this.usersService.createGoogleUser({
          email: email,
          firstName,
          lastName,
          googleId: googleId,
        });
        return this.generateTokensProvider.generateTokens(newUser);
      }
      return this.generateTokensProvider.generateTokens(user);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
