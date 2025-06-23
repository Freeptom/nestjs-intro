import { Repository } from 'typeorm';
import {
  Injectable,
  forwardRef,
  RequestTimeoutException,
  NotFoundException,
} from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserProvider } from './create-user.provider';
import { UsersCreateManyProvider } from './users-create-many.provider';
import { CreateUserDto } from '../dtos/create-user.dto';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
import { GetUsersDto } from '../dtos/get-users.dto';
import { FindOneUserByEmailProvider } from './find-one-user-by-email.provider';
import { FindOneByGoogleIdProvider } from './find-one-by-google-id.provider';

/**
 * Class to connect Users table and perform business operations
 */
@Injectable()
export class UsersService {
  /**
   * Connects the auth service to the users service
   */
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    /**
     * Inject createUserProvider
     */
    private readonly createUserProvider: CreateUserProvider,
    /**
     * Inject usersCreateManyProvider
     */
    private readonly usersCreateManyProvider: UsersCreateManyProvider,
    /**
     * Injects PaginationProvider
     */
    private readonly paginationProvider: PaginationProvider,
    /**
     * Injects findOneUserByEmailProvider
     */
    private readonly findOneUserByEmailProvider: FindOneUserByEmailProvider,
    /**
     * Injects findOneByGoogleIdProvider
     */
    private readonly findOneByGoogleIdProvider: FindOneByGoogleIdProvider,
  ) {}
  /**
   * The method to get all the users from the database
   */
  public async findAll(
    userQuery: GetUsersDto,
    userId: GetUsersParamDto,
  ): Promise<Paginated<User>> {
    // Users Service
    const users = await this.paginationProvider.paginateQuery(
      {
        limit: userQuery.limit,
        page: userQuery.page,
      },
      this.usersRepository,
      {
        posts: true,
      },
    );
    return users;
  }
  /**
   * The method to get a single user from the database
   */
  public async findOneById(id: number) {
    let user: User | null = null;
    try {
      user = await this.usersRepository.findOneBy({ id });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try again later.',
        {
          description: 'Error connecting to the database',
        },
      );
    }
    /**
     * Handle if the user doesn't exist
     **/
    if (!user) {
      throw new NotFoundException('The user id does not exist');
    }
    return user;
  }
  /**
   * Create user
   */
  public async createUser(createUserDto: CreateUserDto) {
    return await this.createUserProvider.createUser(createUserDto);
  }
  /**
   * Create multiples users
   */
  public async createMany(createManyUsersDto: CreateManyUsersDto) {
    return await this.usersCreateManyProvider.createMany(createManyUsersDto);
  }
  /**
   * Find a user by email
   */
  public async findOneByEmail(email: string) {
    return await this.findOneUserByEmailProvider.findOneByEmail(email);
  }
  /**
   * Find a user by google id
   */
  public async findOneByGoogleId(googleId: string) {
    return await this.findOneByGoogleIdProvider.findOneByGoogleId(googleId);
  }
}
