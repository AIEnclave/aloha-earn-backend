// src/config/rabbitmq.config.ts
export const rabbitmqConfig = {
    urls: ['amqp://localhost:5672'], // RabbitMQ connection string
    queue: 'your-queue-name',
    queueOptions: {
        durable: false,
    },
};
