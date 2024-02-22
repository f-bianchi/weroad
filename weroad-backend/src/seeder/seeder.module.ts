import { Module } from '@nestjs/common';
import { RolesModule } from 'src/roles/roles.module';
import { ToursModule } from 'src/tours/tours.module';
import { TravelsModule } from 'src/travels/travels.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule, RolesModule, ToursModule, TravelsModule],
})
export class SeederModule {}
