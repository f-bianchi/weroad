import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '../auth/auth.guard';
import { AdminGuard } from '../roles/roles.guard';
import { UserDto, UserUpdateDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('admin/users')
@ApiTags('users')
@UseGuards(AuthGuard, AdminGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() userDto: UserDto): Promise<User> {
    return this.usersService.create(userDto);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<User> {
    const user = await this.usersService.findOneById(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() userDto: UserUpdateDto): Promise<User> {
    return this.usersService.update(id, userDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() request: Request): Promise<void> {
    if (request['user'].id === id) {
      throw new HttpException('You cannot remove yourself', HttpStatus.FORBIDDEN);
    }
    return this.usersService.remove(id);
  }
}
