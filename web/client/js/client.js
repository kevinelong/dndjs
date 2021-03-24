const TILE_SIZE = 24;
const WIDTH = 31;
const HEIGHT = 21;

document.addEventListener("DOMContentLoaded", () => {
    let map = document.getElementById("map");
    console.log(map);

    command("status");
    let princessStep = 0;

    function animatePrincess() {
        let offset = window.princess.status == 'rescued' ? -16 : 0;
        document.querySelectorAll('#princess').forEach(e => e.style.backgroundPositionX = (((princessStep % 3) + 1) * -(16 - offset)).toString() + "px");
        princessStep++;
        setTimeout(animatePrincess, 450);
    }

    animatePrincess();
    let coinStep = 0;

    function animateCoin() {
        document.querySelectorAll('.coin').forEach(e => e.style.backgroundPositionX = (((coinStep % 4)) * -16).toString() + "px");
        coinStep++;
        setTimeout(animateCoin, 300); //coin bounce *_*_
    }

    animateCoin();

    let monsterStep = 0;

    function animateMonster() {
        document.querySelectorAll('.monster').forEach(e => e.style.backgroundPositionY = (((monsterStep % 4) - 0) * -30).toString() + "px");
        monsterStep++;
        setTimeout(animateMonster, 500)
    }

    animateMonster();
    document.onkeydown = function (e) {
        console.log(e);
        let str = "";

        switch (e.code) {
            case "KeyA":
            case 'ArrowLeft':
                str = 'Left pressed!';
                document.getElementById("hero").style.backgroundPositionY = (-64).toString() + 'px';
                command('left')
                break;

            case 'KeyW':
            case 'ArrowUp':
                str = 'Up pressed!';
                document.getElementById("hero").style.backgroundPositionY = (-32).toString() + 'px';
                command('up')
                break;

            case 'KeyD':
            case 'ArrowRight':
                str = 'Right pressed!';
                document.getElementById("hero").style.backgroundPositionY = (-96).toString() + 'px';
                command('right')
                break;

            case 'KeyS':
            case 'ArrowDown':
                str = 'Down pressed!';
                document.getElementById("hero").style.backgroundPositionY = (0).toString() + 'px';
                command('down')
                break;
        }
        console.log(str);

        // document.body.innerHTML = str;
    }
});
let max_x = 0;
let max_y = 0;

function updateMover(m) {
    let e = undefined;
    if (m.kind == "hero" || m.kind == 'princess') {
        e = document.getElementById(m.kind);
        if (m.kind == "princess" && m.status == 'rescued') {
            e.classList.add('rescued');
        }

    } else if (m.kind == "coin") {
        e = document.createElement("div");
        e.classList.add("coin");
        document.getElementById("map").appendChild(e);
    } else if (m.kind == "wall") {
        e = document.createElement("div");
        e.classList.add("wall");
        document.getElementById("map").appendChild(e);
    } else if (m.kind == "monster") {
        e = document.createElement("div");
        e.classList.add("monster");
        document.getElementById("map").appendChild(e);
    }

    if (e != undefined) {
        max_x = m.x > max_x ? m.x : max_x;
        max_y = m.y > max_y ? m.y : max_y;
        e.style.left = m.x * TILE_SIZE + 'px';
        e.style.top = m.y * TILE_SIZE + 'px';
        if (m.health <= 0) {
            e.style.opacity = '0.5';
        }
    }
}

function updateMessages(messages) {
    let o = document.getElementById("output");
    o.innerHTML = messages.join("<br>");
}

function updateInventory(inventory) {
    let o = document.getElementById("inventory");
    o.innerHTML = inventory.join("<br>");
}

function updateGold(gold) {
    let o = document.getElementById("gold");
    o.innerHTML = `GOLD: ${gold}`;
}

let frame = 0;

function updateMap(status) {
    frame++;
    let hero = status.movers.filter(o => o.kind == "hero")[0];
    window.princess = status.movers.filter(o => o.kind == "princess")[0];
    document.getElementById("hero").style.backgroundPositionX = ((frame % 5) * 32).toString() + 'px';
    updateInventory(hero.inventory);
    updateGold(hero.gold);
    console.log(status);
    document.querySelectorAll('.monster').forEach(e => e.remove());
    document.querySelectorAll('.coin').forEach(e => e.remove());
    document.querySelectorAll('.wall').forEach(e => e.remove());
    status.movers.map(updateMover);
    let map = document.getElementById("map")
    map.style.width = ((max_x + 1) * TILE_SIZE).toString() + "px";
    map.style.height = ((max_y + 1) * TILE_SIZE).toString() + "px";
    updateMessages(status.messages);
}

function command(message) {
    //fetch('http://localhost:8080/?command=' + message.toUpperCase())
    fetch('http://www.sgtskrbl.com:8080/?command=' + message.toUpperCase())
        .then(response => response.json())
        .then(updateMap);
}

/* function command(message) {
    switch (message) {
        case "up" :
            y -= 24;
            break;
        case "down" :
            y += 24;
            break;
        case "left" :
            x -= 24;
            break;
        case "right" :
            x += 24;
            break;
    }
    updateHero();
} */



