import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignUpInput } from '../auth/dto/sign-up.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async createUser(signUpInput: SignUpInput): Promise<User> {
    const user = this.usersRepository.create({
      ...signUpInput,
      id: uuid(),
    });

    return this.usersRepository.save(user);
  }

  async getUser(username) {
    return this.usersRepository.findOneBy({ username });
  }
}
