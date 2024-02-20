import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Travel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  isPublic: boolean;

  @Column()
  slug: string;

  @Column()
  description: string;

  @Column()
  numberOfDays: number;

  @Column()
  numberOfNights: number;

  /* TODO 
  @Column()
  moods: Mood[];
  */
}
