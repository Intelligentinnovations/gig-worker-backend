import { CustomRes } from '@backend-template/http';
import {
  Authenticated,
  AuthenticatedGuard,
} from '@backend-template/rest-server';
import { UserData } from '@backend-template/types';
import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { RecruiterService } from './recruiter.service';
import { RecruiterProfileDto } from './recruiter-profile.dto';

@Controller('recruiter')
@UseGuards(AuthenticatedGuard)
@ApiBearerAuth('access-token')
export class RecruiterController {
  constructor(private recruiterService: RecruiterService) {}

  @Post()
  async addRecruiter(
    @Authenticated() user: UserData,
    @Body() data: RecruiterProfileDto
  ) {
    return CustomRes.success(await this.recruiterService.create(user, data));
  }

  @Get()
  async getProfile(@Authenticated() user: UserData) {
    return CustomRes.success(
      await this.recruiterService.fetchByEmail(user.email)
    );
  }

  @Put()
  async updateRecruiter(
    @Body() data: RecruiterProfileDto,
    @Authenticated() user: UserData
  ) {
    return CustomRes.success(await this.recruiterService.update(user, data));
  }
}
