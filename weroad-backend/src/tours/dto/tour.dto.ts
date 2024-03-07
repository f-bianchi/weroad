import { IsISO8601, IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { IsSameOrAfter } from '../../utils/date-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TourDto {
  @IsUUID()
  @IsOptional()
  @ApiProperty()
  id?: string;

  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsISO8601()
  @ApiProperty()
  startingDate: string;

  @IsNotEmpty()
  @IsISO8601()
  @IsSameOrAfter('startingDate')
  @ApiProperty()
  endingDate: string;

  @IsNumber()
  @ApiProperty()
  price: number;

  @IsUUID()
  @ApiProperty()
  travelId: string;
}
