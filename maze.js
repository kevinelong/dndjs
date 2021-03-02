function createMap() {
    const WIDTH = 48;
    const HEIGHT = 24;
    let rows = [];
    for (let r = 0; r < HEIGHT; r++) {
        let row = [];
        for (let c = 0; c < WIDTH; c++) {
            row.push("# ");
        }
        rows.push(row)
    }
    return rows;
}


function showMap(map) {
    let output = "";

    let makeRow = function (row) {
        row.forEach(c => output += c);
        output += "\n";

    }

    map.forEach(makeRow);
    return output;
}

let map = createMap();
map[12][24] = "X ";
console.log(showMap(map));

