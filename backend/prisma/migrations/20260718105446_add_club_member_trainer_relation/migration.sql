-- AddForeignKey
ALTER TABLE "ClubMember" ADD CONSTRAINT "ClubMember_trainerId_fkey" FOREIGN KEY ("trainerId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
