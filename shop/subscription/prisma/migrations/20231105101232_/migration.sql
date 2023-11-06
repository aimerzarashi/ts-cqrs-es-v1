/*
  Warnings:

  - Added the required column `accountId` to the `stockItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "stockItem" ADD COLUMN     "accountId" TEXT NOT NULL;
