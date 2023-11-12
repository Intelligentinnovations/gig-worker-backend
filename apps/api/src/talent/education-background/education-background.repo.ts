import { Injectable } from '@nestjs/common';
import { Insertable, Selectable } from 'kysely';
import { DB, TalentEducationBackground } from '../../utils/types';
import { KyselyService } from '@backend-template/database';
import { Optional } from '@backend-template/helpers';

@Injectable()
export class EducationBackgroundRepo {
  constructor(private client: KyselyService<DB>) {}

  create(data: Insertable<TalentEducationBackground>) {
    return Optional.of(
      this.client
        .insertInto('TalentEducationBackground')
        .values(data)
        .returningAll()
        .execute()
    );
  }

  update(data: Selectable<TalentEducationBackground>) {
    return this.client
      .updateTable('TalentEducationBackground')
      .set(data)
      .where('id', '=', data.id)
      .execute();
  }

  delete(id: string) {
    return this.client
      .deleteFrom('TalentEducationBackground')
      .where('id', '=', id)
      .execute();
  }

  findAllByTalent(talentId: string) {
    return Optional.of(
      this.client
        .selectFrom('TalentEducationBackground')
        .where('talentId', '=', talentId)
        .selectAll()
        .execute()
    );
  }

  findByIdAndTalent(id: string, talentId: string) {
    return Optional.of(
      this.client
        .selectFrom('TalentEducationBackground')
        .where('id', '=', id)
        .where('talentId', '=', talentId)
        .selectAll()
        .executeTakeFirst()
    );
  }
}
