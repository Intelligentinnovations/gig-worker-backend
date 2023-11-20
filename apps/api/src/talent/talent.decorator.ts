import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { TalentData } from '../utils/types/talent';

export const Talent = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): TalentData => {
    return ctx.switchToHttp().getRequest().talent;
  }
);
