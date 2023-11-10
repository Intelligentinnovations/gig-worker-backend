import { CustomRes } from '@backend-template/http';
import { Controller, Get, UseGuards } from '@nestjs/common';

import { AppService } from './app.service';
import {
  Authenticated,
  AuthenticatedGuard,
} from '@backend-template/rest-server';
import { UserData } from '@backend-template/types';

@Controller()
@UseGuards(AuthenticatedGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  async getData(@Authenticated() user: UserData) {
    return CustomRes.success(user);
  }
}
