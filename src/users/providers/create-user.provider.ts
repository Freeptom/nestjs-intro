import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { InjectRepository } from '@nestjs/typeorm';
import { MailService } from 'src/mail/providers/mail.service';
/**
 * Service provider for user creation operations.
 *
 * Handles the creation of user records in a single operation,
 * including password hashing and database transaction management.
 * Sends mail confirmation once the user has been created.
 *
 * @example
 * const user = await this.usersService.createUser(createUserDto);
 */
@Injectable()
export class CreateUserProvider {
  /**
   * Creates an instance of CreateUserProvider with required dependencies.
   *
   * @param usersRepository - Database connection for user operations
   * @param hashingProvider - Service for password hashing and security operations
   * @param mailService - Service for sending emails
   */
  constructor(
    /**
     * Inject usersRepository
     */
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    /**
     * Inject hashingProvider
     */
    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,
    /**
     * Inject MailService
     */
    private readonly mailService: MailService,
  ) {}
  /**
   * The method to create a user
   */
  public async createUser(createUserDto: CreateUserDto) {
    // Check if user already exists with the same email
    let existingUser: User | null = null;
    try {
      existingUser = await this.usersRepository.findOne({
        where: {
          email: createUserDto.email,
        },
      });
    } catch (error) {
      // Might save the details of the exception
      // Info which is sensitive
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try again later.',
        {
          description: 'Error connecting to the database',
        },
      );
    }
    // Handle exception
    if (existingUser) {
      throw new BadRequestException(
        'This user already exists, please check your email',
      );
    }
    let newUser = this.usersRepository.create({
      ...createUserDto,
      password: await this.hashingProvider.hashPassword(createUserDto.password),
    });
    try {
      newUser = await this.usersRepository.save(newUser);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try again later.',
        {
          description: 'Error connecting to the database',
        },
      );
    }
    try {
      await this.mailService.sendUserWelcome(newUser);
    } catch (error) {
      throw new RequestTimeoutException(error);
    }
    return newUser;
  }
}
