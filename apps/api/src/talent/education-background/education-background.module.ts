import { Module } from '@nestjs/common';
import { EducationBackgroundRepo } from './education-background.repo';

@Module({
  providers: [EducationBackgroundRepo],
  exports: [EducationBackgroundRepo],
})
export class EducationBackgroundModule {}
