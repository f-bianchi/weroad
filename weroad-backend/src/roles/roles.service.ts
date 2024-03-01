import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleDto } from './dto/role.dto';
import { Role, RoleName } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(roleDto: RoleDto) {
    const newRole = this.roleRepository.create({
      id: roleDto.id,
      name: roleDto.name as RoleName,
    });
    return await this.roleRepository.save(newRole);
  }

  async findOne(id: string) {
    const role = await this.roleRepository.findOne({ where: { id } });
    if (!role) {
      throw new NotFoundException();
    }
    return role;
  }
}
