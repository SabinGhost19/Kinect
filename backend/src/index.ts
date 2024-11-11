const express = require("express");
const app = express();
require("dotenv").config({ path: "./src/.env" });
import cors from "cors";
const mongoose = require("mongoose");

import authRoutes from "./routes/auth";
import contentRoutes from "./routes/userContent";
import { authenticateTokenVerify } from "./utils/JWT_utils";

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Înlocuiește cu originea frontend-ului tău
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"], // Permite trimiterea cookie-urilor sau a altor credențiale
  })
);
app.use("/auth", authRoutes);
app.use("/data", authenticateTokenVerify, contentRoutes);

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
