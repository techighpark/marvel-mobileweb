/*
  Warnings:

  - You are about to drop the `Size` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_SizeToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_SizeToUser" DROP CONSTRAINT "_SizeToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_SizeToUser" DROP CONSTRAINT "_SizeToUser_B_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "height" DOUBLE PRECISION;

-- DropTable
DROP TABLE "Size";

-- DropTable
DROP TABLE "_SizeToUser";

-- DropEnum
DROP TYPE "SzieType";

-- CreateTable
CREATE TABLE "Weight" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Weight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserToWeight" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserToWeight_AB_unique" ON "_UserToWeight"("A", "B");

-- CreateIndex
CREATE INDEX "_UserToWeight_B_index" ON "_UserToWeight"("B");

-- AddForeignKey
ALTER TABLE "_UserToWeight" ADD FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToWeight" ADD FOREIGN KEY ("B") REFERENCES "Weight"("id") ON DELETE CASCADE ON UPDATE CASCADE;
