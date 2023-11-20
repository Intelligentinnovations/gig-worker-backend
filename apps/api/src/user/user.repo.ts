import { KyselyService } from '@backend-template/database';
import { Optional } from '@backend-template/helpers';
import { Injectable } from '@nestjs/common';
import { Insertable, Selectable } from 'kysely';

import { DB, User } from '../utils/types';

@Injectable()
export class UserRepo {
  constructor(private client: KyselyService<DB>) {}

  create(data: Insertable<User>) {
    return Optional.of(
      this.client
        .insertInto('User')
        .values(data)
        .returning('id')
        .executeTakeFirst()
    );
  }

  update(data: Omit<Selectable<User>, 'roles' | 'email'>) {
    return Optional.of(
      this.client
        .updateTable('User')
        .set(data)
        .where('id', '=', data.id)
        .returningAll()
        .executeTakeFirst()
    );
  }

  findByEmail(email: string) {
    return Optional.of(
      this.client
        .selectFrom('User')
        .where('email', '=', email)
        .select(['id', 'roles', 'profileImage'])
        .executeTakeFirst()
    );
  }
}
