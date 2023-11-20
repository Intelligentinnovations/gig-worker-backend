import { KyselyService } from '@backend-template/database';
import { Optional } from '@backend-template/helpers';
import { Injectable } from '@nestjs/common';
import { Insertable, Selectable } from 'kysely';
import { DateTime } from 'luxon';

import { DB, TalentJobPreference } from '../../utils/types';

@Injectable()
export class JobPreferenceRepo {
  constructor(private client: KyselyService<DB>) {}

  create(data: Insertable<TalentJobPreference>) {
    return this.client
      .insertInto('TalentJobPreference')
      .values(data)
      .executeTakeFirst();
  }

  updateByTalent(
    data: Omit<
      Selectable<TalentJobPreference>,
      'id' | 'createdAt' | 'updatedAt'
    >
  ) {
    return this.client
      .updateTable('TalentJobPreference')
      .set({ ...data, updatedAt: DateTime.now().toJSDate() })
      .where('talentId', '=', data.talentId)
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
