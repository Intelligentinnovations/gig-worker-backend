import { AuthenticatedGuard } from '@backend-template/rest-server';
import {
  applyDecorators,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { TalentGuard } from './talent.guard';

export function TalentAuth() {
  return applyDecorators(
    UseGuards(AuthenticatedGuard, TalentGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    UsePipes(ValidationPipe)
  );
}
