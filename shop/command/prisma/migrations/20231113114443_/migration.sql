/*
  Warnings:

  - You are about to drop the column `payload` on the `StockItemEvent` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `StockItemEvent` table. All the data in the column will be lost.
  - Added the required column `eventType` to the `StockItemEvent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StockItemEvent" DROP COLUMN "payload",
DROP COLUMN "type",
ADD COLUMN     "eventPayload" JSONB,
ADD COLUMN     "eventType" TEXT NOT NULL;
