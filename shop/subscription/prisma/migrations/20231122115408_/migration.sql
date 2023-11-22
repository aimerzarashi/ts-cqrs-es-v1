/*
  Warnings:

  - You are about to drop the `stockItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "stockItem";

-- CreateTable
CREATE TABLE "StockItem" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "StockItem_pkey" PRIMARY KEY ("id")
);
