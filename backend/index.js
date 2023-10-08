import express from "express";
import { shorten } from 'tinyurl';
import cors from "cors";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import multer from "multer";
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/FarMartDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const fileSchema = new mongoose.Schema({
    originalName: String,
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
        await newUser.save();
        return res.status(200).json({ status: 200, message: 'Registration successful', data: { userId, files: [] } });
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

        if (passwordMatch) {
            return res.status(200).json({ status: 200, message: 'Login successful', data: { userId: user.userId, files: user.files } });
        } else {
            return res.status(401).json({ status: 401, message: 'Invalid password' });
        }
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ status: 500, message: 'Internal server error' });
    }
});

const firebaseConfig = {
    apiKey: "AIzaSyBeCystbn-RmxdwKP53diMyGGMHSIajFco",
    authDomain: "farmart-507fa.firebaseapp.com",
    projectId: "farmart-507fa",
    storageBucket: "farmart-507fa.appspot.com",
    messagingSenderId: "20405436760",
    appId: "1:20405436760:web:abe87467937c5c2de0a52d",
    measurementId: "G-8397BNB5KF"
};

initializeApp(firebaseConfig);

const storage = getStorage();

const upload = multer({ storage: multer.memoryStorage() });

app.post("/upload", upload.single("file"), async (req, res) => {
    const fileName = `files/${req.file.originalname + new Date()}`;
    const storageRef = ref(storage, fileName);
    const metadata = {
        contentType: req.file.mimetype,
    }

    try {
        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);

        const downloadUrl = await getDownloadURL(snapshot.ref);
        const shortLink = await shorten(downloadUrl);

        const expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() + 1);

        const userId = req.body.userId;
        const user = await UserModel.findOne({ userId });

        if (user) {
            user.files.push({
                originalName: req.file.originalname,
                fileName,
                originalLink: downloadUrl,
                shortLink,
                expiringDate: expirationDate,
            });
            const currentTime = new Date();
            user.files = user.files.filter((file) => {
                const expirationTime = new Date(file.expiringDate);
                return expirationTime >= currentTime;
            });
            await user.save();
            return res.status(200).json({ status: 200, message: 'File uploaded successfully', data: { files: user.files } });
        } else {
            return res.status(404).json({ status: 404, message: 'User not found' });
        }
    } catch (error) {
        console.error('File upload error:', error);
        return res.status(500).json({ status: 500, message: 'Internal server error.' });
    }
});

app.get('/files', async (req, res) => {
    const userId = req.query.userId;
    try {
        const user = await UserModel.findOne({ userId });

        if (user) {
            return res.status(200).json({ status: 200, data: { files: user.files } });
        } else {
            return res.status(404).json({ status: 404, message: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user files:', error);
        return res.status(500).json({ status: 500, message: 'Internal server error' });
    }
});

app.delete('/delete', async (req, res) => {
    const { fileIdx, userId } = req.body;
    try {
      const user = await UserModel.findOne({ userId });
  
      if (!user) {
        return res.status(404).json({ status: 404, message: 'User not found' });
      }
  
      // Filter out the file to be deleted
      user.files = user.files.filter((file, index) => index !== fileIdx);
  
      // Save the updated user object
      await user.save();
  
      return res.status(200).json({ status: 200, message: 'File deleted successfully', data: { files: user.files } });
    } catch (error) {
      console.error('File deletion error:', error);
      return res.status(500).json({ status: 500, message: 'Internal server error.' });
    }
  });
  

app.listen(5000, () => console.log("server started at port 5000"));