import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class TravelDto {
  @IsUUID()
  @IsOptional()
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
