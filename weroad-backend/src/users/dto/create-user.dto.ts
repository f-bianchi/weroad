import { IsArray, IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { RoleName } from 'src/roles/entities/role.entity';

export class CreateUserDto {
  id?: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsArray()
  @IsEnum(RoleName, { each: true })
  roles: RoleName[];
}
