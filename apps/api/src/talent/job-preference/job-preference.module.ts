import { Module } from '@nestjs/common';
import { JobPreferenceRepo } from './job-preference.repo';

@Module({
  providers: [JobPreferenceRepo],
  exports: [JobPreferenceRepo],
})
export class JobPreferenceModule {}
