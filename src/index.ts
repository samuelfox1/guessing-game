import { Game } from "./lib/Game";

const players = [
  { name: "Sam", secret: 0 },
  { name: "Mo", secret: 9 },
  { name: "Miley", secret: 7 },
  { name: "Racquel", secret: 5 },
];

const game = new Game({ max: 10 });
players.forEach((player) => game.addPlayer(player));

game.start();
