import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { isAfter, isSameDay } from 'date-fns';

@ValidatorConstraint({ name: 'isSameOrAfter', async: false })
export class IsSameOrAfterConstraint implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    const refValue = args.object[args.constraints[0]];
    return !value || !refValue || isSameDay(value, refValue) || isAfter(value, refValue);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be same or after ${args.constraints[0]}`;
  }
}

export const IsSameOrAfter = (property: string, validationOptions?: ValidationOptions) => {
  return (object: unknown, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: IsSameOrAfterConstraint,
    });
  };
};
