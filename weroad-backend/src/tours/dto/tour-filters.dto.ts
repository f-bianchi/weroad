import { Type } from 'class-transformer';
import { IsISO8601, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { PaginationRequestDto } from '../../utils/paginated-response.dto';
import { IsSameOrAfter } from '../../utils/date-validator';

export class TourFiltersDto extends PaginationRequestDto {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  priceFrom?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  priceTo?: number;

  @IsISO8601()
  @IsOptional()
  startingDate?: string;

  @IsISO8601()
  @IsOptional()
  @IsSameOrAfter('startingDate')
  endingDate?: string;
}
