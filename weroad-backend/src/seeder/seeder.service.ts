import { Injectable, OnModuleInit } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as ROLES from 'src/seeder/samples/roles.json';
import * as USERS from 'src/seeder/samples/users.json';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class SeederService implements OnModuleInit {
  constructor(
    private usersService: UsersService,
    private roleService: RolesService,
  ) {}

  async onModuleInit() {
    await this.initData();
  }

  async initData() {
    for (const role of ROLES) {
      await this.roleService.create(role);
    }

    for (const user of USERS) {
      await this.usersService.create(user);
    }
  }
}
