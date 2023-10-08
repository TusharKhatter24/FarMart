import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

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
    userId: String,
    name: String,
    email: String,
    password: String,
    files: [fileSchema],
});

// Create models for your schemas
const UserModel = mongoose.model('User', userSchema);
const FileModel = mongoose.model('File', fileSchema);

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = uuidv4();
        const newUser = new UserModel({
            userId,
            name,
            email,
            password: hashedPassword,
            files: [],
        });
        console.log(userId);
        await newUser.save();
        return res.status(200).json({ status: 200, message: 'Registration successful', data: {userId} });
    } catch (error) {
        return res.status(500).json({ status: 500, message: 'Internal server error' });
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ status: 401, message: 'No existing user' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        // console.log(passwordMatch)
        if (passwordMatch) {
            return res.status(200).json({ status: 200, message: 'Login successful' });
        } else {
            return res.status(401).json({ status: 401, message: 'Invalid password' });
        }
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ status: 500, message: 'Internal server error' });
    }
});

app.listen(5000, () => console.log("server started at port 5000"));