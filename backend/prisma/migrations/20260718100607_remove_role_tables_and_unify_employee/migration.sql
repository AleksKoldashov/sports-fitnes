/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the `Director` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Hr` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Manager` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Trainer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ClubMember" DROP CONSTRAINT "ClubMember_trainerId_fkey";

-- DropForeignKey
ALTER TABLE "Director" DROP CONSTRAINT "Director_userId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_trainerId_fkey";

-- DropForeignKey
ALTER TABLE "Hr" DROP CONSTRAINT "Hr_userId_fkey";

-- DropForeignKey
ALTER TABLE "Manager" DROP CONSTRAINT "Manager_userId_fkey";

-- DropForeignKey
ALTER TABLE "Trainer" DROP CONSTRAINT "Trainer_userId_fkey";

-- DropForeignKey
ALTER TABLE "TrainingRequest" DROP CONSTRAINT "TrainingRequest_trainerId_fkey";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "telegram" TEXT,
ADD COLUMN     "vk" TEXT,
ALTER COLUMN "firstName" DROP DEFAULT,
ALTER COLUMN "lastName" DROP DEFAULT;

-- DropTable
DROP TABLE "Director";

-- DropTable
DROP TABLE "Hr";

-- DropTable
DROP TABLE "Manager";

-- DropTable
DROP TABLE "Trainer";
