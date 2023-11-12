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
      type: string;
      payload: string;
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
    clientId: 'StockItemEvent',
    brokers: ['eventmesh-kafka:9092'],
  });

  const consumer = kafka.consumer({ groupId: 'ShopSubscription' });

  await consumer.connect();
  await consumer.subscribe({ topic: 'shop.public.StockItemEvent', fromBeginning: true });

  const eventHandlers = new Map<string, (aggregateId: string, payload: any) => void>();
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
      if (!event) {
        const error = new Error('message value is null:' + messageValue);
        console.log(error);
        return;
      }

      const eventHandler = eventHandlers.get(event.type);
      if (!eventHandler) {
        const error = new Error('Unknown event type:' + event.type)
        console.log(error);
        return;
      }

      eventHandler(event.aggregateId, event.payload);
    },
  });
}

runConsumer();