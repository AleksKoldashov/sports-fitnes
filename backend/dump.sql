-- DropForeignKey
ALTER TABLE "public"."ClubMember" DROP CONSTRAINT "ClubMember_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ClubMember" DROP CONSTRAINT "ClubMember_trainerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."EmployeeApplication" DROP CONSTRAINT "EmployeeApplication_createdById_fkey";

-- DropForeignKey
ALTER TABLE "public"."EmployeeApplication" DROP CONSTRAINT "EmployeeApplication_reviewedById_fkey";

-- DropForeignKey
ALTER TABLE "public"."Employee" DROP CONSTRAINT "Employee_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Employee" DROP CONSTRAINT "Employee_positionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Employee" DROP CONSTRAINT "Employee_gradeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."EmployeeDocument" DROP CONSTRAINT "EmployeeDocument_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."EmployeeDocument" DROP CONSTRAINT "EmployeeDocument_typeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Salary" DROP CONSTRAINT "Salary_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."TrainerEarning" DROP CONSTRAINT "TrainerEarning_trainerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."TrainerEarning" DROP CONSTRAINT "TrainerEarning_eventId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Sale" DROP CONSTRAINT "Sale_managerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Notification" DROP CONSTRAINT "Notification_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."TrainingRequest" DROP CONSTRAINT "TrainingRequest_clubMemberId_fkey";

-- DropForeignKey
ALTER TABLE "public"."TrainingRequest" DROP CONSTRAINT "TrainingRequest_eventId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ClubMemberInterest" DROP CONSTRAINT "ClubMemberInterest_clubMemberId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ClubMemberInterest" DROP CONSTRAINT "ClubMemberInterest_interestId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Event" DROP CONSTRAINT "Event_trainerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."EventParticipant" DROP CONSTRAINT "EventParticipant_eventId_fkey";

-- DropForeignKey
ALTER TABLE "public"."EventParticipant" DROP CONSTRAINT "EventParticipant_clubMemberId_fkey";

-- DropTable
DROP TABLE "public"."User";

-- DropTable
DROP TABLE "public"."ClubMember";

-- DropTable
DROP TABLE "public"."EmployeeApplication";

-- DropTable
DROP TABLE "public"."Position";

-- DropTable
DROP TABLE "public"."Grade";

-- DropTable
DROP TABLE "public"."Employee";

-- DropTable
DROP TABLE "public"."DocumentType";

-- DropTable
DROP TABLE "public"."EmployeeDocument";

-- DropTable
DROP TABLE "public"."Salary";

-- DropTable
DROP TABLE "public"."TrainerEarning";

-- DropTable
DROP TABLE "public"."Sale";

-- DropTable
DROP TABLE "public"."Transaction";

-- DropTable
DROP TABLE "public"."Notification";

-- DropTable
DROP TABLE "public"."Posts";

-- DropTable
DROP TABLE "public"."TrainingRequest";

-- DropTable
DROP TABLE "public"."Interest";

-- DropTable
DROP TABLE "public"."ClubMemberInterest";

-- DropTable
DROP TABLE "public"."Event";

-- DropTable
DROP TABLE "public"."EventParticipant";

-- DropEnum
DROP TYPE "public"."Role";

-- DropEnum
DROP TYPE "public"."ApplicationStatus";

-- DropEnum
DROP TYPE "public"."FitnessLevel";

-- DropEnum
DROP TYPE "public"."MembershipStatus";

-- DropEnum
DROP TYPE "public"."EventType";

-- DropEnum
DROP TYPE "public"."EventStatus";

-- DropEnum
DROP TYPE "public"."ParticipantStatus";

-- DropEnum
DROP TYPE "public"."AttendanceStatus";

-- DropEnum
DROP TYPE "public"."RequestType";

-- DropEnum
DROP TYPE "public"."RequestStatus";

-- DropEnum
DROP TYPE "public"."SalaryStatus";

-- DropEnum
DROP TYPE "public"."SaleType";

-- DropEnum
DROP TYPE "public"."TransactionType";

-- DropEnum
DROP TYPE "public"."TransactionCategory";

