import { IsBoolean, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class TravelDto {
  @IsUUID()
  id?: string;

  @IsNotEmpty()
  slug: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsBoolean()
  isPublic: boolean;

  @IsNumber()
  numberOfDays: number;
}
