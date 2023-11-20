import { CustomRes } from '@backend-template/http';
import { Injectable } from '@nestjs/common';
import { Insertable, Selectable } from 'kysely';

import { User } from '../utils/types';
import { UserRepo } from './user.repo';

@Injectable()
export class UserService {
  constructor(private userRepo: UserRepo) {}

  async create(data: Insertable<User>) {
    const existingUser = await this.userRepo.findByEmail(data.email).elseNull();

    if (!existingUser) {
      const user = await this.userRepo.create(data).elseThrow();
      // todo emit profile created
      return user.id;
    }

    for (const role of existingUser.roles) {
      if (data.roles.includes(role)) {
        await this.userRepo
          .update({
            id: existingUser.id,
            firstName: data.firstName,
            lastName: data.lastName,
            profileImage: data.profileImage ?? existingUser.profileImage,
          })
          .elseThrow();

        return existingUser.id;
      }
    }

    throw CustomRes.badRequest('user with email already exist');
  }

  async update(data: Omit<Selectable<User>, 'email' | 'roles'>) {
    await this.userRepo.update(data).elseThrow();

    // todo emit profile update event
  }
}
