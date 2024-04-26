/*
  Warnings:

  - You are about to drop the column `description` on the `Feedback` table. All the data in the column will be lost.
  - Added the required column `detail` to the `Feedback` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Feedback" DROP COLUMN "description",
ADD COLUMN     "detail" TEXT NOT NULL;
