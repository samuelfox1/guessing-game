const Player = require('./Player')

class Game {
    players = []
    history = []
    player
    constructor(min = 0, max = 9) {
        this.min = min
        this.max = max
    }

    addPlayer({ name, secret }) {
        if (!name) return console.log('must provide a name!')
        if (typeof secret !== 'number') return console.log('must provide a secret!')

        const player = new Player(name, secret)
        this.players.push(player)
    }
    makeGuess({ sourcePlayer, targetPlayer }) {
        if (!(this.players.length)) {
            console.log('must have at least one player player!')
            return
        }
        console.log('currentP:', currentP)
    }
    makeRandomGuess() {
        const sourcePlayer = this.players[this.player]
        // const targetPlayer = this.players[this.player]
    }
    displayStats() {
        this.players.forEach(player => player.getStats())
    }
    start(player = 0) {
        this.player = player
        console.log(`starting game`)
        this.makeRandomGuess()
    }
}

module.exports = Game