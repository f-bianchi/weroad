import {
  IsDate,
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
  @IsDate()
  startingDate: string;

  @IsNotEmpty()
  @IsDate()
  endingDate: string;

  @IsNumber()
  price: number;

  @IsUUID()
  travelId: string;
}
