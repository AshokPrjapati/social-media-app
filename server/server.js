const express = require("express");
const connection = require("./config/connect");
const userRoute = require("./routes/user.routes");
const app = express();
require("dotenv").config();

app.use(express.json());

app.use("/", userRoute);
app.get("/", (req, res) => {
    res.send("Welcome")
})

let port = process.env.PORT || 8080;

app.listen(port, async () => {
    try {
        await connection;
        console.log("connected to db")
    } catch (error) {
        console.log(error);
    }
    console.log(`server is running at port: ${port}`);
})