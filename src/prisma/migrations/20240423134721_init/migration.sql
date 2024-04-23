/*
  Warnings:

  - The values [PLANNED,IN_PROGRESS,LIVE] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('Planned', 'InProgress', 'Live');
ALTER TABLE "Feedback" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Feedback" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
ALTER TABLE "Feedback" ALTER COLUMN "status" SET DEFAULT 'Planned';
COMMIT;

-- AlterTable
ALTER TABLE "Feedback" ALTER COLUMN "status" SET DEFAULT 'Planned';
