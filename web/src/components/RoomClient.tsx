import React, { useEffect, useMemo, useRef, useState } from "react";
import { socket } from "../lib/socket";
import VimEditor from "./VimEditor";
import type { Challenge, RoomState } from "../types";
import { Scoring } from "../lib/scoring";

export default function RoomClient() {
  const params = new URLSearchParams(location.hash.replace("#join?", ""));
  const roomId = params.get("room") || "";
  const [nickname, setNickname] = useState("");
  const [joined, setJoined] = useState(false);
  const [room, setRoom] = useState<RoomState | null>(null);
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [buffer, setBuffer] = useState("");
  const [target, setTarget] = useState("");
  const [endsAt, setEndsAt] = useState<number | null>(null);
  const scoring = useRef(new Scoring());

  useEffect(() => {
    const onUpdate = (state: RoomState) => setRoom({ ...state });
    const onStarted = ({
      challenge,
      endsAt,
      state,
    }: {
      challenge: Challenge;
      endsAt: number;
      state: RoomState;
    }) => {
      setChallenge(challenge);
      setBuffer(challenge.startText);
      setTarget(challenge.targetText);
      setEndsAt(endsAt);
      scoring.current.start();
      console.log(state);
      setRoom({ ...state });
    };
    socket.on("room:update", onUpdate);
    socket.on("round:started", onStarted);
    return () => {
      socket.off("room:update", onUpdate);
      socket.off("round:started", onStarted);
    };
  }, []);

  const timeLeft = useCountdown(endsAt);

  const handleJoin = () => {
    if (!roomId || !nickname) return;
    socket.emit("room:join", roomId, nickname, (ok: boolean) => setJoined(ok));
  };

  const solved = useMemo(() => target && buffer === target, [buffer, target]);

  useEffect(() => {
    if (solved && roomId) {
      const { timeMs } = scoring.current.result();
      socket.emit("round:submit", roomId, {
        keystrokes: scoring.current.keystrokes + scoring.current.pastePenalty,
        timeMs,
        buffer,
      });
    }
  }, [solved]);

  return (
    <div className="space-y-4">
      {!joined ? (
        <div className="bg-white p-4 rounded-xl border">
          <div className="mb-2">
            Raum-ID: <span className="font-mono">{roomId || "—"}</span>
          </div>
          <input
            className="border rounded px-2 py-1 mr-2"
            placeholder="Nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <button
            className="px-3 py-1 rounded bg-black text-white"
            onClick={handleJoin}
            disabled={!nickname || !roomId}
          >
            Join
          </button>
        </div>
      ) : (
        <div className="bg-white p-4 rounded-xl border space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Challenge</div>
              <div className="font-semibold">
                {challenge ? challenge.title : "Warte auf Start"}
              </div>
              <div className="text-sm text-gray-600">
                {challenge ? challenge.description : ""}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Zeit</div>
              <div className="font-mono text-lg">{timeLeft ?? "—"}</div>
            </div>
          </div>

          {challenge && (
            <>
              <div className="grid md:grid-cols-1 gap-3">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Ziel</div>
                  <pre className="p-2 bg-gray-50 rounded border overflow-auto whitespace-pre-wrap">
                    {challenge.targetText}
                  </pre>
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Dein Editor</div>
                <VimEditor
                  value={buffer}
                  onChange={setBuffer}
                  onKey={() => scoring.current.tickKey()}
                  onPaste={() =>
                    scoring.current.addPastePenalty(
                      challenge.penalties?.paste ?? 200,
                    )
                  }
                />
              </div>
            </>
          )}
        </div>
      )}

      {room && (
        <div>
          <h3 className="font-semibold mb-2">Leaderboard</h3>
          {/* Vereinfachte Anzeige durch Reuse der Admin-Komponente wäre möglich */}
          <div className="bg-white p-4 rounded-xl border">
            {room.leaderboard.length === 0 ? (
              "Noch keine Einträge"
            ) : (
              <ol className="list-decimal pl-5">
                {room.leaderboard.map((r) => (
                  <li key={r.userId} className="mb-1">
                    <span className="font-medium">{r.nickname}</span> – Score{" "}
                    {r.score} ({r.keystrokes} keys,{" "}
                    {(r.timeMs / 1000).toFixed(2)}s)
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function useCountdown(endsAt: number | null) {
  const [now, setNow] = useState(performance.now());
  useEffect(() => {
    const id = setInterval(() => setNow(performance.now()), 100);
    return () => clearInterval(id);
  }, []);
  if (!endsAt) return null;
  const left = Math.max(0, endsAt - Date.now());
  const s = Math.floor(left / 1000);
  const mm = String(Math.floor(s / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}
