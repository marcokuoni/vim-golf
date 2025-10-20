import React, { useEffect } from "react";
import type { RoomState } from "../types";

export default function Leaderboard({ room }: { room: RoomState }) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="border rounded-xl p-3">
        <div className="font-semibold mb-2">Aktuelle Runde</div>
        <ol className="space-y-1">
          {room.leaderboard.map((r, i) => (
            <li key={r.userId} className="flex justify-between">
              <span>
                {i + 1}. {r.nickname}
              </span>
              <span className="font-mono">{r.score}</span>
            </li>
          ))}
        </ol>
      </div>
      <div className="border rounded-xl p-3">
        <div className="font-semibold mb-2">Gesamtrangliste</div>
        <ol className="space-y-1">
          {room.leaderboardSum.map((s, i) => (
            <li key={s.userId} className="flex justify-between">
              <span>
                {i + 1}. {s.nickname}
                <span className="text-gray-500"> · {s.rounds} Runde/n</span>
              </span>
              <span className="font-mono">
                {s.totalScore}{" "}
                <span className="text-gray-500">(best {s.bestScore})</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
