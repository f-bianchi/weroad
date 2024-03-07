import { Type } from 'class-transformer';
import { IsISO8601, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { PaginationRequestDto } from '../../utils/paginated-response.dto';
import { IsSameOrAfter } from '../../utils/date-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TourFiltersDto extends PaginationRequestDto {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  @ApiProperty()
  priceFrom?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  @ApiProperty()
  priceTo?: number;

  @IsISO8601()
  @IsOptional()
  @ApiProperty()
  startingDate?: string;

  @IsISO8601()
  @IsOptional()
  @IsSameOrAfter('startingDate')
  @ApiProperty()
  endingDate?: string;
}
