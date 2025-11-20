import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { SignInDto } from './dtos/signin.dto';
import { AuthType } from './enums/auth-type.enum';
import { Auth } from './decorators/auth.decorator';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
/**
 * The auth controller.
 * Handles user authentication using the auth service.
 */
@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(
    /**
     * Creates an instance of the  authentication controller with required dependencies.
     *
     * @param authService - The auth service instance that handles authentication logic and data operations
     */
    private readonly authService: AuthService,
  ) {}
  /**
   * Authenticates a user
   */
  @ApiOperation({
    summary: 'Authenticates a user through the auth service',
  })
  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  @Auth(AuthType.None)
  public async signIn(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(signInDto);
  }
  /**
   * Refreshes the user's bearer token
   */
  @ApiOperation({
    summary: `Refreshes the user's bearer token`,
  })
  @Post('refresh-tokens')
  @HttpCode(HttpStatus.OK)
  @Auth(AuthType.None)
  public async refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    return await this.authService.refreshTokens(refreshTokenDto);
  }
}
