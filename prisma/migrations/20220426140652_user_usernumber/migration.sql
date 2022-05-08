/*
  Warnings:

  - You are about to drop the `UserNumber` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userNumber` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserNumber" DROP CONSTRAINT "UserNumber_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userNumber" INTEGER NOT NULL;

-- DropTable
DROP TABLE "UserNumber";

-- CreateIndex
CREATE UNIQUE INDEX "User_userNumber_key" ON "User"("userNumber");
