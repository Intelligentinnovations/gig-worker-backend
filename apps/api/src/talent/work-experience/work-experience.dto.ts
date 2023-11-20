import {
  IsArray,
  IsDateString,
  IsEnum,
  IsString,
  ValidateIf,
} from 'class-validator';

import { JobType } from '../../utils/types';

export class WorkExperienceDto {
  @IsString()
  companyName!: string;

  @IsString()
  jobTitle!: string;

  @IsString()
  description!: string;

  @IsArray()
  @IsString({ each: true })
  skills!: Array<string>;

  @IsEnum(JobType)
  jobType!: JobType;

  @IsDateString()
  startDate!: Date;

  @IsDateString()
  @ValidateIf((object, value) => value !== null)
  endDate!: Date | null;
}
