-- CreateTable
CREATE TABLE "inboundPlanEvent" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "aggregateId" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "eventPayload" JSONB,

    CONSTRAINT "inboundPlanEvent_pkey" PRIMARY KEY ("id")
);
