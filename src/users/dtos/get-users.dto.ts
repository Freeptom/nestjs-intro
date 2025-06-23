import { IntersectionType } from '@nestjs/swagger';
import { IsDate, IsOptional } from 'class-validator';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';

class GetUserBaseDto {
  @IsDate()
  @IsOptional()
  startDate?: Date;

  @IsDate()
  @IsOptional()
  endDate?: Date;
}

export class GetUsersDto extends IntersectionType(
  GetUserBaseDto,
  PaginationQueryDto,
) {}
