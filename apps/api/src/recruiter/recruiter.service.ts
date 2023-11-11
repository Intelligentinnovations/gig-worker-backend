import { Injectable, Logger } from '@nestjs/common';
import { RecruiterRepo } from './recruiter.repo';
import { UserRepo } from '../user/user.repo';
import { UserData } from '@backend-template/types';
import { RecruiterProfileData } from './recruiter.schema';
import { CustomRes } from '@backend-template/http';

@Injectable()
export class RecruiterService {
  constructor(
    private recruiterRepo: RecruiterRepo,
    private userRepo: UserRepo
  ) {}

  async create(authenticated: UserData, data: RecruiterProfileData) {
    const existingUser = await this.userRepo
      .findByEmail(authenticated.email)
      .elseNull();

    if (existingUser) {
      throw CustomRes.badRequest('account with email already exist');
    }

    const user = await this.userRepo
      .create({
        email: authenticated.email,
        firstName: data.firstName,
        lastName: data.lastName,
        profileImage: data.profileImage,
        roles: ['recruiter'],
      })
      .elseThrow();

    // todo emit created profile to auth service

    const recruiter = await this.recruiterRepo
      .create({
        userId: user.id,
        companyName: data.companyName,
        companyAddress: data.companyAddress,
        companySize: data.companySize,
        companyType: data.companyType,
        companyWebsite: data.companyWebsite,
      })
      .elseThrow();

    Logger.log(authenticated);
    return this.recruiterRepo.findByEmail(authenticated.email).elseThrow();
  }

  async update(authenticated: UserData, data: RecruiterProfileData) {
    let recruiterProfile = await this.recruiterRepo
      .findByEmail(authenticated.email)
      .elseThrow();

    await this.userRepo
      .update({
        id: recruiterProfile.userId,
        firstName: data.firstName,
        lastName: data.lastName,
        profileImage: data.profileImage,
      })
      .elseThrow();

    // todo emit profile update event

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
