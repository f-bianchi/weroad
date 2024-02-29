import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';
import { FindOptionsOrderValue } from 'typeorm';

export const PAGE_SIZE_DEFAULT = 10;

export class PaginationResponseDto<T> {
  items: T[];
  total: number;
}

export class PaginationRequestDto {
  @IsPositive()
  @IsNumber()
  @Type(() => Number)
  page: number = 1;

  @IsPositive()
  @IsNumber()
  @Type(() => Number)
  pageSize: number = PAGE_SIZE_DEFAULT;

  @IsOptional()
  sort?: string;

  @IsOptional()
  order?: FindOptionsOrderValue;
}
