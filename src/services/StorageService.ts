const HIGH_SCORE_KEY = 'flying-bird-game:high-score';

export class StorageService {
  static getHighScore(): number {
    const storedValue = window.localStorage.getItem(HIGH_SCORE_KEY);
    const parsedValue = Number.parseInt(storedValue ?? '0', 10);

    return Number.isFinite(parsedValue) && parsedValue > 0 ? parsedValue : 0;
  }

  static setHighScore(score: number): number {
    const normalizedScore = Math.max(0, Math.floor(score));
    const highScore = Math.max(this.getHighScore(), normalizedScore);

    window.localStorage.setItem(HIGH_SCORE_KEY, String(highScore));

    return highScore;
  }
}
