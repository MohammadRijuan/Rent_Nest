-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED');

-- CreateEnum
CREATE TYPE "Methods" AS ENUM ('STRIPE', 'BKASH');

-- CreateTable
CREATE TABLE "payments" (
    "id" TEXT NOT NULL,
    "rental_id" TEXT NOT NULL,
    "transaction" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "method" "Methods" NOT NULL DEFAULT 'STRIPE',
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_rental_id_fkey" FOREIGN KEY ("rental_id") REFERENCES "rental-requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;
