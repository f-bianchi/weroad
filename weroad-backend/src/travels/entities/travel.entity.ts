import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tour } from '../../tours/entities/tour.entity';
import { BaseEntity } from '../../utils/base.entity';
import { Moods } from './moods.entity';

@Entity({ name: 'travels' })
export class Travel extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  isPublic: boolean;

  @Column({ unique: true })
  slug: string;

  @Column()
  description: string;

  @Column()
  numberOfDays: number;

  @Column()
  numberOfNights: number;

  @OneToMany(() => Tour, (tour) => tour.travel)
  tours: Tour[];

  @OneToOne(() => Moods, (moods) => moods.travel, { cascade: true })
  @JoinColumn()
  moods: Moods;

  @BeforeInsert()
  @BeforeUpdate()
  priceFromDb() {
    this.numberOfNights = this.numberOfDays > 1 ? this.numberOfDays - 1 : 0;
  }
}
