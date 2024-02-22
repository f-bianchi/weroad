import { Module } from '@nestjs/common';
import { ToursService } from './tours.service';
import { ToursController } from './tours.controller';
import { TravelsModule } from 'src/travels/travels.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tour } from './entities/tour.entity';
import { Travel } from 'src/travels/entities/travel.entity';

@Module({
  imports: [TravelsModule, TypeOrmModule.forFeature([Tour, Travel])],
  controllers: [ToursController],
  providers: [ToursService],
  exports: [ToursService],
})
export class ToursModule {}
