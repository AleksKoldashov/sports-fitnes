-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "specialty" TEXT;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_trainerId_fkey" FOREIGN KEY ("trainerId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
