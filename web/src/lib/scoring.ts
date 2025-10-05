export class Scoring {
  keystrokes = 0;
  pastePenalty = 0;
  startedAt = 0;

  start() {
    this.keystrokes = 0;
    this.pastePenalty = 0;
    this.startedAt = performance.now();
  }

  tickKey() {
    this.keystrokes++;
  }

  addPastePenalty(n: number) {
    this.pastePenalty += n;
  }

  result() {
    const timeMs = performance.now() - this.startedAt;
    const score =
      this.keystrokes + Math.round(timeMs / 100) + this.pastePenalty;
    return { timeMs, score };
  }
}
