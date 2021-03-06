export const GameType = {
  twoOfTwo: 0,
  oneOfOne: 1,
  oneOfThree: 2
};

export const ImageType = {
  PAINT: 0,
  PHOTO: 1
};

export const globalGameData = {
  DEBUG: window.location.hash.replace(`#`, ``).toLowerCase() === `debug`,
  TOTAL_LIVES: 3,
  MIN_LIVES: 0,
  MAX_ANSWERS: 10,
  START_TIME: 30,
  FAST_TIME: 20,
  SLOW_TIME: 10,
  WARNING_TIME: 5,
  END_TIME: 0,
  TIME_TICK: 1000,

  StatsType: {
    WRONG: 0,
    CORRECT: 1,
    SLOW: 2,
    FAST: 3,
    UNKNOWN: 4
  },

  Points: {
    CORRECT: 100,
    BONUS: 50,
    FINE: -50
  },
};

export default class GameData {
  constructor() {
    this.currentRound = 0;
    this.rounds = [
      {
        questions: [],
        currentTask: 0,
        lives: globalGameData.TOTAL_LIVES,
        stats: [],
        result: []
      }
    ];
    this.name = name;
  }

  configure(questData, name) {
    this.rounds[0].questions = questData;
    this.name = name;
    return this;
  }
}
