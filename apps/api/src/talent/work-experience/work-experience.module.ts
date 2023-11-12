import { Module } from '@nestjs/common';
import { WorkExperienceRepo } from './work-experience.repo';

@Module({
  providers: [WorkExperienceRepo],
  exports: [WorkExperienceRepo],
})
export class WorkExperienceModule {}
