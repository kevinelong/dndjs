let map = document.getElementById("map");
for (let x = 0; x < 720; x += 24) {
    for (let y = 0; y < 480; y += 24) {
        let tile = document.createElement("div");
        tile.classList.add("tile");
        tile.style.left = x + "px";
        tile.style.top = y + "px";
        map.appendChild(tile);
    }
}
let x = 0
function moveRight() {
    x += 24;
    document.getElementById("HERO").style = "margin-left:" + x + "px";
}

function doit() {
    var target = document.getElementById("target");
    //document.body.innerHTML = "new stuff";
    target.innerHTML += '<br>still inside div :)';
}

//doit();