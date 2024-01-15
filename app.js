const express = require('express')
const mongoose = require("mongoose");
const cors = require("cors");

const authenticationRoute = require("./Routes/AuthenticationRoute");
const itemsRoute = require("./Routes/ItemsRoute");
const auctionRoute = require("./Routes/auctionRoute");

//intializing
const app = express();

app.use(
    cors({
      origin: "*",
    })
);

setTimeout(function() {
    mongoose.connect('mongodb://127.0.0.1:27017/ECom',async () =>{
        console.log(`Successfully connected to the mongoDB database`)
    });
}, 60000);

app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authenticationRoute);
app.use('/api/items',itemsRoute);
app.use('/api/auction',auctionRoute);

const url = "http://localhost:3000/API/"

app.use("/", (req, res, next) => {
    res.status(404).json("page not found");
    console.log('404')
    next();
});

//lunching server with app.listen definit
let Port = 5000;
app.listen(
  Port,
  console.log(`Server is running on port ${Port}...`)
);
