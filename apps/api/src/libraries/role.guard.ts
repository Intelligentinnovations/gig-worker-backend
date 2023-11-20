import { KyselyService } from '@backend-template/database';
import { CustomRes } from '@backend-template/http';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { DB } from '../utils/types';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private dbClient: KyselyService<DB>
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles =
      this.reflector.get<string[]>('roles', context.getClass()) ?? [];

    if (!roles?.length) return true;

    const request = context.switchToHttp().getRequest();
    const user = await this.dbClient
      .selectFrom('User')
      .where('email', '=', request.user.email)
      .select('roles')
      .executeTakeFirstOrThrow(() => CustomRes.unauthorized());

    for (const role of roles) {
      if (user.roles.includes(role)) return true;
    }

    return false;
  }
}
