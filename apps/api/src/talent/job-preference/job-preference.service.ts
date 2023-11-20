import { Injectable } from '@nestjs/common';

import { JobPreferenceDto } from './job-preference.dto';
import { JobPreferenceRepo } from './job-preference.repo';

@Injectable()
export class JobPreferenceService {
  constructor(private jobPreferenceRepo: JobPreferenceRepo) {}

  async create(talentId: string, data: JobPreferenceDto) {
    await this.jobPreferenceRepo.create({
      experienceLevel: data.experienceLevel,
      workMode: data.workMode,
      jobType: data.jobType,
      location: data.location,
      expectedSalary: data.expectedSalary,
      talentId,
    });
  }

  async update(talentId: string, data: JobPreferenceDto) {
    await this.jobPreferenceRepo.updateByTalent({
      experienceLevel: data.experienceLevel,
      workMode: data.workMode,
      jobType: data.jobType,
      location: data.location,
      expectedSalary: data.expectedSalary,
      talentId,
    });
  }
}
