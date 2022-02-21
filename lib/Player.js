class Player {
    constructor(name, secret) {
        this.name = name;
        this.secret = secret;
    };

    guessedAlready = {};

    checkGuess({ guess }) {
        return (guess === this.secret);
    };

    getName() {
        return this.name;
    };

    getSecret() {
        return this.secret;
    };

}
export default Player;