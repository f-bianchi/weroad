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
import { RoleName } from 'src/roles/entities/role.entity';
import { PartialType } from '@nestjs/mapped-types';

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
