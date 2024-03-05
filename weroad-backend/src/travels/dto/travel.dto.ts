import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { MoodsDto } from '../../travels/dto/moods.dto';

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

  @IsDefined()
  @ValidateNested()
  @Type(() => MoodsDto)
  moods: MoodsDto;
}
