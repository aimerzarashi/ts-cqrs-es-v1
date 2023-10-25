-- CreateTable
CREATE TABLE "stockItemEvent" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "aggregateId" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "eventPayload" JSONB,

    CONSTRAINT "stockItemEvent_pkey" PRIMARY KEY ("id")
);
