/*
  Warnings:

  - You are about to drop the column `age` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `User` table. All the data in the column will be lost.
  - Added the required column `ad` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cinsiyet` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sehir` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `soyad` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yas` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Cinsiyet" AS ENUM ('ERKEK', 'KADIN');

-- CreateEnum
CREATE TYPE "Sehir" AS ENUM ('Adana', 'Adıyaman', 'Afyonkarahisar', 'Ağrı', 'Amasya', 'Ankara', 'Antalya', 'Artvin', 'Aydın', 'Balıkesir', 'Bilecik', 'Bingöl', 'Bitlis', 'Bolu', 'Burdur', 'Bursa', 'Çanakkale', 'Çankırı', 'Çorum', 'Denizli', 'Diyarbakır', 'Edirne', 'Elazığ', 'Erzincan', 'Erzurum', 'Eskişehir', 'Gaziantep', 'Giresun', 'Gümüşhane', 'Hakkari', 'Hatay', 'Isparta', 'Mersin', 'İstanbul', 'İzmir', 'Kars', 'Kastamonu', 'Kayseri', 'Kırklareli', 'Kırşehir', 'Kocaeli', 'Konya', 'Kütahya', 'Malatya', 'Manisa', 'Kahramanmaraş', 'Mardin', 'Muğla', 'Muş', 'Nevşehir', 'Niğde', 'Ordu', 'Rize', 'Sakarya', 'Samsun', 'Siirt', 'Sinop', 'Sivas', 'Tekirdağ', 'Tokat', 'Trabzon', 'Tunceli', 'Şanlıurfa', 'Uşak', 'Van', 'Yozgat', 'Zonguldak', 'Aksaray', 'Bayburt', 'Karaman', 'Kırıkkale', 'Batman', 'Şırnak', 'Bartın', 'Ardahan', 'Iğdır', 'Yalova', 'Karabük', 'Kilis', 'Osmaniye', 'Düzce');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "age",
DROP COLUMN "city",
DROP COLUMN "createdAt",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
ADD COLUMN     "ad" TEXT NOT NULL,
ADD COLUMN     "cinsiyet" "Cinsiyet" NOT NULL,
ADD COLUMN     "sehir" "Sehir" NOT NULL,
ADD COLUMN     "soyad" TEXT NOT NULL,
ADD COLUMN     "yas" INTEGER NOT NULL;
