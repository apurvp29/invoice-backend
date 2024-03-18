/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Country` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `State` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `state_id` on the `City` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `country_id` on the `City` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `country_id` on the `State` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "City" DROP CONSTRAINT "City_country_id_fkey";

-- DropForeignKey
ALTER TABLE "City" DROP CONSTRAINT "City_state_id_fkey";

-- DropForeignKey
ALTER TABLE "State" DROP CONSTRAINT "State_country_id_fkey";

-- AlterTable
ALTER TABLE "City" DROP COLUMN "state_id",
ADD COLUMN     "state_id" INTEGER NOT NULL,
DROP COLUMN "country_id",
ADD COLUMN     "country_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "State" DROP COLUMN "country_id",
ADD COLUMN     "country_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Country_code_key" ON "Country"("code");

-- CreateIndex
CREATE UNIQUE INDEX "State_code_key" ON "State"("code");

-- AddForeignKey
ALTER TABLE "State" ADD CONSTRAINT "State_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "Country"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "State"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "Country"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
