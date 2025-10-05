import { io } from "socket.io-client";

const base =
  (window as any).__SERVER__ ||
  import.meta.env.VITE_SERVER ||
  "http://localhost:3001";

export const socket = io(base, { transports: ["websocket"] });
