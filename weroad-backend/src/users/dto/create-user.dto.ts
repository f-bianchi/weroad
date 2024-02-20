import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { RoleName } from 'src/roles/entities/role.entity';

export class CreateUserDto {
  id?: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsEnum(RoleName, { each: true })
  roles: RoleName[];
}
