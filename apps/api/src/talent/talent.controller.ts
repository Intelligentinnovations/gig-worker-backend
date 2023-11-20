import { CustomRes } from '@backend-template/http';
import { Authenticated } from '@backend-template/rest-server';
import { UserData } from '@backend-template/types';
import { Body, Controller, Get, Post, Put } from '@nestjs/common';

import { Auth } from '../libraries/auth.decorator';
import { TalentService } from './talent.service';
import { TalentProfileDto } from './talent-profile.dto';

@Controller('talent')
@Auth()
export class TalentController {
  constructor(private talentService: TalentService) {}

  @Post()
  async addTalent(
    @Authenticated() user: UserData,
    @Body() data: TalentProfileDto
  ) {
    return CustomRes.success(await this.talentService.create(user, data));
  }

  @Get()
  async getTalent(@Authenticated() user: UserData) {
    return CustomRes.success(await this.talentService.fetch(user.email));
  }

  @Put()
  async updateTalent(
    @Body() data: TalentProfileDto,
    @Authenticated() user: UserData
  ) {
    return CustomRes.success(await this.talentService.update(user, data));
  }
}
