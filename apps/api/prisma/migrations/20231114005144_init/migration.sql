-- CreateEnum
CREATE TYPE "EducationDegree" AS ENUM ('A_LEVEL', 'O_LEVEL', 'BACHELORS', 'MASTERS', 'PHD');

-- CreateEnum
CREATE TYPE "WorkMode" AS ENUM ('REMOTE', 'ON_SITE', 'HYBRID');

-- CreateEnum
CREATE TYPE "JobType" AS ENUM ('FULL_TIME', 'CONTRACT', 'PART_TIME');

-- CreateEnum
CREATE TYPE "ExperienceLevel" AS ENUM ('INTERN', 'ENTRY', 'MID', 'SENIOR', 'EXECUTIVE');

-- CreateTable
CREATE TABLE "User" (
    "id" BIGSERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "profileImage" TEXT,
    "roles" TEXT[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recruiter" (
    "id" BIGSERIAL NOT NULL,
    "companyName" TEXT NOT NULL,
    "companyAddress" TEXT NOT NULL,
    "companySize" INTEGER NOT NULL,
    "companyType" TEXT NOT NULL,
    "companyWebsite" TEXT NOT NULL,
    "userId" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Recruiter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Talent" (
    "id" BIGSERIAL NOT NULL,
    "bio" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "yearsOfExperience" INTEGER NOT NULL,
    "skills" TEXT[],
    "timezone" TEXT NOT NULL,
    "userId" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Talent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TalentWorkExperience" (
    "id" BIGSERIAL NOT NULL,
    "companyName" TEXT NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "description" TEXT NOT NULL,
    "skills" TEXT[],
    "jobType" "JobType" NOT NULL,
    "talentId" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TalentWorkExperience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TalentJobPreference" (
    "id" BIGSERIAL NOT NULL,
    "experienceLevel" "ExperienceLevel"[],
    "workMode" "WorkMode"[],
    "jobType" "JobType"[],
    "location" TEXT NOT NULL,
    "expectedSalary" INTEGER NOT NULL,
    "talentId" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TalentJobPreference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TalentEducationBackground" (
    "id" BIGSERIAL NOT NULL,
    "institutionName" TEXT NOT NULL,
    "courseOfStudy" TEXT NOT NULL,
    "entryDate" TIMESTAMP(3) NOT NULL,
    "graduationDate" TIMESTAMP(3),
    "degree" "EducationDegree" NOT NULL,
    "talentId" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TalentEducationBackground_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TalentCertificate" (
    "id" BIGSERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "institutionName" TEXT NOT NULL,
    "validationUrl" TEXT NOT NULL,
    "issueDate" TIMESTAMP(3) NOT NULL,
    "talentId" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TalentCertificate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Recruiter_userId_key" ON "Recruiter"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Talent_userId_key" ON "Talent"("userId");

-- AddForeignKey
ALTER TABLE "Recruiter" ADD CONSTRAINT "Recruiter_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Talent" ADD CONSTRAINT "Talent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TalentWorkExperience" ADD CONSTRAINT "TalentWorkExperience_talentId_fkey" FOREIGN KEY ("talentId") REFERENCES "Talent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TalentJobPreference" ADD CONSTRAINT "TalentJobPreference_talentId_fkey" FOREIGN KEY ("talentId") REFERENCES "Talent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TalentEducationBackground" ADD CONSTRAINT "TalentEducationBackground_talentId_fkey" FOREIGN KEY ("talentId") REFERENCES "Talent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TalentCertificate" ADD CONSTRAINT "TalentCertificate_talentId_fkey" FOREIGN KEY ("talentId") REFERENCES "Talent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
