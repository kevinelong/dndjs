const prompt = require('prompt-sync')({sigint: true});
const Game = require("./game");
let g = new Game.Game();

while (true) {
    console.log(g.play("status"));
    let command = prompt("?");
    g.play(command);
}