/*
  Warnings:

  - You are about to drop the column `authorId` on the `Feedback` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_feedbackId_fkey";

-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_authorId_fkey";

-- AlterTable
ALTER TABLE "Feedback" DROP COLUMN "authorId";
