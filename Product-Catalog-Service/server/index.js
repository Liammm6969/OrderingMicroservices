const express = require("express");
const app = express();
const PORT = 7000;
const mongoose = require("mongoose");
const Product = require("./ProductModel");
const amqp = require("amqplib");
var order;

var channel, connection;

app.use(express.json());
mongoose.connect(
    "mongodb://localhost/product-service").then(() => {
        console.log("Connected to MongoDB");
    }
    ).catch((err) => {
        console.error("Error connecting to MongoDB", err);
    });


async function connect() {
    const amqpServer = "amqp://localhost";
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue("PRODUCT");
    console.log("Connected to RabbitMQ-product-service");
}
connect();

app.get("/product", async (req, res) => {
    const products = await Product.find();
    return res.status(200).json({
        message: "Products fetched successfully",
        products,
    });
}
);
app.post("/product/buy", async (req, res) => {
    const { ids } = req.body;
    const products = await Product.find({ _id: { $in: ids } });
    channel.sendToQueue(
        "ORDER",
        Buffer.from(
            JSON.stringify({
                products,
                userEmail: req.body.userEmail,
            })
        )
    );
    channel.consume("PRODUCT", (data) => {
        order = JSON.parse(data.content);
    });
    return res.json(order);
});

app.post("/product/create", async (req, res) => {
    const { name, description, price, size } = req.body;
    const newProduct = new Product({
        name,
        description,
        price,
        size
    });
    newProduct.save();
    return res.json(newProduct);
});


app.listen(PORT, () => {
    console.log(`Product-Service at ${PORT}`);
});