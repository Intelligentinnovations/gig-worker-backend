import { Injectable } from '@nestjs/common';
import { Insertable, Selectable } from 'kysely';
import { DB, TalentJobPreference } from '../../utils/types';
import { KyselyService } from '@backend-template/database';
import { Optional } from '@backend-template/helpers';

@Injectable()
export class JobPreferenceRepo {
  constructor(private client: KyselyService<DB>) {}

  create(data: Insertable<TalentJobPreference>) {
    return Optional.of(
      this.client
        .insertInto('TalentJobPreference')
        .values(data)
        .returningAll()
        .executeTakeFirst()
    );
  }

  update(data: Selectable<TalentJobPreference>) {
    return this.client
      .updateTable('TalentJobPreference')
      .set(data)
      .where('id', '=', data.id)
      .executeTakeFirst();
  }

  findByTalent(talentId: string) {
    return Optional.of(
      this.client
        .selectFrom('TalentJobPreference')
        .where('talentId', '=', talentId)
        .selectAll()
        .executeTakeFirst()
    );
  }
}
