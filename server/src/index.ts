import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { nanoid } from "nanoid";
import { challenges } from "./challenges.js";
import type { RoomState } from "./types.js";

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(",") ?? true }));
app.get("/health", (_req, res) => res.json({ ok: true }));
app.get("/challenges", (_req, res) => res.json(challenges));

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: process.env.CORS_ORIGIN?.split(",") ?? true },
});

const rooms = new Map<string, RoomState>();

io.on("connection", (socket) => {
  socket.on("room:create", (name: string, cb?: (roomId: string) => void) => {
    const id = nanoid(6);
    rooms.set(id, { id, name, leaderboard: [] });
    cb?.(id);
  });

  socket.on(
    "room:join",
    (roomId: string, nickname: string, cb?: (ok: boolean) => void) => {
      const room = rooms.get(roomId);
      if (!room) return cb?.(false);
      socket.join(roomId);
      (socket as any).nickname = nickname;
      cb?.(true);
      io.to(roomId).emit("room:update", room);
    },
  );

  socket.on("round:start", (roomId: string, challengeId: string) => {
    const room = rooms.get(roomId);
    if (!room) return;
    const ch = challenges.find((c) => c.id === challengeId);
    if (!ch) return;
    const endsAt = Date.now() + ch.timeLimitSec * 1000;
    room.currentChallengeId = ch.id;
    room.roundEndsAt = endsAt;
    room.leaderboard = [];
    io.to(roomId).emit("round:started", { challenge: ch, endsAt });
  });

  socket.on(
    "round:submit",
    (
      roomId: string,
      payload: { keystrokes: number; timeMs: number; buffer: string },
    ) => {
      const room = rooms.get(roomId);
      if (!room || !room.currentChallengeId) return;
      const ch = challenges.find((c) => c.id === room.currentChallengeId)!;
      const nickname = (socket as any).nickname || "anon";

      // Sehr einfache Prüfung: exakte Ziel-Übereinstimmung
      if (payload.buffer !== ch.targetText) return;

      const score = payload.keystrokes + Math.round(payload.timeMs / 100); // z. B. 100 ms = 1 Punkt
      room.leaderboard.push({
        userId: socket.id,
        nickname,
        score,
        keystrokes: payload.keystrokes,
        timeMs: payload.timeMs,
        finishedAt: Date.now(),
      });
      room.leaderboard.sort((a, b) => a.score - b.score);
      io.to(roomId).emit("room:update", room);
    },
  );

  socket.on("disconnect", () => {});
});

const port = Number(process.env.PORT || 3001);
httpServer.listen(port, () => {
  console.log(`server on http://localhost:${port}`);
});
