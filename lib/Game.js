import Player from './Player.js';

class Game {
    players = [];
    history = [];
    player;
    winningSource = null;
    winningTarget = null
    constructor(min = 0, max = 9) {
        this.min = min;
        this.max = max;
    };

    addPlayer({ name, secret }) {
        if (!name) {
            throw new Error('Must provide a name!');
            return;
        };
        if (typeof secret !== 'number') {
            throw new TypeError(`expected 'number',  got '${typeof secret}'`);
            return;
        };

        const player = new Player(name, secret);
        this.players.push(player);
    };

    checkPlayers() {
        if (this.players.length === 1) {
            this.addPlayer({ name: 'Computer', secret: this.getRandomNumber() })
        }
    }

    displayStats() {
        this.players.forEach(player => player.getStats());
    };

    endGame() {
        // console.log(JSON.stringify(this.history, null, 2))
        console.log('history:', this.history)
        console.log('players:', this.players)
        console.log(`${this.winningSource.getName()} guessed ${this.winningTarget.getName()}'s secret of ${this.winningTarget.getSecret()}`);
    };

    getCurrentPlayer() {
        return this.players[this.player];
    };

    getRandomNumber() {
        return Math.floor(Math.random() * this.max + 1)
    }

    getRandomPlayer() {
        let nextRandomPlayer = this.player
        while (this.player === nextRandomPlayer) {
            nextRandomPlayer = Math.floor(Math.random() * (this.players.length))
        }
        const randomPlayer = this.players[nextRandomPlayer]
        return randomPlayer
    };

    makeGuess({ source, target, guess }) {
        const correct = target.checkGuess({ guess });
        this.history.push({
            source: source.getName(),
            target: target.getName(),
            guess,
        });
        if (correct) {
            this.winningSource = source;
            this.winningTarget = target;
        };
    };

    setNextRound() {
        if (this.player === (this.players.length - 1)) {
            this.player = 0;
        } else {
            this.player++
        };
    };

    start(player = 0) {
        this.player = player
        this.checkPlayers()

        console.log(`starting game`)
        while (!this.winningSource) {
            const target = this.getRandomPlayer();
            let guess = this.getRandomNumber()

            while (target.guessedAlready[guess]) {
                target.guessedAlready[guess]++
                guess = this.getRandomNumber()
            }

            target.guessedAlready[guess] = 1

            this.makeGuess({
                source: this.getCurrentPlayer(),
                target,
                guess
            });
            this.setNextRound();
        };

        this.endGame()
    };
};

export default Game 