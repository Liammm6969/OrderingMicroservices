const express = require("express");
const app = express();
const PORT = 8000;
const { Pool } = require("pg");
const amqp = require("amqplib");

var channel, connection;


const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "order_service",
    password: "selerqc",
    port: 5432,
});

app.use(express.json());


async function createOrder(products, email) {
    let total = 0;
    for (let t = 0; t < products.length; ++t) {
        total += products[t].price;
    }

    const client = await pool.connect();
    try {

        const result = await client.query(
            `INSERT INTO orders (products, user_email, total_price) VALUES ($1, $2, $3) RETURNING *`,
            [JSON.stringify(products), email, total]
        );
        return result.rows[0];
    } catch (err) {
        console.error("Error creating order:", err);
        throw err;
    } finally {
        client.release();
    }
}

async function connect() {
    const amqpServer = "amqp://localhost";
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue("ORDER");
    console.log("Connected to RabbitMQ-order-service");
}

connect().then(() => {
    channel.consume("ORDER", async (data) => {
        console.log("Consuming ORDER service");
        const { products, email } = JSON.parse(data.content);
        try {
            const newOrder = await createOrder(products, email);
            channel.ack(data);
            channel.sendToQueue(
                "PRODUCT",
                Buffer.from(JSON.stringify({ newOrder }))
            );
        } catch (err) {
            console.error("Error processing order:", err);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Order-Service at ${PORT}`);
});