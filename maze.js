const prompt = require('prompt-sync')({sigint: true});
const WIDTH = 9;
const HEIGHT = 7;

function createMap() {
    //  const WIDTH = 9;
    // const HEIGHT = 6;
    let rows = [];
    for (let r = 0; r < HEIGHT; r++) {
        let row = [];
        for (let c = 0; c < WIDTH; c++) {
            row.push(color(NORMAL) + ". ");
        }
        rows.push(row)
    }
    return rows;
}

const NORMAL = 97;
const RED = 91;
const YELLOW = 93;
const MAGENTA = 35;

function color(c) {
    return ("\033[1;" + c + "m");
}


function draw(board) {
    for (let r = 0; r < board.length; r++) {
        for (let c = 0; c < board[r].length; c++) {
            process.stdout.write(board[r][c] + " ")
        }
        console.log("")
    }
}

function randomLocation(hasLocation) {
    hasLocation.location = [Math.floor(Math.random() * WIDTH), Math.floor(Math.random() * HEIGHT)];
}

function centerLocation(hasLocation) {
    hasLocation.location = [Math.floor(WIDTH / 2), Math.floor(HEIGHT / 2)];
}

hero = {
    gold: 0,
    location: [0, 0],
    symbol: color(MAGENTA) + "H "
}
monster = {
    gold: 0,
    location: [0, 0],
    symbol: color(RED) + "M "
}
gold = {
    gold: 100,
    location: [0, 0],
    symbol: color(YELLOW) + "$ "
}
centerLocation(hero);
randomLocation(monster);
randomLocation(gold);

function moveRight(hasLocation) {
    if (hasLocation.location[0] < (WIDTH - 1)) {
        hasLocation.location[0]++;
    }
}

function moveLeft(hasLocation) {
    if (hasLocation.location[0] > 0) {
        hasLocation.location[0]--;
    }
}

function moveUp(hasLocation) {
    if (hasLocation.location[1] > 0) {
        hasLocation.location[1]--;
    }
}

function moveDown(hasLocation) {
    if (hasLocation.location[1] < (HEIGHT - 1)) {
        hasLocation.location[1]++;
    }
}

function update(command) {
    if (command == "q") {
        playing = false;
    } else if (command == "w") {
        moveUp(hero);
    } else if (command == "a") {
        moveLeft(hero);
    } else if (command == "s") {
        moveDown(hero);
    } else if (command == "d") {
        moveRight(hero);
    }
}

function render() {
    let map = createMap();
    map[gold.location[1]][gold.location[0]] = gold.symbol;
    map[monster.location[1]][monster.location[0]] = monster.symbol;
    map[hero.location[1]][hero.location[0]] = hero.symbol;
    draw(map);
    console.log(hero.gold);
}

function collision() {
    if (hero.location[0] == gold.location[0] && hero.location[1] == gold.location[1]) {
        hero.gold += gold.gold;
        randomLocation(gold);
    }
    if (hero.location[0] == monster.location[0] && hero.location[1] == monster.location[1]) {
        hero.symbol = color(RED) + "X ";
        render();
        console.log("Hero Died!");
        playing = false;
    }
}

let playing = true;
while (playing) {

    render();
    let command = prompt('Which way? (w, a, s, d) -or- q to quit? ');
    update(command);
    collision();
}
console.log("G A M E  O V E R");