-- AlterTable
ALTER TABLE "Feedback" ALTER COLUMN "upvotes" SET DEFAULT 0,
ALTER COLUMN "upvotes" DROP DEFAULT;
DROP SEQUENCE "feedback_upvotes_seq";
