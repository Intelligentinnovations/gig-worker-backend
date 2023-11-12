import { Injectable } from '@nestjs/common';
import { RecruiterRepo } from './recruiter.repo';
import { UserData } from '@backend-template/types';
import { RecruiterProfileDto } from './recruiter-profile.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class RecruiterService {
  constructor(
    private recruiterRepo: RecruiterRepo,
    private userService: UserService
  ) {}

  async create(authenticated: UserData, data: RecruiterProfileDto) {
    const userId = await this.userService.create({
      email: authenticated.email,
      firstName: data.firstName,
      lastName: data.lastName,
      profileImage: data.profileImage,
      roles: ['recruiter'],
    });

    await this.recruiterRepo
      .create({
        userId: userId,
        companyName: data.companyName,
        companyAddress: data.companyAddress,
        companySize: data.companySize,
        companyType: data.companyType,
        companyWebsite: data.companyWebsite,
      })
      .elseThrow();

    return this.recruiterRepo.findByEmail(authenticated.email).elseThrow();
  }

  async update(authenticated: UserData, data: RecruiterProfileDto) {
    let recruiterProfile = await this.recruiterRepo
      .findByEmail(authenticated.email)
      .elseThrow();

    await this.userService.update({
      id: recruiterProfile.userId,
      firstName: data.firstName,
      lastName: data.lastName,
      profileImage: data.profileImage ?? null,
    });

    await this.recruiterRepo
      .update({
        companyAddress: data.companyAddress,
        companyName: data.companyName,
        companySize: data.companySize,
        companyType: data.companyType,
        companyWebsite: data.companyWebsite,
        id: recruiterProfile.id,
      })
      .elseThrow();

    return this.recruiterRepo.findByEmail(authenticated.email).elseThrow();
  }

  fetchByEmail(email: string) {
    return this.recruiterRepo.findByEmail(email).elseNull();
  }
}
