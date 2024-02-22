import { Role } from 'src/roles/entities/role.entity';
import { BaseEntity } from 'src/utils/base.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[];
}
