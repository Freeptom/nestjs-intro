import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { User } from '../user.entity';
import { DataSource } from 'typeorm';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';
import { HashingProvider } from 'src/auth/providers/hashing.provider';

@Injectable()
export class UsersCreateManyProvider {
  constructor(
    /**
     * Inject datasource
     */
    private readonly dataSource: DataSource,
    /**
     * Inject hashingProvider
     */
    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,
  ) {}
  public async createMany(createManyUsersDto: CreateManyUsersDto) {
    const newUsers: User[] = [];
    // Create query runner instance
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      // Connect qr to db
      await queryRunner.connect();
      // Start transaction
      await queryRunner.startTransaction();
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try again later.',
        {
          description: 'Error connecting to the database',
        },
      );
    }
    try {
      for (const user of createManyUsersDto.users) {
        const userWithHashedPassword = {
          ...user,
          password: await this.hashingProvider.hashPassword(user.password),
        };
        const newUser = queryRunner.manager.create(
          User,
          userWithHashedPassword,
        );
        console.log('newUser', newUser);
        const result = await queryRunner.manager.save(newUser);
        console.log('result', result);
        newUsers.push(result);
      }
      // If successful -> commit transaction
      await queryRunner.commitTransaction();
    } catch (error) {
      // if unsuccessful -> rollback
      await queryRunner.rollbackTransaction();
      throw new ConflictException('Could not complete the transaction', {
        description: String(error),
      });
    } finally {
      try {
        await queryRunner.release();
      } catch (error) {
        console.error('Failed to release query runner', error);
      }
    }
    console.log('newUsers', newUsers);
    return newUsers;
  }
}
