import { Module } from '@nestjs/common';
import { EducationBackgroundModule } from './education-background/education-background.module';
import { WorkExperienceModule } from './work-experience/work-experience.module';
import { JobPreferenceModule } from './job-preference/job-preference.module';
import { TalentService } from './talent.service';
import { TalentRepo } from './talent.repo';
import { UserModule } from '../user/user.module';
import { CertificateModule } from './certificate/certificate.module';
import { TalentController } from './talent.controller';

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
