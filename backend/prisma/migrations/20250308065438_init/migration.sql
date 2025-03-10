/*
  Warnings:

  - You are about to drop the column `otp` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `otp_expiry` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `password_salt` on the `users` table. All the data in the column will be lost.
  - The `phone` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `name` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "otp",
DROP COLUMN "otp_expiry",
DROP COLUMN "password_salt",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "verification_otp" TEXT,
ADD COLUMN     "verification_otp_expiry" TIMESTAMP(3),
DROP COLUMN "phone",
ADD COLUMN     "phone" JSONB,
ALTER COLUMN "role" SET DEFAULT 'student';

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");
