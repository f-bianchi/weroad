import { Module } from '@nestjs/common';
import { RolesModule } from '../roles/roles.module';
import { ToursModule } from '../tours/tours.module';
import { TravelsModule } from '../travels/travels.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule, RolesModule, ToursModule, TravelsModule],
})
export class SeederModule {}
