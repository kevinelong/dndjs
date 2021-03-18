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
});
let x = 0;
let y = 0;

function updateMonster(x, y) {
    let monster = document.getElementById("MONSTER");
    monster.style.left = x + "px";
    monster.style.top = y + "px";

}

function updateHero() {
    let hero = document.getElementById("HERO");
    hero.style.left = x + "px";
    hero.style.top = y + "px";

}

function updateMessages(messages) {
    let o = document.getElementById("output");
    o.innerHTML = messages.join("<br>");
}

function updateMap(status) {
    console.log(status);
    x = status.movers[0].x * TILE_SIZE;
    y = status.movers[0].y * TILE_SIZE;
    updateHero();
    updateMonster(status.movers[1].x * TILE_SIZE, status.movers[1].y * TILE_SIZE);
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



