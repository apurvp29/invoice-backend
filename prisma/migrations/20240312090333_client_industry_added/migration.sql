-- CreateTable
CREATE TABLE "ClientIndustry" (
    "client_industry_id" TEXT NOT NULL,
    "industry_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClientIndustry_pkey" PRIMARY KEY ("client_industry_id")
);
