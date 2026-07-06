/*
  Warnings:

  - You are about to drop the `Sportsmen` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Sportsmen";

-- CreateTable
CREATE TABLE "Sportsman" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sportsman_pkey" PRIMARY KEY ("id")
);
