import express from "express";
import http from "http";
import { Server } from "socket.io";
import axios from "axios";
import cron from "node-cron";
import path from "path";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

interface Website {
  url: string;
  status: string;
  history: { timestamp: string; status: string }[];
}

const websites: Website[] = [
  { url: "https://example.com", status: "Unknown", history: [] },
  { url: "https://anotherexample.com", status: "Unknown", history: [] },
];

const checkWebsites = async () => {
  const timestamp = new Date().toLocaleString();
  for (let website of websites) {
    try {
      const response = await axios.get(website.url);
      website.status = response.status === 200 ? "Online" : "Offline";
    } catch (error) {
      website.status = "Offline";
    }
    website.history.push({ timestamp, status: website.status });
  }
  io.emit("update", { websites, timestamp });
};

// Schedule the checks every 5 seconds
cron.schedule("*/5 * * * * *", () => {
  checkWebsites();
});

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.emit("update", { websites, timestamp: new Date().toLocaleString() });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "./index.html"));
// });

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
