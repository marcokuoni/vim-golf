import React from "react";
import type { RoomState } from "../types";

export default function Leaderboard({ room }: { room: RoomState }) {
  return (
    <div className="bg-white rounded-xl border p-4">
      <h3 className="font-semibold mb-2">Leaderboard</h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500">
            <th className="py-1">#</th>
            <th className="py-1">Name</th>
            <th className="py-1">Score</th>
            <th className="py-1">Keys</th>
            <th className="py-1">Zeit</th>
          </tr>
        </thead>
        <tbody>
          {room.leaderboard.map((r, i) => (
            <tr key={r.userId} className={i < 3 ? "font-semibold" : ""}>
              <td className="py-1">{i + 1}</td>
              <td className="py-1">{r.nickname}</td>
              <td className="py-1">{r.score}</td>
              <td className="py-1">{r.keystrokes}</td>
              <td className="py-1">{(r.timeMs / 1000).toFixed(2)}s</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
