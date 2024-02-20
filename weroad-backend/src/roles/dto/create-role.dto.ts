import { IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
  id?: string;

  @IsNotEmpty()
  name: string;
}
