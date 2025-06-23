import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { Type } from 'class-transformer';
/**
 * DTO for creating multiple users.
 */
export class CreateManyUsersDto {
  /**
   * Array of users to create.
   */
  @ApiProperty({ type: () => [CreateUserDto] })
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateUserDto)
  users: CreateUserDto[];
}
