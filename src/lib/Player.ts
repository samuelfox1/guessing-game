export class Player {
  name: string;
  secret: number;
  constructor(name: string, secret: number) {
    this.name = name;
    this.secret = secret;
  }

  guessedAlready = {};

  checkGuess({ guess }) {
    return guess === this.secret;
  }

  getName() {
    return this.name;
  }

  getSecret() {
    return this.secret;
  }
}
