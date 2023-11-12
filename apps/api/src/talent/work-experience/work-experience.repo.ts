import { Injectable } from '@nestjs/common';
import { Insertable, Selectable } from 'kysely';
import { DB, TalentWorkExperience } from '../../utils/types';
import { KyselyService } from '@backend-template/database';
import { Optional } from '@backend-template/helpers';

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

  update(data: Selectable<TalentWorkExperience>) {
    return this.client
      .updateTable('TalentWorkExperience')
      .set(data)
      .where('id', '=', data.id)
      .execute();
  }

  delete(id: string) {
    return this.client
      .deleteFrom('TalentWorkExperience')
      .where('id', '=', id)
      .execute();
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

  findByIdAndTalent(id: string, talentId: string) {
    return Optional.of(
      this.client
        .selectFrom('TalentWorkExperience')
        .where('id', '=', id)
        .where('talentId', '=', talentId)
        .selectAll()
        .executeTakeFirst()
    );
  }
}
