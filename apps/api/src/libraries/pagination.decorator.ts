import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { PaginationData } from '../utils/types';

export const Pagination = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): PaginationData => {
    const request = ctx.switchToHttp().getRequest();

    const page = Number(request.query.page ?? 0);
    const size = Number(request.query.size ?? 10);

    return { page, size, totalPages: 1, totalItems: 0 };
  }
);
