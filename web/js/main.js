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

function updateMover(m) {
    let e = document.getElementById(m.kind);
    e.style.left = m.x * TILE_SIZE + 'px';
    e.style.top = m.y * TILE_SIZE + 'px';
    if(m.health <= 0) {
        e.style.opacity = '0.5';
    }
}

function updateMessages(messages) {
    let o = document.getElementById("output");
    o.innerHTML = messages.join("<br>");
}

function updateMap(status) {
    console.log(status);
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



