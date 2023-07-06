import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// Use JSON middleware to automatically parse JSON
app.use(bodyParser.json());
const server = http.createServer(app);

// Enable CORS
app.use(cors());

// Connect to MongoDB
const options: ConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions;
mongoose
  .connect(
    process.env.MONGO_URI || "mongodb://localhost:27017/express-typescript",
    options
  )
  .then(() => {
    console.log("Connected to MongoDB");
    server.listen(8000, () => {
      console.log("Listening on port 8000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
