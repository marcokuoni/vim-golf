import { io } from "socket.io-client";
export const socket = io(
  (window as any).__SERVER__ ?? "http://localhost:3001",
  {
    transports: ["websocket"],
  },
);
