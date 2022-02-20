class Player {
    constructor(name, secret) {
        this.name = name
        this.secret = secret
    }
    receiveGuessFrom({ player, guess }) {
        const correct = (guess === this.secret)
        return correct
    }
    getStats() {
        console.log({
            name: this.name,
            history: this.history
        })
    }
    getName() {
        return this.name
    }
}
module.exports = Player