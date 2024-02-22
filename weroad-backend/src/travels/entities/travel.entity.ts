import { Tour } from 'src/tours/entities/tour.entity';
import { BaseEntity } from 'src/utils/base.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  /* TODO 
  @Column()
  moods: Mood[];
  */
}
