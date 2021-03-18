document.addEventListener("DOMContentLoaded", () => {
    let map = document.getElementById("map");
    console.log(map);
    for (let x = 0; x < 720; x += 24) {
        for (let y = 0; y < 480; y += 24) {
            let tile = document.createElement("div");
            tile.classList.add("tile");
            tile.style.left = x + "px";
            tile.style.top = y + "px";
            map.appendChild(tile);
        }
    }
});
let x = 0;
let y = 0;

function updateHero() {
    document.getElementById("HERO").style = "margin-left:" + x + "px; margin-top :" + y + "px;";
}

function command(message) {
    fetch('http://localhost:8080/?command=' + message.toUpperCase())
        .then(response => response.json())
        .then(data => console.log(data));
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



