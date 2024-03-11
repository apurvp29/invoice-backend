/*
  Warnings:

  - You are about to drop the column `bankName` on the `BankingDetails` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[account_number]` on the table `BankingDetails` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bank_name` to the `BankingDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BankingDetails" DROP COLUMN "bankName",
ADD COLUMN     "bank_name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "BankingDetails_account_number_key" ON "BankingDetails"("account_number");
