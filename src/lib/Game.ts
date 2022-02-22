import { Player } from "./Player";

interface History {
  source: string;
  target: string;
  guess: number;
}

export class Game {
  players: Player[] = [];
  history: History[] = [];
  playersIndex: number;
  winningSource: Player;
  winningTarget: Player;
  min: number;
  max: number;

  constructor({ min = 0, max = 9 }) {
    this.min = min;
    this.max = max;
  }

  addPlayer({ name, secret }) {
    if (!name) {
      throw new Error("Must provide a name!");
      return;
    }
    if (typeof secret !== "number") {
      throw new TypeError(`expected 'number',  got '${typeof secret}'`);
      return;
    }

    const playersIndex = new Player(name, secret);
    this.players.push(playersIndex);
  }

  checkPlayers() {
    if (this.players.length === 1) {
      this.addPlayer({ name: "Computer", secret: this.getRandomNumber() });
    }
  }

  endGame() {
    console.log("history:", this.history);
    // console.log("players:", this.players);
    console.log(
      `
${this.winningSource.getName().toUpperCase()} guessed ${this.winningTarget
        .getName()
        .toUpperCase()}'s secret number ${this.winningTarget.getSecret()} after ${
        this.history.length
      } rounds.
`
    );

    console.log(`*** GAME OVER ***\n`);
  }

  getCurrentPlayer() {
    return this.players[this.playersIndex];
  }

  getNextGuess(target: Player) {
    let guess = this.getRandomNumber();

    while (target.guessedAlready[guess]) {
      target.guessedAlready[guess]++;
      guess = this.getRandomNumber();
    }
    target.guessedAlready[guess] = 1;

    return guess;
  }

  getRandomNumber() {
    return Math.floor(Math.random() * this.max + 1);
  }

  getRandomPlayer() {
    let nextRandomPlayer = this.playersIndex;
    while (this.playersIndex === nextRandomPlayer) {
      nextRandomPlayer = Math.floor(Math.random() * this.players.length);
    }
    const randomPlayer = this.players[nextRandomPlayer];
    return randomPlayer;
  }

  makeGuess({ source, target, guess }) {
    const correct = target.checkGuess({ guess });
    if (correct) {
      this.winningSource = source;
      this.winningTarget = target;
    }
  }

  setNextRound() {
    if (this.playersIndex === this.players.length - 1) this.playersIndex = 0;
    else this.playersIndex++;
  }

  start(playersIndex = 0) {
    this.playersIndex = playersIndex;
    this.checkPlayers();

    console.log(`*** STARTING GAME ***\n`);

    while (!this.winningSource) {
      const source = this.getCurrentPlayer();
      const target = this.getRandomPlayer();
      const guess = this.getNextGuess(target);

      this.makeGuess({ source, target, guess });
      this.updateHistory({ source, target, guess });
      this.setNextRound();
    }

    this.endGame();
  }

  updateHistory({ source, target, guess }) {
    this.history.push({
      source: source.getName(),
      target: target.getName(),
      guess,
    });
  }
}
