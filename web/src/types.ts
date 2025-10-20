export type Challenge = {
  id: string;
  title: string;
  description: string;
  startText: string;
  targetText: string;
  timeLimitSec: number;
  penalties?: { paste?: number };
};

export type LeaderboardEntry = {
  userId: string;
  nickname: string;
  score: number;
  keystrokes: number;
  timeMs: number;
  finishedAt: number;
};

export type LeaderboardSumEntry = {
  userId: string;
  nickname: string;
  totalScore: number; // lower is better if your score metric is "lower = better"
  rounds: number;
  bestScore: number;
};

export type RoomState = {
  id: string;
  name: string;
  leaderboard: LeaderboardEntry[]; // per round (reset)
  leaderboardSum: LeaderboardSumEntry[]; // across rounds (persistent)
  currentChallengeId?: string;
  roundEndsAt?: number;
};
