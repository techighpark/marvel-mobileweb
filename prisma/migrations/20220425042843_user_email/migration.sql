/*
  Warnings:

  - You are about to drop the column `userNumber` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_userNumber_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "userNumber",
ADD COLUMN     "email" TEXT,
ALTER COLUMN "avatar" DROP NOT NULL,
ALTER COLUMN "registerPeriod" DROP NOT NULL;

-- CreateTable
CREATE TABLE "UserNumber" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userNumber" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UserNumber_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserNumber_userNumber_key" ON "UserNumber"("userNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "UserNumber" ADD CONSTRAINT "UserNumber_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
