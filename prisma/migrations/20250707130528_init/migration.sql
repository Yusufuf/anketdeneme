/*
  Warnings:

  - You are about to drop the column `age` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `surname` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "age",
DROP COLUMN "city",
DROP COLUMN "name",
DROP COLUMN "surname",
ADD COLUMN     "ad" TEXT,
ADD COLUMN     "sehir" TEXT,
ADD COLUMN     "soyad" TEXT,
ADD COLUMN     "yas" INTEGER;
