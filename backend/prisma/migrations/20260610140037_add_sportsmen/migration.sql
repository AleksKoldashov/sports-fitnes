-- CreateTable
CREATE TABLE "Sportsmen" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sportsmen_pkey" PRIMARY KEY ("id")
);
