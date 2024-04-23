/*
  Warnings:

  - The `status` column on the `Feedback` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PLANNED', 'IN_PROGRESS', 'LIVE');

-- AlterTable
CREATE SEQUENCE feedback_upvotes_seq;
ALTER TABLE "Feedback" ALTER COLUMN "upvotes" SET DEFAULT nextval('feedback_upvotes_seq'),
DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PLANNED';
ALTER SEQUENCE feedback_upvotes_seq OWNED BY "Feedback"."upvotes";
