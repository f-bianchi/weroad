import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Travel } from './travel.entity';

@Entity({ name: 'moods' })
export class Moods {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nature: number;

  @Column()
  relax: number;

  @Column()
  history: number;

  @Column()
  culture: number;

  @Column()
  party: number;

  @OneToOne(() => Travel, (travel) => travel.moods)
  travel: Travel;
}
