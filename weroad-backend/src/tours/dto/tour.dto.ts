import { IsDate, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class TourDto {
  @IsUUID()
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
