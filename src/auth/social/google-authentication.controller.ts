import { Body, Controller, Post } from '@nestjs/common';
import { GoogleAuthenticationService } from './providers/google-authentication.service';
import { GoogleTokenDto } from './dtos/google-token.dto';
import { Auth } from '../decorators/auth.decorator';
import { AuthType } from '../enums/auth-type.enum';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
/**
 * The google auth controller.
 * Handles user authentication using the google auth service.
 */
@Auth(AuthType.None)
@Controller('auth/google-authentication')
@ApiTags('Google Authentication')
export class GoogleAuthenticationController {
  constructor(
    /**
     * Creates an instance of the google authentication controller with required dependencies.
     *
     * @param googleAuthenticationService - The google auth service instance that handles authentication logic and data operations
     */
    private readonly googleAuthenticationService: GoogleAuthenticationService,
  ) {}
  /**
   * Authenticates a user using Google OAuth token
   */
  @ApiOperation({
    summary: 'Authenticates a user through google authentication',
  })
  @Post()
  public authenticate(@Body() googleTokenDto: GoogleTokenDto) {
    return this.googleAuthenticationService.authenticate(googleTokenDto);
  }
}
