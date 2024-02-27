import {
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
} from 'class-validator';

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
  endingDate: string;

  @IsNumber()
  price: number;

  @IsUUID()
  travelId: string;
}
