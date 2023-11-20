import { KyselyService } from '@backend-template/database';
import { Optional } from '@backend-template/helpers';
import { Injectable } from '@nestjs/common';
import { Insertable, Selectable } from 'kysely';
import { DateTime } from 'luxon';

import { DB, Talent } from '../utils/types';

@Injectable()
export class TalentRepo {
  constructor(private client: KyselyService<DB>) {}

  create(data: Insertable<Talent>) {
    return Optional.of(
      this.client.insertInto('Talent').values(data).returningAll().execute()
    );
  }

  update(data: Omit<Selectable<Talent>, 'createdAt' | 'updatedAt' | 'userId'>) {
    const query = this.client
      .updateTable('Talent')
      .set({ ...data, updatedAt: DateTime.now().toJSDate() })
      .where('id', '=', data.id)
      .returningAll();

    return Optional.of(query.execute());
  }

  findByEmail(email: string) {
    const query = this.client
      .selectFrom('Talent')
      .leftJoin('User', 'User.id', 'Talent.userId')
      .where('User.email', '=', email)
      .select([
        'Talent.id as id',
        'userId',
        'firstName',
        'lastName',
        'profileImage',
        'email',
        'bio',
        'location',
        'yearsOfExperience',
        'skills',
        'timezone',
      ]);

    return Optional.of(query.executeTakeFirst());
  }
}
