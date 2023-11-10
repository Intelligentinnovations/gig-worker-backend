import { KyselyService } from '@backend-template/database';
import { Optional } from '@backend-template/helpers';
import { Injectable } from '@nestjs/common';
import { Insertable, Selectable } from 'kysely';

import { DB, Recruiter } from '../utils/types';
import { DateTime } from 'luxon';

@Injectable()
export class RecruiterRepo {
  constructor(private client: KyselyService<DB>) {}

  create(data: Insertable<Recruiter>) {
    return Optional.of(
      this.client.insertInto('Recruiter').values(data).returningAll().explain()
    );
  }

  update(data: Selectable<Recruiter>) {
    return Optional.of(
      this.client
        .updateTable('Recruiter')
        .set({ ...data, updatedAt: DateTime.now().toJSDate() })
        .where('id', '=', data.id)
        .returningAll()
        .execute()
    );
  }

  findByEmail(email: string) {
    return Optional.of(
      this.client
        .selectFrom('Recruiter')
        .where('email', '=', email)
        .selectAll()
        .execute()
    );
  }
}
