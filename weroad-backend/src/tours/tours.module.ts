import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Travel } from '../travels/entities/travel.entity';
import { TravelsModule } from '../travels/travels.module';
import { Tour } from './entities/tour.entity';
import { ToursController } from './tours.controller';
import { ToursService } from './tours.service';

@Module({
  imports: [TravelsModule, TypeOrmModule.forFeature([Tour, Travel])],
  controllers: [ToursController],
  providers: [ToursService],
  exports: [ToursService],
})
export class ToursModule {}
