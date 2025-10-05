export type Challenge = {
  id: string;
  title: string;
  description: string;
  startText: string;
  targetText: string;
  timeLimitSec: number;
  penalties?: { paste?: number };
};

export type RoomState = {
  id: string;
  name: string;
  currentChallengeId?: string;
  roundEndsAt?: number;
  leaderboard: Array<{
    userId: string;
    nickname: string;
    score: number;
    keystrokes: number;
    timeMs: number;
    finishedAt: number;
  }>;
};
