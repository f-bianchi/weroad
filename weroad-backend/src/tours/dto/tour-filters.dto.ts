import { IsISO8601, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { PaginationRequestDto } from 'src/utils/paginated-response.dto';

export class TourFiltersDto extends PaginationRequestDto {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  priceFrom?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  priceTo?: number;

  @IsISO8601()
  @IsOptional()
  startingDate?: string;

  @IsISO8601()
  @IsOptional()
  endingDate?: string;
}
