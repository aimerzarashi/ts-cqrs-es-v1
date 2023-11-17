-- CreateTable
CREATE TABLE "StockItemEvent" (
    "id" TEXT NOT NULL,
    "occurredAt" TIMESTAMP(3) NOT NULL,
    "aggregateId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "payload" JSONB,

    CONSTRAINT "StockItemEvent_pkey" PRIMARY KEY ("id")
);
