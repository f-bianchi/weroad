import { Injectable, OnModuleInit } from '@nestjs/common';
import { RolesService } from '../roles/roles.service';
import * as ROLES from '../seeder/samples/roles.json';
import * as TOURS from '../seeder/samples/tours.json';
import * as TRAVELS from '../seeder/samples/travels.json';
import * as USERS from '../seeder/samples/users.json';
import { ToursService } from '../tours/tours.service';
import { TravelsService } from '../travels/travels.service';
import { UserDto } from '../users/dto/user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class SeederService implements OnModuleInit {
  constructor(
    private usersService: UsersService,
    private rolesService: RolesService,
    private travelsService: TravelsService,
    private toursService: ToursService,
  ) {}

  async onModuleInit() {
    if (process.env.ENABLE_IMPORT_MOCK_DATA === 'true') {
      await this.initData();
    }
  }

  async initData() {
    for (const role of ROLES) {
      if (!(await this.rolesService.findOne(role.id))) {
        await this.rolesService.create(role);
      }
    }

    for (const user of USERS) {
      if (!(await this.usersService.findOne(user.id))) {
        await this.usersService.create(user as UserDto);
      }
    }

    for (const travel of TRAVELS) {
      if (!(await this.travelsService.findOne(travel.id))) {
        await this.travelsService.create(travel);
      }
    }

    for (const tour of TOURS) {
      if (!(await this.toursService.findOne(tour.id))) {
        await this.toursService.create(tour);
      }
    }
  }
}
