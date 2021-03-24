const prompt = require('prompt-sync')({sigint: true});
const mapParser = require("./mapParser");
let mp = new mapParser.MapParser();

//console.log(mp.mapData); That's a thing and its working! (we can reference later in the constructor of game)
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

class Item {
    constructor(name, kind) {
        this.name = name;
        this.kind = kind;

    }
}

class Weapon extends Item {
    constructor(name, damage) {
        super(name, "weapon")
        this.damage = damage;

    }
}

class Armor extends Item {
    constructor(name, armor) {
        super(name, "armor");
        this.armor = armor;
    }

}

class Mover {
    constructor(name,
                kind = 'hero',
                attributes = undefined,
                inventory = undefined,
                gold = 0,
                location = new Location()) {
        this.status = 'idle';
        this.name = name;
        this.location = location;
        this.kind = kind;
        this.gold = gold;
        if (attributes === undefined) {

            this.attributes = [];
            this.attributes.push(new Attribute("health"));
            this.attributes.push(new Attribute("strength"));
            this.attributes.push(new Attribute("dexterity"));
        } else {
            this.attributes = attributes;
        }

        if (inventory === undefined) {
            this.inventory = [];

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
        this.updates = [];
        this.messages.push("WELCOME");
        mp.mapData.map(o => this.applyMapItem(o));

    }

    applyMapItem(o) {
        switch (o.value) {
            case 'X':
                let m = new Mover("w", "wall");
                m.location = new Location(o.x, o.y)
                this.addMover(m);
                break;

            case '$':
                let c = new Mover("$", "coin");
                c.gold = 100;
                c.location = new Location(o.x, o.y);
                this.addMover(c);
                break;

            case "M":
                this.monster = new Mover('Troll', 'monster');
                this.monster.location = new Location(o.x, o.y);
                this.addMover(this.monster);
                this.monster.gold = 500;
                this.monster.inventory.push(new Weapon('Rusty Cleaver', 15));
                break;

            case "H":
                this.hero = new Mover('Conan');
                this.hero.location = new Location(o.x, o.y);
                this.hero.setValue('health', 100);
                this.addMover(this.hero);
                this.hero.inventory.push(new Weapon('Rusty Short Sword', 5));
                this.hero.inventory.push(new Armor('Leather Carapace', 5));
                break;

            case "P":
                this.princess = new Mover('Dana', 'princess');
                this.princess.location = new Location(o.x, o.y);
                this.addMover(this.princess);
                break;

        }
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
                loser.inventory.map(i => winner.inventory.push(i));
                winner.gold += loser.gold;
                loser.gold = 0;
                loser.inventory = [];
            } else if (hero.getValue('health') <= 0) {
                winner = monster;
                loser = hero;
            }
            this.addMessage("");
        }
        this.updates.push({
            type: 'fight_result',
            winner: winner.name,
            loser: loser.name
        })

        this.addMessage("");
        this.addMessage(hero.name + ": " + hero.getValue('health'), monster.name + ": " + monster.getValue('health'));

        this.addMessage("VICTORY FOR " + winner.name + '!');

        this.addMessage(loser.name + "   DEFEATED!   ");

        this.addMessage("   ..BOUT FINISHED..   ");
    }

    detectCollisions() {
        let blocked = false;
        let removed = [];
        for (let m of this.movers) {
            for (let m2 of this.movers) {
                if (m2.location.equals(m.location)) {
                    if (m.kind == 'hero') {
                        if (m2.kind == 'monster') {
                            if (m2.getValue('health') > 0) {
                                this.fight(m, m2);
                            }
                        } else if (m2.kind == 'wall') {
                            blocked = true;
                        } else if (m2.kind == 'princess') {
                            this.addMessage('GOOD JOB! LETS GET OUT OF HERE!');
                            blocked = true;
                            m2.status = 'rescued';
                        } else if (m2.kind == 'coin') {
                            m.gold += m2.gold;
                            this.addMessage('collected' + m2.gold.toString());
                            m2.gold = 0;
                            removed.push(m2);
                        }
                    }
                }
            }
        }

        removed.map(o => this.movers = this.movers.filter(item => item !== o));
        return blocked;
    }

    getUpdates() {
        let updates = this.updates;
        this.updates = [];
        return updates;
    }

    getStatus() {
        let output = {
            updates: this.getUpdates(),
            messages: this.messages,
            movers: this.movers.map(m => {
                return {
                    health: m.getValue("health"),
                    name: m.name,
                    kind: m.kind,
                    gold: m.gold,
                    status: m.status,
                    inventory: m.inventory.map(i => {
                        return i.name;
                    }),
                    x: m.location.x,
                    y: m.location.y
                }

            })

        }
        return JSON.stringify(output);

    }

    play(command) {
        this.messages = [];
        if (command != "status") {
            let oldLocation = new Location(this.hero.location.x, this.hero.location.y);
            this.move(this.hero, command);
            let blocked = this.detectCollisions(); //Apply rules. ++
            if (blocked) {
                this.hero.location = oldLocation;
            }
            //console.log(this.getStatus()); //displays state ++
            //let direction = prompt('WHICH WAY?'); //whole words all caps. ++
            //this.play(); //RECURSION. ++
        }

        return this.getStatus();
    }
}

module
    .exports
    .Game = Game;
