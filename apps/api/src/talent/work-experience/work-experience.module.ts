import { Module } from '@nestjs/common';

import { WorkExperienceController } from './work-experience.controller';
import { WorkExperienceRepo } from './work-experience.repo';
import { WorkExperienceService } from './work-experience.service';

@Module({
  controllers: [WorkExperienceController],
  providers: [WorkExperienceRepo, WorkExperienceService],
  exports: [WorkExperienceRepo],
})
export class WorkExperienceModule {}
