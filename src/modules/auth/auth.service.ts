import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { SignUpInput } from './dto/sign-up.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.usersService.getUser(username);
    if (!user) throw new Error('Неверный логин или пароль');

    const valid = await bcrypt.compare(password, user?.password);
    if (!valid) throw new Error('Неверный логин или пароль');

    if (user && valid) {
      return user;
    }

    return null;
  }

  async auth(username) {
    const user = await this.usersService.getUser(username);
    return { user };
  }

  login(user: User) {
    return {
      access_token: this.jwtService.sign({
        username: user.username,
        sub: user.id,
      }),
      user,
    };
  }

  async register(signUpInput: SignUpInput) {
    const user = await this.usersService.getUser(signUpInput.username);

    if (user) {
      throw new Error('Логин уже существует');
    }

    const password = await bcrypt.hash(signUpInput.password, 10);

    const newUser = await this.usersService.createUser({
      username: signUpInput.username,
      password,
    });

    return {
      access_token: this.jwtService.sign({
        username: newUser.username,
        sub: newUser.id,
      }),
      user: newUser,
    };
  }
}
