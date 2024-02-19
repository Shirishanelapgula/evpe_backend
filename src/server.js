const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const cors = require("cors");

const userRoutes = require("../routes/userRoutes");
const contactRoutes = require("../routes/contactRoutes");
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;
const FRONTEND = process.env.FRONTEND;

const corsOptions = {
  origin: FRONTEND,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());

app.use(cors(corsOptions));

app.use("/user", userRoutes);

app.use("/contact", contactRoutes);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}!`);
    });
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
