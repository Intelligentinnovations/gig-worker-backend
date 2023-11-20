import { IsArray, IsEnum, IsInt, IsString, Min } from 'class-validator';

import { ExperienceLevel, JobType, WorkMode } from '../../utils/types';

export class JobPreferenceDto {
  @IsArray()
  @IsEnum(WorkMode, { each: true })
  workMode!: Array<WorkMode>;

  @IsArray()
  @IsEnum(ExperienceLevel, { each: true })
  experienceLevel!: Array<ExperienceLevel>;

  @IsArray()
  @IsEnum(JobType, { each: true })
  jobType!: Array<JobType>;

  @IsString()
  location!: string;

  @IsInt()
  @Min(10)
  expectedSalary!: number;
}
