import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
/**
 * DTO for creating a new user.
 */
export class CreateUserDto {
  /**
   * First name.
   * Must be a non-empty string and must not exceed a length of 96.
   */
  @ApiProperty({
    example: 'John',
    description: "The user's first name",
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(96)
  firstName: string;

  /**
   * Last name (optional).
   * Must not exceed a length of 96.
   */
  @ApiPropertyOptional({
    example: 'Doe',
    description: "The user's last name",
  })
  @IsString()
  @IsOptional()
  @MaxLength(96)
  lastName?: string;

  /**
   * Email address.
   * Must be in a correct email format.
   */
  @ApiProperty({
    example: 'john@doe.com',
    description: "The user's email address",
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   * Password.
   * Must have a minimum of 8 characters, at least one capital letter, one number and one special character.
   */
  @ApiProperty({
    example: 'Password123*',
    description: "The user's password",
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/^(?=.*d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, {
    message:
      'Minimum eight characters, at least one capital letter, one number and one special character',
  })
  password: string;
}
