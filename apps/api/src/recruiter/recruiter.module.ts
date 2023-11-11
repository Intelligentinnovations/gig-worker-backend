import { Module } from '@nestjs/common';

import { RecruiterRepo } from './recruiter.repo';
import { RecruiterController } from './recruiter.controller';
import { UserModule } from '../user/user.module';
import { RecruiterService } from './recruiter.service';

@Module({
  imports: [UserModule],
  controllers: [RecruiterController],
  providers: [RecruiterRepo, RecruiterService],
})
export class RecruiterModule {}
