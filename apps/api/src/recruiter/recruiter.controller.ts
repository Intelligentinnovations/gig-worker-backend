import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { CustomRes } from '@backend-template/http';
import {
  Authenticated,
  AuthenticatedGuard,
} from '@backend-template/rest-server';
import { UserData } from '@backend-template/types';
import { RecruiterService } from './recruiter.service';
import { RecruiterProfileDto } from './recruiter-profile.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('recruiter')
@UseGuards(AuthenticatedGuard)
export class RecruiterController {
  constructor(private recruiterService: RecruiterService) {}

  @Post()
  @ApiBearerAuth('access-token')
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
