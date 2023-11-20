import { KyselyService } from '@backend-template/database';
import { Optional } from '@backend-template/helpers';
import { Injectable } from '@nestjs/common';
import { Insertable, Selectable } from 'kysely';
import { DateTime } from 'luxon';

import { DB, TalentWorkExperience } from '../../utils/types';
import { TalentRepo } from '../talent.repo';

@Injectable()
export class WorkExperienceRepo {
  constructor(private client: KyselyService<DB>) {}

  create(data: Insertable<TalentWorkExperience>) {
    return Optional.of(
      this.client
        .insertInto('TalentWorkExperience')
        .values(data)
        .returningAll()
        .execute()
    );
  }

  update(
    data: Omit<
      Selectable<TalentWorkExperience>,
      'createdAt' | 'updatedAt' | 'talentId'
    >
  ) {
    return this.client
      .updateTable('TalentWorkExperience')
      .set({ ...data, updatedAt: DateTime.now().toJSDate() })
      .where('id', '=', data.id)
      .executeTakeFirst();
  }

  delete(id: string) {
    return this.client
      .deleteFrom('TalentWorkExperience')
      .where('id', '=', id)
      .executeTakeFirst();
  }

  findAllByTalent(talentId: string) {
    return Optional.of(
      this.client
        .selectFrom('TalentWorkExperience')
        .where('talentId', '=', talentId)
        .selectAll()
        .execute()
    );
  }

  updateByIdAndTalent(
    data: Omit<Selectable<TalentWorkExperience>, 'createdAt' | 'updatedAt'>
  ) {
    return Optional.of(
      this.client
        .updateTable('TalentWorkExperience')
        .set({ ...data, updatedAt: DateTime.now().toJSDate() })
        .where('id', '=', data.id)
        .where('talentId', '=', data.talentId)
        .returning([
          'id',
          'startDate',
          'endDate',
          'companyName',
          'jobTitle',
          'jobType',
          'description',
          'skills',
          'createdAt',
          'updatedAt',
        ])
        .executeTakeFirst()
    );
  }

  async deleteByIdAndTalent(id: string, talentId: string) {
    await this.client
      .deleteFrom('TalentWorkExperience')
      .where('id', '=', id)
      .where('talentId', '=', talentId)
      .executeTakeFirst();
  }
}
