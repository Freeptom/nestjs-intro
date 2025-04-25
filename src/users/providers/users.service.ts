import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { AuthService } from 'src/auth/providers/auth.service';
/**
 * Class to connect Users table and perform business operations
 */
@Injectable()
export class UsersService {
  /**
   * Connects the auth service to the users service
   */
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}
  /**
   * The method to get all the users from the database
   */
  public findAll(
    getUsersParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {
    const isAuth = this.authService.isAuth();
    console.log(isAuth);
    return [
      {
        firstName: 'John',
        email: 'john@doe.com',
      },
      {
        firstName: 'Alice',
        email: 'alice@doe.com',
      },
    ];
  }
  /**
   * The method to get a single user from the database
   */
  public findOneById(id: string) {
    return [
      {
        id: 1234,
        firstName: 'Alice',
        email: 'alice@doe.com',
      },
    ];
  }
}
