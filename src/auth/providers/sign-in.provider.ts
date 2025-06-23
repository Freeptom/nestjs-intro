import {
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from '../dtos/signin.dto';
import { UsersService } from 'src/users/providers/users.service';
import { HashingProvider } from './hashing.provider';
import { GenerateTokensProvider } from './generate-tokens.provider';
@Injectable()
export class SignInProvider {
  constructor(
    /**
     * Inject usersService
     */
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    /**
     * Inject hashingProvider
     */
    private readonly hashingProvider: HashingProvider,
    /**
     * Inject generateTokensProvider
     */
    private readonly generateTokensProvider: GenerateTokensProvider,
  ) {}
  public async signIn(signInDto: SignInDto) {
    // Find the user with email address
    // Throw exception if not found
    const user = await this.usersService.findOneByEmail(signInDto.email);
    // Compare password to hash
    let isEqual: boolean = false;
    if (user?.password) {
      try {
        isEqual = await this.hashingProvider.comparePassword(
          signInDto.password,
          user.password,
        );
      } catch (error) {
        throw new RequestTimeoutException(error, {
          description: 'Could not compare passwords',
        });
      }
    }
    if (!isEqual) {
      throw new UnauthorizedException('Incorrect password, please try again.');
    }
    return await this.generateTokensProvider.generateTokens(user);
  }
}
