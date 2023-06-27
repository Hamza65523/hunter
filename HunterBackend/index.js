const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const register = require("./routes/register");
const login = require("./routes/login");
const image = require("./routes/image");

const fs = require('fs') 
const app = express();

require("dotenv").config();

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({extended:false}));
app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));



app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/images", image);

app.get("/", (req, res) => {
  res.send("Welcome our Hunter Api...");
});



const uri = process.env.DB_URI;
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port: ${port}...`);
});

mongoose
  .connect('mongodb://127.0.0.1:27017/hunter', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connection established..."))
  .catch((error) => console.error("MongoDB connection failed:", error.message));
