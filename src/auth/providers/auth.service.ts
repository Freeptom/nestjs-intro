import { Injectable } from '@nestjs/common';
import { SignInDto } from '../dtos/signin.dto';
import { SignInProvider } from './sign-in.provider';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { RefreshTokensProvider } from './refresh-tokens.provider';
/**
 * Service responsible for handling authentication logic.
 * Delegates user-related operations to the UsersService.
 */
@Injectable()
export class AuthService {
  /**
   * Connects the UsersService to the AuthService via dependency injection.
   */
  constructor(
    /**
     * Inject signInProvider
     */
    private readonly signInProvider: SignInProvider,
    /**
     * Inject refreshTokensProvider
     */
    private readonly refreshTokensProvider: RefreshTokensProvider,
  ) {}
  /**
   * Authenticates a user with the given credentials.
   */
  public async signIn(signInDto: SignInDto) {
    return await this.signInProvider.signIn(signInDto);
  }
  public async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    return await this.refreshTokensProvider.refreshTokens(refreshTokenDto);
  }
}
