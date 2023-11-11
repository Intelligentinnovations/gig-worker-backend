import { Injectable } from '@nestjs/common';
import { KyselyService } from '@backend-template/database';
import { DB, User } from '../utils/types';
import { Insertable, Selectable } from 'kysely';
import { Optional } from '@backend-template/helpers';

@Injectable()
export class UserRepo {
  constructor(private client: KyselyService<DB>) {}

  create(data: Insertable<User>) {
    return Optional.of(
      this.client
        .insertInto('User')
        .values(data)
        .returningAll()
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
        .executeTakeFirst()
    );
  }
}
