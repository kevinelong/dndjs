const prompt = require('prompt-sync')({sigint: true});

let username = prompt('What is your name? ');

console.log(`Hello ${username}, welcome to the party!`);

console.log("You are standing on a road that goes north and south.")

let direction = prompt('Which direction do you want to go (N=North, S=South)? ');

if (direction == 'N') {
    console.log("You find a house with a treasure chest.")
}

if (direction == 'S') {
    console.log("You find pirates and the kill you and take your stuff.")
}

