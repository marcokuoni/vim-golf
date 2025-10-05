import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
  define: {
    __SERVER__: JSON.stringify(
      process.env.VITE_SERVER || "http://localhost:3001",
    ),
  },
});
