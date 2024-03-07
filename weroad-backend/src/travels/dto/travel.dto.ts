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
import { ApiProperty } from '@nestjs/swagger';

export class TravelDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsNotEmpty()
  @ApiProperty()
  slug: string;

  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsBoolean()
  @ApiProperty()
  isPublic: boolean;

  @IsNumber()
  @ApiProperty()
  numberOfDays: number;

  @IsDefined()
  @ValidateNested()
  @Type(() => MoodsDto)
  @ApiProperty()
  moods: MoodsDto;
}
