import Game from './lib/Game.js';

const players = [
    { name: 'Sam', secret: 0 },
    { name: 'Mo', secret: 9 },
    { name: 'Miley', secret: 7 },
    { name: 'Racquel', secret: 5 },
];

const game = new Game();

players.forEach(player => game.addPlayer(player));

game.start();