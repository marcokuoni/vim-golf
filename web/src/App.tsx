import React, { useEffect, useState } from "react";
import { socket } from "./lib/socket";
import AdminPanel from "./components/AdminPanel";
import RoomClient from "./components/RoomClient";

export default function App() {
  const [view, setView] = useState<"admin" | "join">("admin");
  useEffect(() => {
    if (location.hash.indexOf("#join") === 0) setView("join");
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-5xl mx-auto p-4 sm:p-8">
        <h1 className="text-3xl font-bold mb-4">Vim Golf Live</h1>
        <div className="flex gap-2 mb-6">
          <button
            className={`px-3 py-1 rounded ${view === "admin" ? "bg-black text-white" : "bg-white border"}`}
            onClick={() => setView("admin")}
          >
            Admin
          </button>
          <button
            className={`px-3 py-1 rounded ${view === "join" ? "bg-black text-white" : "bg-white border"}`}
            onClick={() => setView("join")}
          >
            Join
          </button>
        </div>
        {view === "admin" ? <AdminPanel /> : <RoomClient />}
      </div>
    </div>
  );
}
