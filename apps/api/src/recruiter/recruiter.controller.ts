import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { CustomRes, ZodValidationPipe } from '@backend-template/http';
import {
  RecruiterProfileData,
  RecruiterProfileSchema,
} from './recruiter.schema';
import {
  Authenticated,
  AuthenticatedGuard,
} from '@backend-template/rest-server';
import { UserData } from '@backend-template/types';
import { RecruiterService } from './recruiter.service';

@Controller('recruiter')
@UseGuards(AuthenticatedGuard)
export class RecruiterController {
  constructor(private recruiterService: RecruiterService) {}

  @Post()
  async addRecruiter(
    @Authenticated() user: UserData,
    @Body(new ZodValidationPipe(RecruiterProfileSchema))
    data: RecruiterProfileData
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
    @Authenticated() user: UserData,
    @Body(new ZodValidationPipe(RecruiterProfileSchema))
    data: RecruiterProfileData
  ) {
    return CustomRes.success(await this.recruiterService.update(user, data));
  }
}
