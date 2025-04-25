import { Controller } from '@nestjs/common';
import { AuthService } from './providers/auth.service';

/**
 * Handles authentication-related routes.
 */
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
}
