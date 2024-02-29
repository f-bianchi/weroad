import { IsNumber, Min, Max } from 'class-validator';

export class MoodsDto {
  id?: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  nature: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  relax: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  history: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  culture: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  party: number;
}
