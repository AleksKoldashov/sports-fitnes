/*
  Warnings:

  - You are about to drop the `Sportsman` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `club_members` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Sportsman";

-- DropTable
DROP TABLE "club_members";

-- CreateTable
CREATE TABLE "Posts" (
    "id" SERIAL NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Posts_pkey" PRIMARY KEY ("id")
);
