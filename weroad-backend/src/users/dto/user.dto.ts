import { PartialType } from '@nestjs/mapped-types';
import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { RoleName } from '../../roles/entities/role.entity';

export class UserDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password?: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(RoleName, { each: true })
  roles: RoleName[];
}

export class UserUpdateDto extends PartialType(UserDto) {
  @IsOptional()
  @IsString()
  password?: string;
}
