import { PrismaClient } from "@prisma/client";

export async function stockItemCreated(aggregateId: string, eventPayload: any) {

  const prisma = new PrismaClient();
  const result = await prisma.stockItem.create({
    data: {
      id: aggregateId,
      accountId: JSON.parse(JSON.parse(eventPayload)).accountId,
      name: JSON.parse(JSON.parse(eventPayload)).name
    }
  });

  console.debug({
    result: result
  });
}