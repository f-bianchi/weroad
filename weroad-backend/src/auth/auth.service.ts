import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new HttpException('Bad Credentials', HttpStatus.UNAUTHORIZED);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new HttpException('Bad Credentials', HttpStatus.UNAUTHORIZED);
    }

    return {
      access_token: await this.getAccessToken(user),
    };
  }

  async getAccessToken(user: Partial<User>): Promise<string> {
    const payload = {
      id: user.id,
      email: user.email,
      roles: user.roles,
    };

    return await this.jwtService.signAsync(payload);
  }
}
