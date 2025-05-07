const express = require("express");
const app = express();
const PORT = 7000;
const mysql = require("mysql2/promise");
const amqp = require("amqplib");

var order;
var channel, connection;


const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "product_service",
});

app.use(express.json());


async function connect() {
    const amqpServer = "amqp://localhost";
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue("PRODUCT");
    console.log("Connected to RabbitMQ-product-service");
}
connect();

app.get("/product", async (req, res) => {
    try {
        const [products] = await db.query("SELECT * FROM products");
        return res.status(200).json({
            message: "Products fetched successfully",
            products,
        });
    } catch (err) {
        console.error("Error fetching products:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
});


app.post("/product/buy", async (req, res) => {
    const { ids } = req.body;
    try {
        const [products] = await db.query(
            "SELECT * FROM products WHERE id IN (?)",
            [ids]
        );
        channel.sendToQueue(
            "ORDER",
            Buffer.from(
                JSON.stringify({
                    products,
                    email: req.body.userEmail,
                })
            )
        );
        channel.consume("PRODUCT", (data) => {
            order = JSON.parse(data.content);
        });
        console.log(req.body);
        return res.json(order);
    } catch (err) {
        console.error("Error buying products:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
});


app.post("/product/create", async (req, res) => {
    const { name, description, price, size } = req.body;
    try {
        const [result] = await db.query(
            "INSERT INTO products (name, description, price, size) VALUES (?, ?, ?, ?)",
            [name, description, price, size]
        );
        return res.json({
            id: result.insertId,
            name,
            description,
            price,
            size,
        });
    } catch (err) {
        console.error("Error creating product:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

app.listen(PORT, () => {
    console.log(`Product-Service at ${PORT}`);
});