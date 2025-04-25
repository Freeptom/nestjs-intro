import { IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
/**
 * DTO for the GET users method.
 */
export class GetUsersParamDto {
  /**
   * Id of the user you want to fetch (optional)
   * Must be a number.
   */
  @ApiPropertyOptional({
    description: 'Get user with a specific id',
    example: 1234,
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id?: number;
}
