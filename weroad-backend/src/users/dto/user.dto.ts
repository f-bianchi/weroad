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
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  password?: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(RoleName, { each: true })
  @ApiProperty()
  roles: RoleName[];
}

export class UserUpdateDto extends PartialType(UserDto) {
  @IsOptional()
  @IsString()
  @ApiProperty()
  password?: string;
}
