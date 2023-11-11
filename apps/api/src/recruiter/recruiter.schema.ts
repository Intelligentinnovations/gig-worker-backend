import { z } from 'zod';

export const RecruiterProfileSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  profileImage: z.string().nullable(),
  companyName: z.string(),
  companyWebsite: z.string(),
  companyAddress: z.string(),
  companySize: z.number().int(),
  companyType: z.string(),
});

export type RecruiterProfileData = z.infer<typeof RecruiterProfileSchema>;
