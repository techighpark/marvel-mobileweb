/*
  Warnings:

  - Made the column `type` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "type" SET NOT NULL,
ALTER COLUMN "type" SET DEFAULT E'basic',
ALTER COLUMN "phone" SET DATA TYPE TEXT;
