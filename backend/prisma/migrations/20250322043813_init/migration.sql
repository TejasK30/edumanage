/*
  Warnings:

  - You are about to drop the column `password_hash` on the `users` table. All the data in the column will be lost.
  - Added the required column `password` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "users_phone_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "password_hash",
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "reset_password_expiry" TIMESTAMP(3),
ADD COLUMN     "reset_password_token" TEXT;
