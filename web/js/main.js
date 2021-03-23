const TILE_SIZE = 24;
const WIDTH = 31;
const HEIGHT = 21;

document.addEventListener("DOMContentLoaded", () => {
    let map = document.getElementById("map");
    console.log(map);
    for (let x = 0; x < WIDTH; x++) {
        for (let y = 0; y < HEIGHT; y++) {
            let tile = document.createElement("div");
            tile.classList.add("tile");
            tile.style.left = TILE_SIZE * x + "px";
            tile.style.top = TILE_SIZE * y + "px";
            map.appendChild(tile);
        }
    }

    command("status");
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

function updateMover(m) {
    let e = undefined;
    if (m.kind == "hero") {
        e = document.getElementById(m.kind);
    } else if (m.kind == "monster") {
        e = document.createElement("div");
        e.classList.add("monster");
        document.getElementById("map").appendChild(e);

    }
    if (e != undefined) {


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
    document.getElementById("hero").style.backgroundPositionX = ((frame % 5) * 32).toString() + 'px';
    updateInventory(status.movers[0].inventory);
    updateGold(status.movers[0].gold);
    console.log(status);
    document.querySelectorAll('.monster').forEach(e => e.remove());
    status.movers.map(updateMover);
    updateMessages(status.messages);
}

function command(message) {
    fetch('http://localhost:8080/?command=' + message.toUpperCase())
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



