import { CustomRes } from '@backend-template/http';
import { Body, Controller, Post, Put } from '@nestjs/common';

import { TalentData } from '../../utils/types/talent';
import { Talent } from '../talent.decorator';
import { TalentAuth } from '../talent-auth.decorator';
import { JobPreferenceDto } from './job-preference.dto';
import { JobPreferenceService } from './job-preference.service';

@Controller('talent/preference')
@TalentAuth()
export class JobPreferenceController {
  constructor(private jobPreferenceService: JobPreferenceService) {}

  @Post()
  async createJobPreference(
    @Talent() talent: TalentData,
    @Body() data: JobPreferenceDto
  ) {
    return CustomRes.success(
      await this.jobPreferenceService.create(talent.id, data)
    );
  }

  @Put()
  async updateJobPreference(
    @Talent() talent: TalentData,
    @Body() data: JobPreferenceDto
  ) {
    return CustomRes.success(
      await this.jobPreferenceService.update(talent.id, data)
    );
  }
}
