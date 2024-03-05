import { Injectable, OnModuleInit } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as ROLES from 'src/seeder/samples/roles.json';
import * as USERS from 'src/seeder/samples/users.json';
import * as TOURS from 'src/seeder/samples/tours.json';
import * as TRAVELS from 'src/seeder/samples/travels.json';
import { RolesService } from 'src/roles/roles.service';
import { TravelsService } from 'src/travels/travels.service';
import { ToursService } from 'src/tours/tours.service';
import { UserDto } from 'src/users/dto/user.dto';

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
