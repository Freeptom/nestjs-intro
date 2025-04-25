import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
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
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}
  /**
   * Authenticates a user with the given credentials.
   */
  public login(email: string, password: string, id: string) {
    // Check if user exists
    const users = this.usersService.findOneById('1234');
    return 'SAMPLE_TOKEN';
  }
  /**
   * Checks whether the user is authenticated.
   */
  public isAuth() {
    return true;
  }
}
