/*
  Warnings:

  - You are about to drop the column `isArchived` on the `Addon` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Addon" DROP COLUMN "isArchived",
ADD COLUMN     "isAvailable" BOOLEAN NOT NULL DEFAULT true;
