import { forwardRef, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import jwtConfig from 'src/auth/config/jwt.config';
import { GoogleTokenDto } from '../dtos/google-token.dto';
import { UsersService } from 'src/users/providers/users.service';
import { GenerateTokensProvider } from 'src/auth/providers/generate-tokens.provider';
@Injectable()
export class GoogleAuthenticationService implements OnModuleInit {
  private oauthClient: OAuth2Client;
  constructor(
    /**
     * Inject usersService
     */
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    /**
     * Inject jwt configuration
     */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    /**
     * Inject generateTokensProvider
     */
    private readonly generateTokensProvider: GenerateTokensProvider,
  ) {
    console.log('GoogleAuthenticationService constructor called');
  }
  onModuleInit() {
    console.log('on init');
    const clientId = this.jwtConfiguration.googleClientId;
    const clientSecret = this.jwtConfiguration.googleClientSecret;
    this.oauthClient = new OAuth2Client(clientId, clientSecret);
    console.log('OAuth2Client initialized successfully');
  }

  public async authenticate(googleTokenDto: GoogleTokenDto) {
    console.log('on authenticate');

    console.log('google token dto', googleTokenDto);
    // verify the token
    const loginTicket = await this.oauthClient.verifyIdToken({
      idToken: googleTokenDto.token,
    });
    console.log('login ticket', loginTicket);
    // extract the payload from the google jwt
    const payload = loginTicket.getPayload();
    if (payload) {
      const { email, sub: googleId } = payload;
      // find the user in the db based on the googleId
      const user = await this.usersService.findOneByGoogleId(googleId);
      // If user exists, generate tokens
      if (user) {
        return this.generateTokensProvider.generateTokens(user);
      }
    }
    // Otherwise, create a new user and then generate tokens
    // throw unauthorized exception
  }
}
