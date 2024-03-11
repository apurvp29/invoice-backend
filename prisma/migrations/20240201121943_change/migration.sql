/*
  Warnings:

  - Added the required column `city_id` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country_id` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pincode` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state_id` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "city_id" TEXT NOT NULL,
ADD COLUMN     "country_id" TEXT NOT NULL,
ADD COLUMN     "pincode" TEXT NOT NULL,
ADD COLUMN     "state_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Country" (
    "country_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "currency_code" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("country_id")
);

-- CreateTable
CREATE TABLE "State" (
    "state_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "country_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "State_pkey" PRIMARY KEY ("state_id")
);

-- CreateTable
CREATE TABLE "City" (
    "city_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "state_id" TEXT NOT NULL,
    "country_id" TEXT NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("city_id")
);

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "Country"("country_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "State"("state_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "City"("city_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "State" ADD CONSTRAINT "State_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "Country"("country_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "State"("state_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "Country"("country_id") ON DELETE RESTRICT ON UPDATE CASCADE;
