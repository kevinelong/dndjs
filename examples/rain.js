const DELAY_MILLISECONDS = 65; //Delay in Milliseconds (thousandths of a second).
const CHANCE_OF_RAIN = .00125;
const PERCENT_OF_DROP_TO_MOVE_DOWN = 0.95;
const THRESHOLD = 5; //How big does a drop have to be to start falling.
const symbol_list = " .,:;oO";

const WIDTH = 80;
const HEIGHT = 48;
const FIRST_ROW = 0;
const BEYOND_LAST_ROW = HEIGHT;
let row_list = [];

function init() {
    for (let h = 0; h < HEIGHT; h++) {
        let row = [];
        for (let w = 0; w < WIDTH; w++) {
            row.push(0);
        }
        row_list.push(row);
    }
}

function draw() {
    let output = "";
    for (let row_index = 0; row_index < row_list.length; row_index++) {
        for (let column_index = 0; column_index < row_list[row_index].length; column_index++) {
            let drop_count = Math.floor(row_list[row_index][column_index]); //Round down to integer
            let symbol = symbol_list[symbol_list.length - 1]; //Default to the last item in the symbol list.
            if (drop_count < symbol_list.length) { //If drop count is a valid index into the list
                symbol = symbol_list[drop_count]; // then replace default symbol with one from the list based on count.
            }
            output += symbol; //Append the symbol
            output += " "; //append blank space to keep things square.
        }
        output += "\n";
    }
    console.clear();
    console.log(output);
}

function apply_drop(row_index,column_index){
    if (Math.random() < CHANCE_OF_RAIN) { // What are the odds a drop hits this specific square?
        const drop_size = Math.random() * (symbol_list.length / 3);
        row_list[row_index][column_index] += drop_size; //Add Drop
    }
}

function pull_drops_down(row_index,column_index){
    let drop_count = row_list[row_index - 1][column_index]; //Get amount of water from the row above.
    let new_drop_count = drop_count * PERCENT_OF_DROP_TO_MOVE_DOWN;
    if (drop_count >= THRESHOLD) { //Is the drop heavy enough to fall?
        row_list[row_index - 1][column_index] -= new_drop_count; // decrease row above by drop_count
        if(row_index < BEYOND_LAST_ROW){
            row_list[row_index][column_index] += new_drop_count;//Add amount of water from the row above.
        }
    }
}

function update() {
    for (let row_index = BEYOND_LAST_ROW; row_index >= FIRST_ROW; row_index--) { //Loop from last-row+1 down to 0.
        for (let column_index = 0; column_index < WIDTH; column_index++) {//Loop forward through columns.
            if (row_index < BEYOND_LAST_ROW ) {
                apply_drop(row_index, column_index);
            }
            if (row_index > FIRST_ROW) { // skip the first row when looking to pull drops from the row above.
                pull_drops_down(row_index, column_index);
            }
        }
    }
}

init(); // Initialize only once
function main() {
    draw();
    update();
    setTimeout(main, DELAY_MILLISECONDS); //Call self/main (Recursion), after a delay. Repeat forever. An infinite loop.
}
main(); //Call main the first time