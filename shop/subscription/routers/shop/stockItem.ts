import { Kafka, EachMessagePayload } from 'kafkajs';
import { stockItemCreated, stockItemUpdated } from '@/handlers/shop/stockItem';

type MessageValue = {
  schema: any
  payload: {
    before: any
    after: {
      id: string;
      occurredAt: string;
      aggregateId: string;
      eventType: string;
      eventPayload: string;
    }
    source: any
    op: any
    ts_ms: string
    transaction: string
  }
};

const StockItemEventType = {
  CREATED: 'Created',
  UPDATED: 'Updated',
}

async function runConsumer() {
  const kafka = new Kafka({
    clientId: 'stockItemEvent',
    brokers: ['eventmesh-kafka:9092'],
  });

  const consumer = kafka.consumer({ groupId: 'ShopSubscription' });

  await consumer.connect();
  await consumer.subscribe({ topic: 'shop.public.stockItemEvent', fromBeginning: true });

  const eventHandlers = new Map<string, (aggregateId: string, eventPayload: any) => void>();
  eventHandlers.set(StockItemEventType.CREATED, stockItemCreated);
  eventHandlers.set(StockItemEventType.UPDATED, stockItemUpdated);

  await consumer.run({
    eachMessage: async (messagePayload: EachMessagePayload) => {
      const { topic, partition, message } = messagePayload
      if (message.value === null) {
        const error = new Error('message is null:' + messagePayload);
        console.log(error);
        return;
      }

      const messageValue: MessageValue = JSON.parse(message.value.toString());
      const event = messageValue.payload.after;
      if (event === null) {
        const error = new Error('message value is null:' + messageValue);
        console.log(error);
        return;
      }

      const eventHandler = eventHandlers.get(event.eventType);
      if (!eventHandler) {
        const error = new Error('Unknown event type:' + event.eventType)
        console.log(error);
        return;
      }

      eventHandler(event.aggregateId, event.eventPayload);
    },
  });
}

runConsumer();