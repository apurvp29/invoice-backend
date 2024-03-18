/*
  Warnings:

  - You are about to drop the column `city_id` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `country_id` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `state_id` on the `Address` table. All the data in the column will be lost.
  - Added the required column `cityName` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `countryName` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stateName` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_city_id_fkey";

-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_country_id_fkey";

-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_state_id_fkey";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "city_id",
DROP COLUMN "country_id",
DROP COLUMN "state_id",
ADD COLUMN     "cityName" TEXT NOT NULL,
ADD COLUMN     "countryName" TEXT NOT NULL,
ADD COLUMN     "stateName" TEXT NOT NULL;
