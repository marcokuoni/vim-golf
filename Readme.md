# Vim-Golf Live (Starter)

Mehrere Sessions, Vim-Tipps und Challenges mit Live-Leaderboard. Admin erstellt einen Raum, zeigt QR, Teilnehmer treten anonym bei, lösen im Browser mit Vim-Keymap.

## Quickstart

- Server starten: `cd server && cp .env.example .env && npm i && npm run dev`
- Web starten: `cd web && npm i && npm run dev`
- Admin-UI öffnen: `http://localhost:5173` → Tab «Admin» → Raum erstellen → QR projizieren
- Teilnehmer: QR scannen → «Join»-Ansicht mit `#join?room=<ID>`

## Anpassungen

- **Challenges** in `server/src/challenges.ts` (Start/Ziel/Text, Zeitlimit, Paste-Penalty)
- **Bewertung** in `web/src/lib/scoring.ts` (Formel für Score)
- **Anti-Paste** in `VimEditor.tsx` (paste-Event blocken/gewichten)

## TODO (für v1)

- Server-seitige Validierung von Operationen (Diff/Replays)
- Persistenz (Redis/SQLite) statt In-Memory
- Admin-Controls: Stop/Reveal, Auto-Next, Mehrere Runden
- Team-Modus und «Best of N»
- Export als CSV

## Deploy

- Push auf `main` → GH Actions baut Images → pusht nach GHCR → verbindet per SSH → `docker compose up -d` auf dem Server.
- Danach ist die App unter `https://golf.lemonbrain.ch` (Web) und `wss/https://api-golf.lemonbrain.ch` (Socket.IO) erreichbar.
