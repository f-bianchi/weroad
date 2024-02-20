import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/roles/entities/role.entity';
import { In, Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
  ) {}

  async findOneById(id: string): Promise<User | null> {
    return this.usersRepository.findOne({
      select: ['email', 'roles', 'id'],
      where: { id },
      relations: {
        roles: true,
      },
    });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { email },
      relations: {
        roles: true,
      },
    });
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({
      select: ['email', 'roles', 'id'],
      relations: {
        roles: true,
      },
    });
  }

  async create(userDto: UserDto): Promise<User> {
    return await this.saveUser(userDto.id, userDto);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async update(id: string, userDto: UserDto): Promise<User> {
    return await this.saveUser(id, userDto);
  }

  private async saveUser(id: string, dto: UserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(dto.password, salt);

    const roles = await this.rolesRepository.find({
      where: {
        name: In(dto.roles),
      },
    });

    const newUser = this.usersRepository.create({
      id,
      password: hashedPassword,
      email: dto.email,
      roles,
    });

    return await this.usersRepository.save(newUser);
  }
}
