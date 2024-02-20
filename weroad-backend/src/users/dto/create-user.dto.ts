import { IsEmail, IsNotEmpty } from 'class-validator';
import { Role } from 'src/roles/entities/role.entity';

export class CreateUserDto {
  id?: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  roles: Role[];
}
