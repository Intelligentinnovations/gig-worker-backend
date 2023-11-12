import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { CustomRes } from '@backend-template/http';
import {
  Authenticated,
  AuthenticatedGuard,
} from '@backend-template/rest-server';
import { UserData } from '@backend-template/types';
import { ApiBearerAuth } from '@nestjs/swagger';
import { TalentService } from './talent.service';
import { TalentProfileDto } from './talent-profile.dto';

@Controller('talent')
@UseGuards(AuthenticatedGuard)
export class TalentController {
  constructor(private talentService: TalentService) {}

  @Post()
  @ApiBearerAuth('access-token')
  async addRecruiter(
    @Authenticated() user: UserData,
    @Body() data: TalentProfileDto
  ) {
    return CustomRes.success(await this.talentService.create(user, data));
  }

  @Get()
  async getProfile(@Authenticated() user: UserData) {
    return CustomRes.success(await this.talentService.fetchTalent(user.email));
  }

  @Put()
  @ApiBearerAuth('access-token')
  async updateRecruiter(
    @Body() data: TalentProfileDto,
    @Authenticated() user: UserData
  ) {
    return CustomRes.success(await this.talentService.update(user, data));
  }
}
