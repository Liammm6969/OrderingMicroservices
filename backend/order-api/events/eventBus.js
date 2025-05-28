const amqp = require('amqplib');

class EventBus {
  constructor() {
    this.connection = null;
    this.channel = null;
  }

  async connect() {
    if (!this.connection) {
      // Allow override via env for local dev
      const rabbitUrl = process.env.RABBITMQ_URL || 'amqp://user:password@rabbitmq:5672/';
      this.connection = await amqp.connect(rabbitUrl);
      this.channel = await this.connection.createChannel();
      console.log('Connected to RabbitMQ');
    }
  }

  async publish(queue, message) {
    await this.connect();
    await this.channel.assertQueue(queue, { durable: true });
    const payload = JSON.stringify(message);
    const sent = this.channel.sendToQueue(queue, Buffer.from(payload), {
      persistent: true,
    });
    console.log(`Published event to ${queue}`, payload, 'sent:', sent);
    // Extra debug: check queue status
    const q = await this.channel.checkQueue(queue);
    console.log(`Queue status after publish:`, q);
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
