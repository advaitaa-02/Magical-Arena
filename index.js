const Player = require('./Player');
const Match = require('./Match');

const player1 = new Player('Player A', 100, 5, 10); // health, strength , attack
const player2 = new Player('Player B', 100, 10, 5);

const match = new Match(player1, player2);
match.start();
