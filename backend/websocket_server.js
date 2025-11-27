import { WebSocketServer } from "ws";
import jwt from "jsonwebtoken";
import Message from "./models/message_models.js";

export default function createWSS(server) {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws, req) => {
    const params = new URLSearchParams(req.url.replace("/message",""));
    const token = params.get("token");

    if (!token) return ws.close();

    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      ws.user = user;
    } catch (err) {
      ws.close();
      return;
    }

    ws.on("message", async (data) => {
      try {
        const text = data.toString();
        const message = await Message.create({
          username: ws.user.username,
          text,
        });

        // broadcast
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
          }
        });

        console.log("websocket is running");
      } catch (err) {
        console.error(err);
      }
    });
  });
}

//bad part about this is this sends tokens in url not in headers like  "headers: {Authorization: `Bearer ${token}`}"