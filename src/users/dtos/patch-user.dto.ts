import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
/**
 * DTO for updating an existing users.
 */
export class PatchUserDto extends PartialType(CreateUserDto) {
  /**
   * The ID of the user to update.
   * Must be a number.
   */
  @ApiProperty({
    description: 'The id of the user that needs to be updated',
  })
  @IsInt()
  @IsNotEmpty()
  id: number;
}
