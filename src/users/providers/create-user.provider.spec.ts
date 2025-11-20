import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CreateUserProvider } from './create-user.provider';
import { MailService } from 'src/mail/providers/mail.service';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { DataSource, Repository, ObjectLiteral } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { BadRequestException, RequestTimeoutException } from '@nestjs/common';

type MockRepository<T extends ObjectLiteral = any> = Partial<
  Record<keyof Repository<T>, jest.Mock>
>;
const createMockRepository = <
  T extends ObjectLiteral,
>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
});

type MockMailService = {
  sendUserWelcome: jest.MockedFunction<(user: any) => Promise<void>>;
};

describe('CreateUserProvider', () => {
  let provider: CreateUserProvider;
  let usersRepository: MockRepository;
  let mailService: MockMailService;
  let hashingProvider: { hashPassword: jest.Mock };

  const user = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@doe.com',
    password: 'password',
  };
  const hashedPassword = 'hashed_password_123';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserProvider,
        {
          provide: DataSource,
          useValue: {},
        },
        {
          provide: getRepositoryToken(User),
          useValue: createMockRepository(),
        },
        {
          provide: MailService,
          useValue: { sendUserWelcome: jest.fn(() => Promise.resolve()) },
        },
        {
          provide: HashingProvider,
          useValue: {
            hashPassword: jest.fn().mockResolvedValue(hashedPassword),
          },
        },
      ],
    }).compile();
    provider = module.get<CreateUserProvider>(CreateUserProvider);
    usersRepository = module.get(getRepositoryToken(User));
    mailService = module.get(MailService);
    hashingProvider = module.get(HashingProvider);
  });
  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
  describe('createUser', () => {
    describe('When the user does not exist in database', () => {
      it('should create a new user with hashed password', async () => {
        const userWithHashedPassword = { ...user, password: hashedPassword };

        usersRepository.findOne?.mockResolvedValue(null);
        usersRepository.create?.mockReturnValue(userWithHashedPassword);
        usersRepository.save?.mockResolvedValue(userWithHashedPassword);

        const newUser = await provider.createUser(user);

        expect(usersRepository.findOne).toHaveBeenCalledWith({
          where: {
            email: user.email,
          },
        });
        expect(hashingProvider.hashPassword).toHaveBeenCalledWith(
          user.password,
        );
        expect(usersRepository.create).toHaveBeenCalledWith({
          ...user,
          password: hashedPassword,
        });
        expect(usersRepository.save).toHaveBeenCalledWith(
          userWithHashedPassword,
        );
        expect(newUser).toEqual(userWithHashedPassword);
      });

      it('should send a welcome email after user is created', async () => {
        const userWithHashedPassword = { ...user, password: hashedPassword };

        usersRepository.findOne?.mockResolvedValue(null);
        usersRepository.create?.mockReturnValue(userWithHashedPassword);
        usersRepository.save?.mockResolvedValue(userWithHashedPassword);

        await provider.createUser(user);
        expect(mailService.sendUserWelcome).toHaveBeenCalledWith(
          userWithHashedPassword,
        );
        expect(mailService.sendUserWelcome).toHaveBeenCalledTimes(1);
      });

      it('should throw RequestTimeoutException when database save fails', async () => {
        const dbError = new Error('Database connection failed');
        const userWithHashedPassword = { ...user, password: hashedPassword };

        usersRepository.findOne?.mockResolvedValue(null);
        usersRepository.create?.mockReturnValue(userWithHashedPassword);
        usersRepository.save?.mockRejectedValue(dbError);

        await expect(provider.createUser(user)).rejects.toThrow(
          RequestTimeoutException,
        );
        await expect(provider.createUser(user)).rejects.toThrow(
          'Unable to process your request at the moment. Please try again later.',
        );

        // Verify welcome email is not sent when user creation fails
        expect(mailService.sendUserWelcome).not.toHaveBeenCalled();
      });

      it('should throw RequestTimeoutException when mail service fails', async () => {
        const mailError = new Error('Mail service unavailable');
        const userWithHashedPassword = { ...user, password: hashedPassword };

        usersRepository.findOne?.mockResolvedValue(null);
        usersRepository.create?.mockReturnValue(userWithHashedPassword);
        usersRepository.save?.mockResolvedValue(userWithHashedPassword);
        mailService.sendUserWelcome.mockRejectedValue(mailError);

        await expect(provider.createUser(user)).rejects.toThrow(
          RequestTimeoutException,
        );
        await expect(provider.createUser(user)).rejects.toThrow(mailError);

        // Verify user was created successfully before mail failure
        expect(usersRepository.save).toHaveBeenCalledWith(
          userWithHashedPassword,
        );
        expect(mailService.sendUserWelcome).toHaveBeenCalledWith(
          userWithHashedPassword,
        );
      });

      it('should complete successfully when both user creation and email sending work', async () => {
        const createdUser = { ...user, password: hashedPassword };
        const savedUser = { ...createdUser, id: 123 };

        usersRepository.findOne?.mockResolvedValue(null);
        usersRepository.create?.mockReturnValue(createdUser);
        usersRepository.save?.mockResolvedValue(savedUser);

        const result = await provider.createUser(user);

        expect(result).toEqual(savedUser);
        expect(usersRepository.save).toHaveBeenCalledWith(createdUser);
        expect(mailService.sendUserWelcome).toHaveBeenCalledWith(savedUser);
      });
    });

    describe('When the user exists in database', () => {
      it('should throw a BadRequestException and not attempt to create user or send email', async () => {
        usersRepository.findOne?.mockResolvedValue({ ...user, id: 1 });

        await expect(provider.createUser(user)).rejects.toThrow(
          BadRequestException,
        );
        await expect(provider.createUser(user)).rejects.toThrow(
          'This user already exists, please check your email',
        );

        // Verify no user creation or email sending attempted
        expect(usersRepository.create).not.toHaveBeenCalled();
        expect(usersRepository.save).not.toHaveBeenCalled();
        expect(mailService.sendUserWelcome).not.toHaveBeenCalled();
        expect(hashingProvider.hashPassword).not.toHaveBeenCalled();
      });
    });
  });
});
