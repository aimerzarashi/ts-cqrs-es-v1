/*
  Warnings:

  - You are about to drop the column `eventPayload` on the `StockItemEvent` table. All the data in the column will be lost.
  - You are about to drop the column `eventType` on the `StockItemEvent` table. All the data in the column will be lost.
  - Added the required column `type` to the `StockItemEvent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StockItemEvent" DROP COLUMN "eventPayload",
DROP COLUMN "eventType",
ADD COLUMN     "payload" JSONB,
ADD COLUMN     "type" TEXT NOT NULL;
