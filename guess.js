const prompt = require('prompt-sync')({sigint: true});

// Random number from 1 - 10
const numberToGuess = Math.floor(Math.random() * 100) + 1;
// This variable is used to determine if the app should continue prompting the user for input
let playing = true; //Bool true/false

while (playing) {
    // Get user input
    let guess = prompt('Guess a number from 1 to 100: ');
    // Convert the string input to a number
    guess = Number(guess);

    // Compare the guess to the secret answer and let the user know.
    if (guess === numberToGuess) {
        console.log('W I N N E R!  Congrats, you got it!');
        playing = false;
    } else {
        console.log('AWWW, Sorry, guess again!');

        //GIVE THE USER A CLUE
        if(numberToGuess > guess) {
            console.log("My number is HIGHER than your guess. ")
        }else{
            console.log("My number is LOWER than your guess. ")
        }
    }
}

console.log('G A M E   O V E R');

