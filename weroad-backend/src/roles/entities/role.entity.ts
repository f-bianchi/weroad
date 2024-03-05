import { BaseEntity } from '../../utils/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum RoleName {
  Editor = 'editor',
  Admin = 'admin',
}

@Entity({ name: 'roles' })
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: RoleName;
}
