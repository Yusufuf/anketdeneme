/*
  Warnings:

  - You are about to drop the column `ad` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `sehir` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `soyad` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `yas` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "ad",
DROP COLUMN "sehir",
DROP COLUMN "soyad",
DROP COLUMN "yas",
ADD COLUMN     "age" INTEGER,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lastName" TEXT;
