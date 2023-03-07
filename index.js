require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connect = require("./src/config/db");
const userrouter = require("./src/features/Auth/user.route")
const jobrouter = require("./src/features/jobs/jobs.route")
const PORT = process.env.PORT || 8080;


const app = express();
app.use(cors());
app.use(express.json());

app.use('/user', userrouter)
app.use('/jobs', jobrouter)

app.get("", async (req, res) => {
    return res.send("Hello World")
})
app.listen(PORT, async (req, res) => {
    try {
        await connect();
        console.log("Connected to DB")
    } catch (error) {
        console.log("Error: ", error);
    }
})