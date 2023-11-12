import { Injectable } from '@nestjs/common';
import { UserRepo } from './user.repo';
import { Insertable, Selectable } from 'kysely';
import { User } from '../utils/types';
import { CustomRes } from '@backend-template/http';

@Injectable()
export class UserService {
  constructor(private userRepo: UserRepo) {}

  async create(data: Insertable<User>) {
    const existingUser = await this.userRepo.findByEmail(data.email).elseNull();

    if (existingUser) {
      throw CustomRes.badRequest('account with email already exist');
    }

    const user = await this.userRepo.create(data).elseThrow();
    // todo emit created profile to auth service

    return user.id;
  }

  async update(data: Omit<Selectable<User>, 'email' | 'roles'>) {
    await this.userRepo.update(data).elseThrow();

    // todo emit profile update event
  }
}
