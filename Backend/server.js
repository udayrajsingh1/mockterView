import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import protect from './middlewares/authMiddleware.js';

import executeRoute from "./routes/executeRoute.js"
import authRoute from "./routes/authRoute.js"

dotenv.config()
const PORT = process.env.PORT || 3000;


const app = express();

app.get("/", (req, res) => {
    res.status(200).send("Hello World")
});

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDb connected"))
.catch((err) => console.error("MongoDb connection error"))

app.use('/api/execute', protect, executeRoute);
app.use("/api/auth", authRoute)


app.listen(PORT, () => {
    console.log(`Server is listening on Port: ${PORT}`)
});