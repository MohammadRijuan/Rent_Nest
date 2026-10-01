/*
  Warnings:

  - You are about to drop the column `admin_id` on the `categories` table. All the data in the column will be lost.
  - Added the required column `author_id` to the `categories` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_admin_id_fkey";

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "admin_id",
ADD COLUMN     "author_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
