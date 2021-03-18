
const prompt = require('prompt-sync')({sigint: true});

class Dice {

    static rollOne(sides = 6) {
        return Math.floor(Math.random() * sides) + 1;
    }

    static rollMany(quantity = 1, sides = 6) {
        let total = 0;
        for (let t = 0; t < quantity; t++) {
            total += this.rollOne(sides);
        }
        return total;
    }
}

class Attribute {
    constructor(name, value = undefined) {
        this.name = name;
        if (value === undefined) {
            this.value = Dice.rollMany(3, 6);
        } else {
            this.value = value;
        }
    }
}

class Size {
    constructor(width = 0, height = 0) {
        this.width = width;
        this.height = height;
    }
}

class Location {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    equals(otherLocation) {
        return this.x == otherLocation.x && this.y == otherLocation.y;
    }

    /*  toString(){
         return  `{x: ${this.x}, y: ${this.y}}`;
     } */

}

Location.prototype.toString = function () {
    return `{x: ${this.x}, y: ${this.y}}`;
}

class Map {
    constructor(size = new Size()) {
        this.size = size;
        this.locations = [];
        for (let x = 0; x < size.width; x++) {
            for (let y = 0; y < size.height; y++) {
                this.locations.push(new Location(x, y));
            }
        }
    }

    moveRandom(mover) {
        mover.location.x = Math.floor(Math.random() * this.size.width);
        mover.location.y = Math.floor(Math.random() * this.size.height);
    }

    moveCenter(mover) {
        mover.location.x = Math.floor(0.5 * this.size.width);
        mover.location.y = Math.floor(0.5 * this.size.height);
    }
}

class Mover {
    constructor(name,
                kind = 'hero',
                attributes = undefined,
                location = new Location()) {

        this.name = name;
        this.location = location;
        this.kind = kind;
        if (attributes === undefined) {
            this.attributes = [];
            this.attributes.push(new Attribute("health"));
            this.attributes.push(new Attribute("strength"));
            this.attributes.push(new Attribute("dexterity"));
        } else {
            this.attributes = attributes;
        }
    }

    toString() {
        return this.name;
    }

    getValue(attributeName) {
        for (let a of this.attributes) {
            if (a.name == attributeName) {
                return a.value;
            }
        }
        console.log('ERROR NO SUCH ATTRIBUTE ' + attributeName);
    }

    setValue(attributeName, value) {
        for (let a of this.attributes) {
            if (a.name == attributeName) {
                a.value = value;
                return;
            }
        }
        console.log('ERROR NO SUCH ATTRIBUTE ' + attributeName);
    }
}

class Game {
    constructor() {
        this.map = new Map(new Size(31, 21));
        this.movers = [];
        this.messages = [];
        this.messages.push("WELCOME");

        this.hero = new Mover('Conan');
        this.addMover(this.hero);
        this.map.moveCenter(this.hero);

        this.monster = new Mover('Troll', 'monster');
        this.addMover(this.monster);
        this.map.moveRandom(this.monster);
    }

    addMessage(text) {
        this.messages.push(text);

    }

    move(mover, direction) {
        if (direction == 'UP') {
            mover.location.y -= 1;
        } else if (direction == 'DOWN') {
            mover.location.y += 1;
        } else if (direction == 'LEFT') {
            mover.location.x -= 1;
        } else if (direction == 'RIGHT') {
            mover.location.x += 1;
        }
    }

    addMover(mover) {
        this.movers.push(mover);
    }

    attack(a, d) {
        const BASE_CHANCE_SUCCESS = 40;
        let dexterityA = a.getValue('dexterity');
        let dexterityD = d.getValue('dexterity');
        let hitPercent = dexterityA - dexterityD + BASE_CHANCE_SUCCESS;

        if (Dice.rollOne(10) <= hitPercent) {
            let damage = Dice.rollOne(a.getValue('strength'));
            d.setValue('health', d.getValue('health') - damage);
            this.addMessage(a.name + "   HIT!   damage:" + damage);
        } else {
            this.addMessage(a.name + "    MISSED!   ");
        }
    }

    fight(hero, monster) {
        let winner = null;
        let loser = null;


        while (winner == null) {
            this.attack(hero, monster);
            this.attack(monster, hero);
            if (monster.getValue('health') <= 0) {
                winner = hero;
                loser = monster;
            } else if (hero.getValue('health') <= 0) {
                winner = monster;
                loser = hero;
            }
            this.addMessage("");
        }

        this.addMessage("");
        this.addMessage(hero.name + ": " + hero.getValue('health'), monster.name + ": " + monster.getValue('health'));

        this.addMessage("VICTORY FOR " + winner.name + '!');

        this.addMessage(loser.name + "   DEFEATED!   ");

        this.addMessage("   ..BOUT FINISHED..   ");
    }

    detectCollisions() {
        for (let m of this.movers) {
            for (let m2 of this.movers) {
                if (m2.location.equals(m.location)) {
                    if (m.kind == 'hero' && m2.kind == 'monster') {
                        this.fight(m, m2);
                    }
                }
            }
        }
    }

    getStatus() {
        let output = `{"messages": [`;

        output += this.messages.map(i => `"${i}"`).join(",");
        output += `], "movers": [`;
        output += this.movers.map(m => `{"name": "${m.name}", "x": ${m.location.x}, "y": ${m.location.y}} `).join(",");
        output += "]}\n\n";

        return output;
    }

    play(command) {
        if (command != "status") {
            this.move(this.hero, command);
            this.detectCollisions(); //Apply rules. ++
            //console.log(this.getStatus()); //displays state ++
            //let direction = prompt('WHICH WAY?'); //whole words all caps. ++
            //this.play(); //RECURSION. ++
        }

        return this.getStatus();
    }
}

module.exports.Game = Game;