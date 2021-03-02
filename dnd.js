let hero = {
    health: 100,
    strength: 40,
    dexterity: 35

}
let monster = {
    health: 100,
    strength: 40,
    dexterity: 35

}
let winner = null;
const BASE_CHANCE_SUCCESS = 40;

while (winner == null) {
    let heroHitPercent = hero.dexterity - monster.dexterity + BASE_CHANCE_SUCCESS;

    if (roll(1, 100, 1) <= heroHitPercent) {

        let damage = roll(1, hero.strength, 1);
        monster.health -= damage
        console.log("   HERO HIT!   damage:"+damage);
    } else {
        console.log("   HERO MISSED!   ");
    }
    let monsterHitPercent = monster.dexterity - hero.dexterity + BASE_CHANCE_SUCCESS;

    if (roll(1, 100, 1) <= monsterHitPercent) {

        let damage = roll(1, monster.strength, 1);
        hero.health -= damage

        console.log("   MONSTER HIT!   damage:"+damage);

    } else {
        console.log("   MONSTER MISSED!   ");
    }
    console.log(hero.health, monster.health);

    if (hero.health <= 0) {
        winner = "monster";
    }

    if (monster.health <= 0) {
        winner = "hero";
    }
}

if (winner == "hero") {
    console.log("VICTORY!");
} else {
    console.log("DEFEAT!");
}

function roll(min, max, times) {
    let total = 0
    for (let t = 0; t < times; t++) {
        total += Math.floor(Math.random() * Math.floor(max)) + min;
    }
    return total;

}

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