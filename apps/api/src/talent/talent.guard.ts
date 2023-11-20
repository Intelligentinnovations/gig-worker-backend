import { KyselyService } from '@backend-template/database';
import { CustomRes } from '@backend-template/http';
import { UserData } from '@backend-template/types';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { DB } from '../utils/types';

@Injectable()
export class TalentGuard implements CanActivate {
  constructor(private dbClient: KyselyService<DB>) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const user = request.user as UserData;
    request.talent = await this.dbClient
      .selectFrom('Talent')
      .leftJoin('User', 'User.id', 'Talent.userId')
      .where('email', '=', user.email)
      .select(['Talent.id as id', 'userId'])
      .executeTakeFirstOrThrow(() =>
        CustomRes.forbidden('you do not have a talent profile')
      );

    return true;
  }
}
