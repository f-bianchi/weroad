import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../../roles/entities/role.entity';
import { BaseEntity } from '../../utils/base.entity';

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
