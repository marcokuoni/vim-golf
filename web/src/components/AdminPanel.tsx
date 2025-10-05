import React, { useEffect, useMemo, useState } from "react";
import { socket } from "../lib/socket";
import QrJoin from "./QrJoin";
import Leaderboard from "./Leaderboard";
import type { Challenge, RoomState } from "../types";

export default function AdminPanel() {
  const [room, setRoom] = useState<RoomState | null>(null);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [name, setName] = useState("Main Room");

  useEffect(() => {
    fetch(`${(window as any).__SERVER__ ?? "http://localhost:3001"}/challenges`)
      .then((r) => r.json())
      .then(setChallenges);
    const handler = (state: RoomState) => setRoom({ ...state });
    socket.on("room:update", handler);
    return () => void socket.off("room:update", handler);
  }, []);

  const roomUrl = useMemo(
    () =>
      room ? `${location.origin}${location.pathname}#join?room=${room.id}` : "",
    [room],
  );

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-xl border space-y-2">
        <div className="font-semibold">Raum</div>
        {room ? (
          <div className="flex items-center gap-4">
            <div>
              ID: <span className="font-mono">{room.id}</span>
            </div>
            <QrJoin url={roomUrl} />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <input
              className="border rounded px-2 py-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button
              className="px-3 py-1 rounded bg-black text-white"
              onClick={() =>
                socket.emit("room:create", name, (id: string) => {
                  setRoom({ id, name, leaderboard: [] });
                })
              }
            >
              Create Room
            </button>
          </div>
        )}
      </div>

      <div className="bg-white p-4 rounded-xl border">
        <div className="font-semibold mb-2">Runde starten</div>
        {room ? (
          <div className="flex flex-col gap-2">
            {challenges.map((ch) => (
              <button
                key={ch.id}
                className="text-left border rounded p-2 hover:bg-gray-50"
                onClick={() => socket.emit("round:start", room.id, ch.id)}
              >
                <div className="font-medium">{ch.title}</div>
                <div className="text-sm text-gray-500">{ch.description}</div>
              </button>
            ))}
          </div>
        ) : (
          <div>Bitte zuerst einen Raum erstellen.</div>
        )}
      </div>

      {room && <Leaderboard room={room} />}
    </div>
  );
}
