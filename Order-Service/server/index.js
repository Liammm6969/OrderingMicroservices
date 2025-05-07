const express = require("express");
const app = express();
const PORT = 8000;
const mongoose = require("mongoose");
const Order = require("./OrderModel");
const amqp = require("amqplib");

var channel, connection;

mongoose.connect(
    "mongodb://localhost/order-service",).then(() => {
        console.log("MongoDB connected successfully");
    }
    ).catch((err) => {
        console.log("MongoDB connection error: ", err);
    }
    );
app.use(express.json());

function createOrder(products, userEmail) {
    let total = 0;
    for (let t = 0; t < products.length; ++t) {
        total += products[t].price;
    }
    const newOrder = new Order({
        products,
        user: userEmail,
        total_price: total,
    });
    newOrder.save();
    return newOrder;
}
async function connect() {
    const amqpServer = "amqp://localhost";
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue("ORDER");
    console.log("Connected to RabbitMQ-order-service");
}
connect().then(() => {
    channel.consume("ORDER", (data) => {
        console.log("Consuming ORDER service");
        const { products, userEmail } = JSON.parse(data.content);
        const newOrder = createOrder(products, userEmail);
        channel.ack(data);
        channel.sendToQueue(
            "PRODUCT",
            Buffer.from(JSON.stringify({ newOrder }))
        );
    });
});

app.listen(PORT, () => {
    console.log(`Order-Service at ${PORT}`);
});