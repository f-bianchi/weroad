import {
  IsISO8601,
  IsNumber,
  IsOptional,
  IsPositive,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PaginationRequestDto } from 'src/utils/paginated-response.dto';
import { isAfter, isSameDay } from 'date-fns';
import { Type } from 'class-transformer';

@ValidatorConstraint({ name: 'isSameOrAfter', async: false })
export class IsSameOrAfterConstraint implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    const refValue = args.object[args.constraints[0]];
    return (
      !value ||
      !refValue ||
      isSameDay(value, refValue) ||
      isAfter(value, refValue)
    );
  }

  defaultMessage(args: ValidationArguments) {
    return `"${args.property}" must be after "${args.constraints[0]}"`;
  }
}

export class TourFiltersDto extends PaginationRequestDto {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  priceFrom?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  priceTo?: number;

  @IsISO8601()
  @IsOptional()
  startingDate?: string;

  @IsISO8601()
  @IsOptional()
  @Validate(IsSameOrAfterConstraint['startingDate'])
  endingDate?: string;
}
