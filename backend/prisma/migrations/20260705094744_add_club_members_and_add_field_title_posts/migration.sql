-- AlterTable
ALTER TABLE "Posts" ADD COLUMN     "title" TEXT NOT NULL DEFAULT 'Без заголовка';

-- CreateTable
CREATE TABLE "ClubMember" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClubMember_pkey" PRIMARY KEY ("id")
);
