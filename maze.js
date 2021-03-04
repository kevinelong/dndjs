const prompt = require('prompt-sync')({sigint: true});
let WIDTH = 9;
let HEIGHT = 7;

function roll(min, max, times) {
    let total = 0

    for (let t = 0; t < times; t++) {
        total += Math.floor(Math.random() * Math.floor(max)) + min;
    }
    return total;

}

function attack(a, d) {
    const BASE_CHANCE_SUCCESS = 40;
    let hitPercent = a.dexterity - d.dexterity + BASE_CHANCE_SUCCESS;

    if (roll(1, 100, 1) <= hitPercent) {
        let damage = roll(1, a.strength, 1);
        d.health -= damage
        console.log(a.name + "   HIT!   damage:" + damage);
    } else {
        console.log(a.name + "    MISSED!   ");
    }
}


function fight(hero, monster) {
    let winner = null;
    let loser = null;


    while (winner == null) {
        attack(hero, monster);
        attack(monster, hero);
        if (monster.health <= 0) {
            winner = hero;
            loser = monster;
        } else if (hero.health <= 0) {
            winner = monster;
            loser = hero;
        }
        console.log("");
    }

    console.log("");
    console.log(hero.name + ": " + hero.health, monster.name + ": " + monster.health);

    console.log("VICTORY FOR " + winner.name + '!');

    console.log(loser.name + "   DEFEATED!   ");

    console.log("   ..BOUT FINISHED..   ");
}

function setBoardSize(width, height) {
    WIDTH = width;
    HEIGHT = height;

}

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
    for (let i in gold) {
        map[gold[i].location[1]][gold[i].location[0]] = gold[i].symbol;
    }

    for (let m = 0; m < monsters.length; m++) {
        map[monsters[m].location[1]][monsters[m].location[0]] = monsters[m].symbol;
    }
    map[hero.location[1]][hero.location[0]] = hero.symbol;
    draw(map);
    console.log(hero.gold);
}

function collision() {
    var deletedGold = -1;
    for (let i in gold) {
        let g = gold[i];

        if (hero.location[0] == g.location[0] && hero.location[1] == g.location[1]) {

            hero.gold += g.gold;
            deletedGold = i;
        }
    }
    if (deletedGold >= 0) {
        gold.splice(deletedGold, 1);
        //delete gold[deletedGold];
    }
    for (let m = 0; m < monsters.length; m++) {

        if (hero.location[0] == monsters[m].location[0] && hero.location[1] == monsters[m].location[1]) {
            fight(hero, monsters[m]);

            if (hero.health <= 0) {
                hero.symbol = color(RED) + "X ";
                render();
                console.log("Hero Died!");
                console.log("G A M E  O V E R");
                process.exit(0);
            } else {
                monsters.splice(m, 1);
            }
        }
    }
}

function makeCharacter(charName, symbol) {

    return {
        name: charName,
        title: "",
        gold: 0,
        location: [0, 0],
        symbol: symbol,
        health: roll(1, 10, 10),
        strength: roll(1, 10, 10),
        dexterity: roll(1, 10, 10)
    }
}

function makeHero(charName, symbol) {
    let hero = makeCharacter(charName, symbol);
    hero.strength *= 1.2;
    hero.health *= 3;
    return hero;
}

let hero = {};
let gold = [];
let monsters = [];
const MAX_MONSTERS = 10;

function init() {
    monsters = [];
    for (let m = 0; m < MAX_MONSTERS; m++) {
        monsters.push(makeCharacter('m' + m, color(RED) + "M "));
    }

    setBoardSize(24, 12);
    hero = makeHero('Grizwald', color(MAGENTA) + "H ")


    centerLocation(hero);
    for (let m = 0; m < monsters.length; m++) {
        randomLocation(monsters[m]);
    }
    for (let m = 0; m < 5; m++) {
        gold.push(makeCharacter('gold' + m, color(YELLOW) + "$ "));
        randomLocation(gold[m]);
        gold[m].gold = 100;
    }

}

init()
let playing = true;
while (playing) {

    render();
    let command = prompt('Which way? (w, a, s, d) -or- q to quit? ');
    update(command);
    collision();
}
console.log("G A M E  O V E R");