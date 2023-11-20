import type { ColumnType } from 'kysely';
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export const EducationDegree = {
  A_LEVEL: 'A_LEVEL',
  O_LEVEL: 'O_LEVEL',
  BACHELORS: 'BACHELORS',
  MASTERS: 'MASTERS',
  PHD: 'PHD',
} as const;
export type EducationDegree =
  typeof EducationDegree[keyof typeof EducationDegree];
export const WorkMode = {
  REMOTE: 'REMOTE',
  ON_SITE: 'ON_SITE',
  HYBRID: 'HYBRID',
} as const;
export type WorkMode = typeof WorkMode[keyof typeof WorkMode];
export const JobType = {
  FULL_TIME: 'FULL_TIME',
  CONTRACT: 'CONTRACT',
  PART_TIME: 'PART_TIME',
} as const;
export type JobType = typeof JobType[keyof typeof JobType];
export const ExperienceLevel = {
  INTERN: 'INTERN',
  ENTRY: 'ENTRY',
  MID: 'MID',
  SENIOR: 'SENIOR',
  EXECUTIVE: 'EXECUTIVE',
} as const;
export type ExperienceLevel =
  typeof ExperienceLevel[keyof typeof ExperienceLevel];
export type Recruiter = {
  id: Generated<string>;
  companyName: string;
  companyAddress: string;
  companySize: number;
  companyType: string;
  companyWebsite: string;
  userId: string;
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
};
export type Talent = {
  id: Generated<string>;
  bio: string;
  location: string;
  yearsOfExperience: number;
  skills: string[];
  timezone: string;
  userId: string;
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
};
export type TalentCertificate = {
  id: Generated<string>;
  title: string;
  institutionName: string;
  validationUrl: string;
  issueDate: Timestamp;
  talentId: string;
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
};
export type TalentEducationBackground = {
  id: Generated<string>;
  institutionName: string;
  courseOfStudy: string;
  entryDate: Timestamp;
  graduationDate: Timestamp | null;
  degree: EducationDegree;
  talentId: string;
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
};
export type TalentJobPreference = {
  id: Generated<string>;
  experienceLevel: ExperienceLevel[];
  workMode: WorkMode[];
  jobType: JobType[];
  location: string;
  expectedSalary: number;
  talentId: string;
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
};
export type TalentWorkExperience = {
  id: Generated<string>;
  companyName: string;
  jobTitle: string;
  startDate: Timestamp;
  endDate: Timestamp | null;
  description: string;
  skills: string[];
  jobType: JobType;
  talentId: string;
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
};
export type User = {
  id: Generated<string>;
  email: string;
  firstName: string;
  lastName: string;
  profileImage: string | null;
  roles: string[];
};
export type DB = {
  Recruiter: Recruiter;
  Talent: Talent;
  TalentCertificate: TalentCertificate;
  TalentEducationBackground: TalentEducationBackground;
  TalentJobPreference: TalentJobPreference;
  TalentWorkExperience: TalentWorkExperience;
  User: User;
};
