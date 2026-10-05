/*
  Warnings:

  - A unique constraint covering the columns `[transaction]` on the table `payments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tenant_id` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "Methods" ADD VALUE 'SSLCOMMERZ';

-- AlterTable
ALTER TABLE "payments" ADD COLUMN     "tenant_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "payments_transaction_key" ON "payments"("transaction");

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
