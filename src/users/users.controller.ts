import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Query,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { CreateManyUsersDto } from './dtos/create-many-users.dto';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UsersService } from './providers/users.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUsersDto } from './dtos/get-users.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';
/**
 * The users controller.
 * Handles user related routes and delegates logic to the UsersService.
 */
@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(
    /**
     * Creates an instance of the UsersController with required dependencies.
     *
     * @param usersService - The users service instance that handles user-related business logic and data operations
     */
    private readonly usersService: UsersService,
  ) {}
  /**
   *  Get all users or filter by userId via query param
   */
  @ApiOperation({
    summary: 'Fetches a list of registered users on the application',
  })
  @ApiResponse({
    status: 200,
    description: 'Users fetched successfully, based on the query',
  })
  @ApiQuery({
    name: 'limit',
    type: 'number',
    required: false,
    description: 'The number of entries returned per query',
    example: 10,
  })
  @ApiQuery({
    name: 'page',
    type: 'number',
    required: false,
    description:
      'The position of the page number that you want the API to return',
    example: 1,
  })
  @Get('{/:id}/')
  public getUsers(
    @Query() userQuery: GetUsersDto,
    @Param() getUsersParamDto: GetUsersParamDto,
  ) {
    return this.usersService.findAll(userQuery, getUsersParamDto);
  }
  /**
   *  Create a new user
   */
  @ApiOperation({
    summary: 'Creates a new user',
  })
  @ApiResponse({
    status: 201,
    description: 'You get a 201 response if the user is created successfully',
  })
  @Post()
  @Auth(AuthType.None)
  @UseInterceptors(ClassSerializerInterceptor)
  public createUsers(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }
  /**
   *  Creates multiple users
   */
  @ApiOperation({
    summary: 'Creates multiple users',
  })
  @ApiResponse({
    status: 200,
    description: 'You get a 200 response if the users are created successfully',
  })
  @Post('create-many')
  public createManyUsers(@Body() createManyUsersDto: CreateManyUsersDto) {
    return this.usersService.createMany(createManyUsersDto);
  }
  /**
   * -- TODO --
   *  Updates an existing user
   *
   * @param patchUserDto - The user id
   * @returns The patched user
   */
  @ApiOperation({
    summary: 'Updates an existing user',
  })
  @ApiResponse({
    status: 200,
    description: 'You get a 200 response if the user is updated successfully',
  })
  @Patch()
  public patchUser(@Body() patchUserDto: PatchUserDto) {
    return patchUserDto;
  }
}
