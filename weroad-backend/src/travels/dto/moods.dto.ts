import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min, Max } from 'class-validator';

export class MoodsDto {
  id?: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  @ApiProperty()
  nature: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  @ApiProperty()
  relax: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  @ApiProperty()
  history: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  @ApiProperty()
  culture: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  @ApiProperty()
  party: number;
}
