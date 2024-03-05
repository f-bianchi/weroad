import { IsISO8601, IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { IsSameOrAfter } from '../../utils/date-validator';

export class TourDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsISO8601()
  startingDate: string;

  @IsNotEmpty()
  @IsISO8601()
  @IsSameOrAfter('startingDate')
  endingDate: string;

  @IsNumber()
  price: number;

  @IsUUID()
  travelId: string;
}
