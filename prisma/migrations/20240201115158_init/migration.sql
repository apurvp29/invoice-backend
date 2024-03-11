-- CreateEnum
CREATE TYPE "AccountTypeEnum" AS ENUM ('CURRENT', 'SAVING');

-- CreateEnum
CREATE TYPE "ClientTypeEnum" AS ENUM ('INDIVISUAL', 'COMPANY');

-- CreateTable
CREATE TABLE "Business" (
    "business_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "nick_name" TEXT,
    "pan" TEXT NOT NULL,
    "tan" TEXT NOT NULL,
    "gst" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Business_pkey" PRIMARY KEY ("business_id")
);

-- CreateTable
CREATE TABLE "BankingDetails" (
    "banking_details_id" TEXT NOT NULL,
    "account_name" TEXT NOT NULL,
    "account_number" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "ifsc" TEXT NOT NULL,
    "account_type" "AccountTypeEnum" NOT NULL,
    "swift_code" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BankingDetails_pkey" PRIMARY KEY ("banking_details_id")
);

-- CreateTable
CREATE TABLE "Address" (
    "address_id" TEXT NOT NULL,
    "address_line_one" TEXT NOT NULL,
    "address_line_two" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("address_id")
);

-- CreateTable
CREATE TABLE "BusinessAddress" (
    "business_address_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "business_id" TEXT NOT NULL,
    "address_id" TEXT NOT NULL,

    CONSTRAINT "BusinessAddress_pkey" PRIMARY KEY ("business_address_id")
);

-- CreateTable
CREATE TABLE "BusinessBankingDetails" (
    "business_banking_details_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "business_id" TEXT NOT NULL,
    "banking_details_id" TEXT NOT NULL,

    CONSTRAINT "BusinessBankingDetails_pkey" PRIMARY KEY ("business_banking_details_id")
);

-- CreateTable
CREATE TABLE "Client" (
    "client_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "industry_name" TEXT NOT NULL,
    "logo" TEXT,
    "pan" TEXT NOT NULL,
    "tan" TEXT NOT NULL,
    "gst" TEXT NOT NULL,
    "vat" TEXT NOT NULL,
    "clientType" "ClientTypeEnum" NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "nick_name" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("client_id")
);

-- CreateTable
CREATE TABLE "ClientAddress" (
    "business_address_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "client_id" TEXT NOT NULL,
    "address_id" TEXT NOT NULL,

    CONSTRAINT "ClientAddress_pkey" PRIMARY KEY ("business_address_id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "invoice_id" TEXT NOT NULL,
    "invoice_number" TEXT NOT NULL,
    "invoice_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "due_date" TIMESTAMP(3),
    "billed_to" TEXT NOT NULL,
    "billed_by" TEXT NOT NULL,
    "discount" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("invoice_id")
);

-- CreateTable
CREATE TABLE "InvoiceItems" (
    "invoice_items_id" TEXT NOT NULL,
    "invoice_id" TEXT NOT NULL,
    "item_name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "rate" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InvoiceItems_pkey" PRIMARY KEY ("invoice_items_id")
);

-- CreateTable
CREATE TABLE "InvoiceTax" (
    "invoice_tax_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "invoice_id" TEXT NOT NULL,
    "tax_name" TEXT NOT NULL,
    "tax_percentage" INTEGER NOT NULL,

    CONSTRAINT "InvoiceTax_pkey" PRIMARY KEY ("invoice_tax_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Business_email_key" ON "Business"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Business_pan_key" ON "Business"("pan");

-- CreateIndex
CREATE UNIQUE INDEX "Business_tan_key" ON "Business"("tan");

-- CreateIndex
CREATE UNIQUE INDEX "Business_gst_key" ON "Business"("gst");

-- AddForeignKey
ALTER TABLE "BusinessAddress" ADD CONSTRAINT "BusinessAddress_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "Business"("business_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessAddress" ADD CONSTRAINT "BusinessAddress_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "Address"("address_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessBankingDetails" ADD CONSTRAINT "BusinessBankingDetails_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "Business"("business_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessBankingDetails" ADD CONSTRAINT "BusinessBankingDetails_banking_details_id_fkey" FOREIGN KEY ("banking_details_id") REFERENCES "BankingDetails"("banking_details_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientAddress" ADD CONSTRAINT "ClientAddress_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client"("client_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientAddress" ADD CONSTRAINT "ClientAddress_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "Address"("address_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceItems" ADD CONSTRAINT "InvoiceItems_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "Invoice"("invoice_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceTax" ADD CONSTRAINT "InvoiceTax_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "Invoice"("invoice_id") ON DELETE CASCADE ON UPDATE CASCADE;
