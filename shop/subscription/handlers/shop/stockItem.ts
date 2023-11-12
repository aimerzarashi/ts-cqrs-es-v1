import { PrismaClient } from "@prisma/client";

export async function stockItemCreated(aggregateId: string, payload: any) {

  const prisma = new PrismaClient();
  const result = await prisma.stockItem.create({
    data: {
      id: aggregateId,
      accountId: JSON.parse(JSON.parse(payload)).accountId,
      name: JSON.parse(JSON.parse(payload)).name
    }
  });

  console.debug({
    result: result
  });
}

export async function stockItemUpdated(aggregateId: string, payload: any) {

  const prisma = new PrismaClient();
  const result = await prisma.stockItem.update({
    where: {
      id: aggregateId
    },
    data: {
      name: JSON.parse(JSON.parse(payload)).name
    }
  });

  console.debug({
    result: result
  });
}