import { Module } from '@nestjs/common';

import { JobPreferenceController } from './job-preference.controller';
import { JobPreferenceRepo } from './job-preference.repo';
import { JobPreferenceService } from './job-preference.service';

@Module({
  controllers: [JobPreferenceController],
  providers: [JobPreferenceRepo, JobPreferenceService],
  exports: [JobPreferenceRepo],
})
export class JobPreferenceModule {}
