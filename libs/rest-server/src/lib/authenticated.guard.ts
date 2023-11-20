import { CognitoService, CustomRes } from '@backend-template/http';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { DateTime } from 'luxon';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(private cognitoService: CognitoService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    try {
      Logger.log(DateTime.now().toMillis(), 'start get authorized');
      request.token = request.headers.authorization.split(' ')[1];
      if (request.token) {
        request.user = await this.cognitoService.getUser(request.token);
      }
      Logger.log(DateTime.now().toMillis(), 'end get authorized');
    } catch (e) {
      Logger.error(e, 'authentication error');
    }

    if (!request.user) throw CustomRes.unauthorized();

    return true;
  }
}
