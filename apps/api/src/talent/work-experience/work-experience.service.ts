import { Injectable } from '@nestjs/common';

import { WorkExperienceDto } from './work-experience.dto';
import { WorkExperienceRepo } from './work-experience.repo';

@Injectable()
export class WorkExperienceService {
  constructor(private experienceRepo: WorkExperienceRepo) {}

  async create(talentId: string, data: WorkExperienceDto) {
    return await this.experienceRepo
      .create({
        talentId: talentId,
        companyName: data.companyName,
        jobTitle: data.jobTitle,
        startDate: data.startDate,
        description: data.description,
        skills: data.skills,
        jobType: data.jobType,
      })
      .elseThrow();
  }

  update(talentId: string, experienceId: string, data: WorkExperienceDto) {
    console.log(talentId, experienceId, data);

    return this.experienceRepo
      .updateByIdAndTalent({
        id: experienceId,
        talentId: talentId,
        companyName: data.companyName,
        jobTitle: data.jobTitle,
        startDate: data.startDate,
        endDate: data.endDate,
        description: data.description,
        skills: data.skills,
        jobType: data.jobType,
      })
      .elseNull();
  }

  async delete(talentId: string, experienceId: string) {
    return await this.experienceRepo.deleteByIdAndTalent(
      experienceId,
      talentId
    );
  }
}
