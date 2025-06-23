import { IsOptional, IsPositive } from 'class-validator';

/**
 * DTO for paginating items
 */
export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  limit?: number = 10;

  @IsOptional()
  @IsPositive()
  page?: number = 1;
}
