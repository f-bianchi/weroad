import { IsISO8601, IsNotEmpty, IsNumber, IsOptional, IsUUID, Max, Min } from 'class-validator';
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
  @Max(1000000)
  @Min(0)
  price: number;

  @IsUUID()
  @ApiProperty()
  travelId: string;
}
