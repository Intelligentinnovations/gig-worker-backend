import { CustomRes } from '@backend-template/http';
import { UserData } from '@backend-template/types';
import { Injectable } from '@nestjs/common';

import { UserService } from '../user/user.service';
import { CertificateRepo } from './certificate/certificate.repo';
import { EducationBackgroundRepo } from './education-background/education-background.repo';
import { JobPreferenceRepo } from './job-preference/job-preference.repo';
import { TalentRepo } from './talent.repo';
import { TalentProfileDto } from './talent-profile.dto';
import { WorkExperienceRepo } from './work-experience/work-experience.repo';

@Injectable()
export class TalentService {
  constructor(
    private userService: UserService,
    private talentRepo: TalentRepo,
    private certificateRepo: CertificateRepo,
    private educationRepo: EducationBackgroundRepo,
    private jobPreferenceRepo: JobPreferenceRepo,
    private workExperienceRepo: WorkExperienceRepo
  ) {}

  async create(authenticated: UserData, data: TalentProfileDto) {
    const existingTalent = await this.talentRepo
      .findByEmail(authenticated.email)
      .elseNull();

    if (existingTalent)
      return CustomRes.badRequest('talent with email already exist');

    const userId = await this.userService.create({
      email: authenticated.email,
      firstName: data.firstName,
      lastName: data.lastName,
      profileImage: data.profileImage,
      roles: ['talent'],
    });

    await this.talentRepo
      .create({
        bio: data.bio,
        location: data.location,
        yearsOfExperience: 0,
        skills: data.skills,
        timezone: data.timezone,
        userId: userId,
      })
      .elseThrow();

    return this.talentRepo.findByEmail(authenticated.email).elseThrow();
  }

  async update(authenticated: UserData, data: TalentProfileDto) {
    const talentProfile = await this.talentRepo
      .findByEmail(authenticated.email)
      .elseThrow();

    await this.userService.update({
      id: talentProfile.userId,
      firstName: data.firstName,
      lastName: data.lastName,
      profileImage: data.profileImage ?? null,
    });

    await this.talentRepo
      .update({
        id: talentProfile.id,
        bio: data.bio,
        location: data.location,
        yearsOfExperience: talentProfile.yearsOfExperience,
        skills: data.skills,
        timezone: data.timezone,
      })
      .elseThrow();

    return this.talentRepo.findByEmail(authenticated.email).elseThrow();
  }

  async fetch(email: string) {
    const talent = await this.talentRepo
      .findByEmail(email)
      .elseThrow(CustomRes.forbidden());

    return {
      ...talent,
      certificates: await this.certificateRepo
        .findAllByTalent(talent.id)
        .elseReturn([]),
      workExperiences: await this.workExperienceRepo
        .findAllByTalent(talent.id)
        .elseReturn([]),
      educationBackground: await this.educationRepo
        .findAllByTalent(talent.id)
        .elseReturn([]),
      preference: await this.jobPreferenceRepo
        .findByTalent(talent.id)
        .elseNull(),
    };
  }
}
