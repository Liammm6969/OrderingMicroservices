const amqp = require('amqplib');

class EventBus {
  constructor() {
    this.connection = null;
    this.channel = null;
  }

  async connect() {
    if (!this.connection) {
      // Use rabbitmq as hostname in Docker, localhost otherwise
      const url = `amqp://guest:guest@localhost:5672/`;
      this.connection = await amqp.connect(url);
      this.channel = await this.connection.createChannel();
      console.log('Connected to RabbitMQ');
    }
  }

  async publish(queue, message) {
    await this.connect();
    await this.channel.assertQueue(queue, { durable: true });
    this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
      persistent: true,
    });
    console.log(`Published event to ${queue}`, message,);
  }

  async subscribe(queue, handler) {
    await this.connect();
    await this.channel.assertQueue(queue, { durable: true });
    this.channel.consume(queue, (msg) => {
      if (msg !== null) {
        const event = JSON.parse(msg.content.toString());
        console.log(`Received event from ${queue}`, event);
        handler(event);
        this.channel.ack(msg);
      }
    });
  }
}

module.exports = new EventBus();
