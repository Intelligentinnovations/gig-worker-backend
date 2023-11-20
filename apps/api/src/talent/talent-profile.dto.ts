import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlpha,
  IsArray,
  IsString,
  IsTimeZone,
  IsUrl,
  ValidateIf,
} from 'class-validator';

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

  @IsString()
  @ApiProperty()
  bio!: string;

  @IsString()
  @ApiProperty()
  location!: string;

  @IsArray()
  @IsString({ each: true })
  @ApiProperty()
  skills!: Array<string>;

  @IsTimeZone()
  @ApiProperty()
  timezone!: string;
}
