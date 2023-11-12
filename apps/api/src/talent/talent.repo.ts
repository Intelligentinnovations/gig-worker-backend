import { KyselyService } from '@backend-template/database';
import { Optional } from '@backend-template/helpers';
import { Injectable } from '@nestjs/common';
import { Insertable, Selectable } from 'kysely';

import { DB, Recruiter, Talent } from '../utils/types';
import { DateTime } from 'luxon';

@Injectable()
export class TalentRepo {
  constructor(private client: KyselyService<DB>) {}

  create(data: Insertable<Talent>) {
    return Optional.of(
      this.client.insertInto('Talent').values(data).returningAll().execute()
    );
  }

  update(data: Omit<Selectable<Talent>, 'createdAt' | 'updatedAt' | 'userId'>) {
    return Optional.of(
      this.client
        .updateTable('Talent')
        .set({ ...data, updatedAt: DateTime.now().toJSDate() })
        .where('id', '=', data.id)
        .returningAll()
        .execute()
    );
  }

  findByEmail(email: string) {
    return Optional.of(
      this.client
        .selectFrom('Talent')
        .leftJoin('User', 'User.id', 'Talent.id')
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
        ])
        .executeTakeFirst()
    );
  }
}
