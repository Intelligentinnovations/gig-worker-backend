import { IsAlpha, IsInt, IsUrl, Min, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RecruiterProfileDto {
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

  @ApiProperty()
  companyName!: string;

  @IsUrl()
  @ApiProperty()
  companyWebsite!: string;

  @ApiProperty()
  companyType!: string;

  @ApiProperty()
  companyAddress!: string;

  @IsInt()
  @Min(0)
  @ApiProperty()
  companySize!: number;
}
