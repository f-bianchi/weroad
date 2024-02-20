import { Role } from 'src/roles/entities/role.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class User {
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
