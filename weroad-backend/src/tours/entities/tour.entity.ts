import { AfterLoad, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Travel } from '../../travels/entities/travel.entity';
import { BaseEntity } from '../../utils/base.entity';

@Entity({ name: 'tours' })
export class Tour extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'date' })
  startingDate: string;

  @Column({ type: 'date' })
  endingDate: string;

  @Column()
  price: number;

  @ManyToOne(() => Travel, (travel) => travel.tours)
  travel: Travel;

  @AfterLoad()
  priceFromDb() {
    this.price = this.price / 100;
  }
}
