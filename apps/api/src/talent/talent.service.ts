import { Injectable } from '@nestjs/common';
import { CertificateRepo } from './certificate/certificate.repo';
import { EducationBackgroundRepo } from './education-background/education-background.repo';
import { JobPreferenceRepo } from './job-preference/job-preference.repo';
import { WorkExperienceRepo } from './work-experience/work-experience.repo';
import { UserData } from '@backend-template/types';
import { TalentProfileDto } from './talent-profile.dto';
import { UserService } from '../user/user.service';
import { TalentRepo } from './talent.repo';

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
    const userId = await this.userService.create({
      email: authenticated.email,
      firstName: data.firstName,
      lastName: data.lastName,
      profileImage: data.profileImage,
      roles: ['recruiter'],
    });

    await this.talentRepo
      .create({
        bio: data.bio,
        location: data.location,
        yearsOfExperience: data.yearsOfExperience,
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
        yearsOfExperience: data.yearsOfExperience,
        skills: data.skills,
        timezone: data.timezone,
      })
      .elseThrow();

    return this.talentRepo.findByEmail(authenticated.email).elseThrow();
  }

  async fetchTalent(email: string) {
    const talentProfile = await this.talentRepo.findByEmail(email).elseThrow();

    return {
      ...talentProfile,
      certificates: await this.certificateRepo
        .findAllByTalent(talentProfile.id)
        .elseReturn([]),
      workExperiences: await this.workExperienceRepo
        .findAllByTalent(talentProfile.id)
        .elseReturn([]),
      educationBackground: await this.educationRepo
        .findAllByTalent(talentProfile.id)
        .elseReturn([]),
      preference: this.jobPreferenceRepo
        .findByTalent(talentProfile.id)
        .elseNull(),
    };
  }
}
