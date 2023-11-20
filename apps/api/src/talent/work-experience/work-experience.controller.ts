import { CustomRes } from '@backend-template/http';
import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';

import { TalentData } from '../../utils/types/talent';
import { Talent } from '../talent.decorator';
import { TalentAuth } from '../talent-auth.decorator';
import { WorkExperienceDto } from './work-experience.dto';
import { WorkExperienceService } from './work-experience.service';

@Controller('talent/experience')
@TalentAuth()
export class WorkExperienceController {
  constructor(private experienceService: WorkExperienceService) {}

  @Post()
  async createWorkExperience(
    @Talent() talent: TalentData,
    @Body() data: WorkExperienceDto
  ) {
    return CustomRes.success(
      await this.experienceService.create(talent.id, data)
    );
  }

  @Put(':experienceId')
  async updateWorkExperience(
    @Talent() talent: TalentData,
    @Param('experienceId') experienceId: string,
    @Body() data: WorkExperienceDto
  ) {
    return CustomRes.success(
      await this.experienceService.update(talent.id, experienceId, data)
    );
  }

  @Delete(':experienceId')
  async deleteWorkExperience(
    @Talent() talent: TalentData,
    @Param('experienceId') experienceId: string
  ) {
    return CustomRes.success(
      await this.experienceService.delete(talent.id, experienceId)
    );
  }
}
