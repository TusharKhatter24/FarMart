import express from "express";
import cors from "cors";
// const mongoose = require('mongoose');
import mongoose from "mongoose";

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/FarMartDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const fileSchema = new mongoose.Schema({
    fileName: String,
    originalLink: String,
    shortLink: String,
    expiringDate: Date,
});

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    files: [fileSchema],
});

// Create models for your schemas
const UserModel = mongoose.model('User', userSchema);
const FileModel = mongoose.model('File', fileSchema);

app.post("/register", (req, res) => {
    const { name, email, password } = req.body;

    const newUser = new UserModel({
        name,
        email,
        password,
        files: [],
    });

    newUser.save()
    .then(() => {
      console.log('User created successfully');
    })
    .catch((err) => {
      console.error('Error creating user:', err);
    });

    res.status(200).json({ status: 200, message: "Registration successful" });
});

const users = [
    {
        id: 1,
        email: "t@k.com",
        password: "tk24",
    },
];

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
        // Successful login
        res.status(200).json({ status: 200, message: "Login successful" });
    } else {
        // Invalid credentials
        res.status(401).json({ status: 401, message: "Login failed" });
    }
});

app.listen(5000, () => console.log("server started at port 5000"));