import { IsNotEmpty } from 'class-validator';

export class RoleDto {
  id?: string;

  @IsNotEmpty()
  name: string;
}
