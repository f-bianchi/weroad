import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum RoleName {
  Editor = 'editor',
  Admin = 'admin',
}

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: RoleName;
}
