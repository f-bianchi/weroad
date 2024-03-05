import { Injectable, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';
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
    private dataSource: DataSource,
  ) {}

  async onModuleInit() {
    if (process.env.ENABLE_IMPORT_MOCK_DATA === 'true') {
      await this.initData();
    }
  }

  async initData() {
    for (const role of ROLES) {
      if (!(await this.rolesService.findOneById(role.id))) {
        await this.rolesService.create(role);
      }
    }

    for (const user of USERS) {
      if (!(await this.usersService.findOneById(user.id))) {
        await this.usersService.saveUser(user as UserDto);
      }
    }

    for (const travel of TRAVELS) {
      if (!(await this.travelsService.findOneById(travel.id))) {
        await this.travelsService.saveTravel(travel);
      }
    }

    for (const tour of TOURS) {
      if (!(await this.toursService.findOneById(tour.id))) {
        await this.toursService.saveTour(tour);
      }
    }
  }

  async dropAllTables(): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.startTransaction();

    try {
      const tables = await queryRunner.query(
        `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE'`,
      );
      for (const table of tables) {
        await queryRunner.query(`DROP TABLE ${table.table_name} CASCADE`);
      }
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await this.dataSource.synchronize(true);
      await queryRunner.release();
    }
  }
}
