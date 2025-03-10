-- AlterTable
ALTER TABLE "students" ADD COLUMN     "collegeId" TEXT;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "colleges"("id") ON DELETE SET NULL ON UPDATE CASCADE;
