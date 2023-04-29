const express = require("express");
const connection = require("./config/connect");
const app = express();
require("dotenv").config();

app.use(express.json());

let port = process.env.PORT || 8080;

const connectDB = async () => {

}

app.listen(port, async () => {
    try {
        await connection;
        console.log("connected to db")
    } catch (error) {
        console.log(error);
    }
    console.log(`server is running at port: ${port}`);
})