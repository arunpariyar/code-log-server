/*
  Warnings:

  - You are about to drop the column `productRequestId` on the `Comment` table. All the data in the column will be lost.
  - Added the required column `feedbackId` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_productRequestId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "productRequestId",
ADD COLUMN     "feedbackId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_feedbackId_fkey" FOREIGN KEY ("feedbackId") REFERENCES "Feedback"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
