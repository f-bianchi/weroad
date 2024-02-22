import { Travel } from 'src/travels/entities/travel.entity';
import { BaseEntity } from 'src/utils/base.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tours' })
export class Tour extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'date' })
  startingDate: Date;

  @Column({ type: 'date' })
  endingDate: Date;

  @Column()
  price: number;

  @ManyToOne(() => Travel, (travel) => travel.tours)
  travel: Travel;
}
