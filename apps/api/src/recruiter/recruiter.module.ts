import { Module } from '@nestjs/common';

import { RecruiterRepo } from './recruiter.repo';
import { RecruiterController } from './recruiter.controller';

@Module({
  controllers: [RecruiterController],
  providers: [RecruiterRepo],
})
export class RecruiterModule {}
