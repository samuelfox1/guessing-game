// an automated guessing game for numbers 1-10


/*
    player object
        - name
        - secret number
        - history
            -collection of guesses for another player
    
        - methods
            - receiveGuessFrom
                - recieve a number
                - check if number matches my secret
                - add guess to history
                - respond true or false if number matches

 */


const Game = require('./lib/Game')
const seed = [
    { name: 'Sam', secret: 0 },
    { name: 'Mo', secret: 9 }
]
const game = new Game()

seed.forEach(player => game.addPlayer(player))
console.log(game)
game.start()