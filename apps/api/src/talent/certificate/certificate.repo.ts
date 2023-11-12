import { Injectable } from '@nestjs/common';
import { Insertable, Selectable } from 'kysely';
import { DB, TalentCertificate } from '../../utils/types';
import { KyselyService } from '@backend-template/database';
import { Optional } from '@backend-template/helpers';

@Injectable()
export class CertificateRepo {
  constructor(private client: KyselyService<DB>) {}

  create(data: Insertable<TalentCertificate>) {
    return Optional.of(
      this.client
        .insertInto('TalentCertificate')
        .values(data)
        .returningAll()
        .execute()
    );
  }

  update(data: Selectable<TalentCertificate>) {
    return this.client
      .updateTable('TalentCertificate')
      .set(data)
      .where('id', '=', data.id)
      .execute();
  }

  delete(id: string) {
    return this.client
      .deleteFrom('TalentCertificate')
      .where('id', '=', id)
      .execute();
  }

  findAllByTalent(talentId: string) {
    return Optional.of(
      this.client
        .selectFrom('TalentCertificate')
        .where('talentId', '=', talentId)
        .selectAll()
        .execute()
    );
  }

  findByIdAndTalent(id: string, talentId: string) {
    return Optional.of(
      this.client
        .selectFrom('TalentCertificate')
        .where('id', '=', id)
        .where('talentId', '=', talentId)
        .selectAll()
        .executeTakeFirst()
    );
  }
}
