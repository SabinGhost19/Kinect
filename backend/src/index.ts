const express = require("express");
const app = express();
require("dotenv").config({ path: "./src/.env" });
const cors = require("cors");
const mongoose = require("mongoose");

import authRoutes from "./routes/auth";
import contentRoutes from "./routes/userContent";
app.use(express.json());
app.use(cors());
app.use("/auth", authRoutes);
app.use("/data", contentRoutes);

const connectToMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Connected to the MongoDB!!!!!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

connectToMongo();

app.listen(process.env.PORT, () => {
  console.log("Server up and running...");
  console.log(process.env.MONGODB_URI);
});
