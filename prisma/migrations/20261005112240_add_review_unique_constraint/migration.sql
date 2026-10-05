/*
  Warnings:

  - A unique constraint covering the columns `[tenant_id,property_id]` on the table `reviews` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `property_id` to the `reviews` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reviews" ADD COLUMN     "property_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "reviews_tenant_id_property_id_key" ON "reviews"("tenant_id", "property_id");

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;
