import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/register", (req, res) => {
    // Extract registration data from the request body
    const { name, email, password } = req.body;
    // TODO: store it in DB.
    res.json({ message: "Registration successful!" });
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
        res.status(200).json({ message: "Login successful" });
    } else {
        // Invalid credentials
        res.status(401).json({ message: "Login failed" });
    }
});

app.listen(5000, () => console.log("server started at port 5000"));