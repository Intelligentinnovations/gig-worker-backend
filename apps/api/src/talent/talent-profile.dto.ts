import {
  IsAlpha,
  IsAlphanumeric,
  IsArray,
  IsInt,
  IsString,
  IsUrl,
  ValidateIf,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TalentProfileDto {
  @IsAlpha()
  @ApiProperty()
  firstName!: string;

  @IsAlpha()
  @ApiProperty()
  lastName!: string;

  @IsUrl()
  @ApiProperty({ type: 'string', nullable: true })
  @ValidateIf((object, value) => value !== null)
  profileImage!: string | null;

  @IsAlphanumeric()
  bio!: string;

  @IsAlphanumeric()
  location!: string;

  @IsInt()
  yearsOfExperience!: number;

  @IsArray()
  @IsString({ each: true })
  skills!: Array<string>;

  timezone!: string;
}
