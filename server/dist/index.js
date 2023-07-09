import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import dashRoutes from "./routes/dash.routes";
import { Server } from "socket.io";
import socketSetup from "./utils/socketSetup";
dotenv.config();
const app = express();
// Use JSON middleware to automatically parse JSON
app.use(bodyParser.json());
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});
// Enable CORS
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
}));
app.use((req, res, next) => {
    req.io = io;
    next();
});
// Connect to MongoDB
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
mongoose
    .connect(process.env.MONGO_URI || "mongodb://localhost:27017/express-typescript", options)
    .then(() => {
    console.log("Connected to MongoDB");
    server.listen((process.env.PORT || 8000), () => {
        console.log(`Listening on port ${process.env.PORT}`);
    });
    socketSetup(io);
})
    .catch((err) => {
    console.log(err);
});
app.use("/auth", authRoutes);
app.use("/dash", dashRoutes);
