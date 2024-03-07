import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';
import { FindOptionsOrderValue } from 'typeorm';

export const PAGE_SIZE_DEFAULT = 12;

export class PaginationResponseDto<T> {
  items: T[];
  total: number;
}

export class PaginationRequestDto {
  @IsPositive()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty()
  page: number = 1;

  @IsPositive()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty()
  pageSize: number = PAGE_SIZE_DEFAULT;

  @IsOptional()
  @ApiProperty()
  sort?: string;

  @IsOptional()
  @ApiProperty()
  order?: FindOptionsOrderValue;
}
