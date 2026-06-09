import express from 'express';
import dotenv from 'dotenv';

import executeRoute from "./routes/executeRoute.js"

dotenv.config()
const PORT = process.env.PORT || 3000;


const app = express();

app.get("/", (req, res) => {
    res.status(200).send("Hello World")
});

app.use(express.json());

app.use('/api/execute', executeRoute);


app.listen(PORT, () => {
    console.log(`Server is listening on Port: ${PORT}`)
});