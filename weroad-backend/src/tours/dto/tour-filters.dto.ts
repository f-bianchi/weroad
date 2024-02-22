import { IsDate, IsNumber, IsOptional, IsPositive } from 'class-validator';
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

  @IsDate()
  @IsOptional()
  startingDate?: string;

  @IsDate()
  @IsOptional()
  endingDate?: string;
}
