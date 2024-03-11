-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_billed_to_fkey" FOREIGN KEY ("billed_to") REFERENCES "Client"("client_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_billed_by_fkey" FOREIGN KEY ("billed_by") REFERENCES "Business"("business_id") ON DELETE RESTRICT ON UPDATE CASCADE;
