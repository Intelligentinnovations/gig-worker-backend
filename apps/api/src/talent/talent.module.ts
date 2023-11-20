import { Module } from '@nestjs/common';

import { UserModule } from '../user/user.module';
import { CertificateModule } from './certificate/certificate.module';
import { EducationBackgroundModule } from './education-background/education-background.module';
import { JobPreferenceModule } from './job-preference/job-preference.module';
import { TalentController } from './talent.controller';
import { TalentRepo } from './talent.repo';
import { TalentService } from './talent.service';
import { WorkExperienceModule } from './work-experience/work-experience.module';

@Module({
  imports: [
    EducationBackgroundModule,
    WorkExperienceModule,
    JobPreferenceModule,
    UserModule,
    CertificateModule,
  ],
  controllers: [TalentController],
  providers: [TalentService, TalentRepo],
})
export class TalentModule {}
