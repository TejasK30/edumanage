/*
  Warnings:

  - A unique constraint covering the columns `[prn_number]` on the table `students` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `prn_number` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "job_applications" DROP CONSTRAINT "job_applications_student_id_fkey";

-- DropForeignKey
ALTER TABLE "student_learning_paths" DROP CONSTRAINT "student_learning_paths_student_id_fkey";

-- AlterTable
ALTER TABLE "student_learning_paths" ADD COLUMN     "studentProfileId" TEXT;

-- AlterTable
ALTER TABLE "students" ADD COLUMN     "prn_number" VARCHAR(10) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "students_prn_number_key" ON "students"("prn_number");
