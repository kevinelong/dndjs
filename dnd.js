function roll(min, max, times) {
    let total = 0

    for (let t = 0; t < times; t++) {
        total += Math.floor(Math.random() * Math.floor(max)) + min;
    }
    return total;

}

function makeCharacter(charName) {
    return {
        name: charName,
        title: "",
        location: [12, 24],
        health: roll(1, 10, 10),
        strength: roll(1, 10, 10),
        dexterity: roll(1, 10, 10)
    }
}

function makeHero(charName) {
    let hero = makeCharacter(charName);
    hero.strength *= 1.1;
    hero.health *= 2;
    return hero;
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


    while (winner == null) {
        attack(hero, monster);
        attack(monster, hero);
        winner = monster.health <= 0 ? hero.name : monster.name;
        /* if (monster.health <= 0) {
             winner = hero.name;
         } else{
             winner = monster.name;
         }*/
        console.log("");
    }

    console.log("");
    console.log(hero.name + ": " + hero.health, monster.name + ": " + monster.health);

    if (winner == hero.name) {
        console.log("VICTORY FOR "+ hero.name+'!');
    } else {
        console.log(monster.name + "   DEFEATED!   ");
    }
    console.log("   ..BOUT FINISHED..   ");
}

function main() {

    let hero = makeHero("Griswald");
    let monster = makeCharacter("Lurker");
    fight(hero, monster);
}

main();
function testRoll() {

    let values = {
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
        11: 0,
        12: 0,
        13: 0,
        14: 0,
        15: 0,
        16: 0,
        17: 0,
        18: 0
    }

    let small = 18;
    let large = 0;
    for (let i = 0; i < 500; i++) {
        let value = roll(1, 6, 3);
        values[value]++;
        if (value > large) {
            large = value;
        }
        if (value < small) {
            small = value;
        }
    }

    console.log(small, large);
    console.log(values);
    for (let v = 3; v <= 18; v++) {
        let value = values[v];
        let bar = "";
        for (let b = 0; b < value; b++) {
            bar += "*";
        }
        if (value < 10) {
            value = " " + value;
        }
        let vv = v;
        if (v < 10) {
            vv = " " + v;
        }

        console.log(vv, value, bar);
    }
}

//testRoll();