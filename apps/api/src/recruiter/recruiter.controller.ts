import { Controller, Get } from '@nestjs/common';
import { RecruiterRepo } from './recruiter.repo';
import { CustomRes } from '@backend-template/http';

@Controller('recruiter')
export class RecruiterController {
  constructor(private recruiterRepo: RecruiterRepo) {}

  @Get()
  async getRecruiter() {
    return CustomRes.success(
      await this.recruiterRepo.findByEmail('festusyuma@gmail.com').elseNull()
    );
  }
}
