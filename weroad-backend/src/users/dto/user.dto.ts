import { IsArray, IsEmail, IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { RoleName } from 'src/roles/entities/role.entity';

export class UserDto {
  @IsUUID()
  id?: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsArray()
  @IsEnum(RoleName, { each: true })
  roles: RoleName[];
}
