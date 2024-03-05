import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/roles/entities/role.entity';
import { DeepPartial, In, Repository } from 'typeorm';
import { UserDto, UserUpdateDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
  ) {}

  async findOne(id: string): Promise<User | null> {
    return await this.usersRepository.findOne({
      select: ['email', 'roles', 'id'],
      where: { id },
      relations: {
        roles: true,
      },
    });
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find({
      select: ['email', 'roles', 'id'],
      relations: {
        roles: true,
      },
    });
  }

  async create(userDto: UserDto): Promise<User> {
    return await this.saveUser(userDto);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async update(id: string, userDto: UserUpdateDto): Promise<User> {
    userDto.id = id;
    return await this.saveUser(userDto);
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOne({
      where: { email },
      relations: {
        roles: true,
      },
    });
  }

  private async saveUser(dto: UserDto | UserUpdateDto): Promise<User> {
    const roles = await this.rolesRepository.find({
      where: {
        name: In(dto.roles),
      },
    });

    const entityToCreate: DeepPartial<User> = {
      id: dto.id,
      email: dto.email,
      roles,
    };

    if (dto.password) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(dto.password, salt);
      entityToCreate.password = hashedPassword;
    }

    const newUser = this.usersRepository.create(entityToCreate);

    return await this.usersRepository.save(newUser);
  }
}
