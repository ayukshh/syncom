import express from "express";
import mongoose from "mongoose";
import cors from "cors";           //ughh anyway
import dotenv from "dotenv";
import http from "http"; 
import router from "./routes/auth.js";
import createWSS from "./websocket_server.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error:", err));

const server = http.createServer(app);

app.use("/api/auth", router);

app.get("/", (req, res) => {
  res.send("Server is running");
});

createWSS(server);

const port = process.env.PORT || 7000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
