import type { ColumnType } from 'kysely';
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Recruiter = {
  id: Generated<string>;
  email: string;
  firstName: string;
  lastName: string;
  companyName: string;
  companyAddress: string;
  website: string;
  profileImage: string;
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
};
export type DB = {
  Recruiter: Recruiter;
};
