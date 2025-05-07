const express = require("express");
const app = express();
const PORT = 9000;
const mongoose = require("mongoose");
const User = require("./UserModel");


mongoose.connect("mongodb://localhost/auth-service").then(() => {
    console.log("MongoDB connected successfully");
}
).catch((err) => {
    console.log("MongoDB connection error: ", err);
}
);

app.use(express.json());

app.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Please fill all fields" });
    }
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: "User doesn't exist" });
    } else {
        if (password !== user.password) {
            return res.status(400).json({ message: "Password Incorrect" });
        }
        req.user = user;
        return res.status(200).json({ message: "Login Successful", user });
    }
});

app.post("/auth/register", async (req, res) => {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
        return res.status(400).json({ message: "Please fill all fields" });
    }
    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    } else {
        const newUser = new User({
            email,
            name,
            password,
        });
        await newUser.save();
        return res.status(200).json({ message: "User registered successfully", user: newUser });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});