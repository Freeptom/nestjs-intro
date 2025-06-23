import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Query,
  Body,
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
     *  Injects the UsersService into the UsersController
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
    @Param() getUsersParamDto: GetUsersParamDto,
    @Query() userQuery: GetUsersDto,
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
  public createUsers(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }
  /**
   *  Create multiple users
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
   *  Update an existing user
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
