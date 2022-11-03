function write(text: string) {
    const contentBytes = new TextEncoder().encode(text);
    Deno.writeAllSync(Deno.stdout, contentBytes);
}

function clear() {
    write("\x1b[2J\x1b[1;1H");
    console.clear();
}

class Data {
    public row_list: any = [];

    constructor(WIDTH: number, HEIGHT: number) {
        for (let h = 0; h < HEIGHT; h++) {
            let row = [];
            for (let w = 0; w < WIDTH; w++) {
                row.push(0);
            }
            this.row_list.push(row);
        }
    }

}


class Command {
    public name: string;
    public data: {};

    constructor(name: string, data = {}) {
        this.data = data;
        this.name = name;
    }
}

// noinspection JSUnusedGlobalSymbols
class Rain {
    private FIRST_ROW: number = 0;
    private data: Data;
    private readonly BEYOND_LAST_ROW: number;
    private readonly row_list: any[];
    private readonly CHANCE_OF_RAIN: number;
    private readonly DELAY_MILLISECONDS: number;
    private readonly THRESHOLD: number;
    private PERCENT_OF_DROP_TO_MOVE_DOWN: number;
    private readonly WIDTH: number;
    private HEIGHT: number;

    constructor(
        width: number = 80,
        height: number = 24,
        CHANCE_OF_RAIN: number = 0.001,
        DELAY_MILLISECONDS: number = 65,
        THRESHOLD: number = 5,
        PERCENT_OF_DROP_TO_MOVE_DOWN: number = 0.90
    ) {
        this.WIDTH = Math.floor(width / 2);
        this.HEIGHT = height;
        this.BEYOND_LAST_ROW = height;
        this.CHANCE_OF_RAIN = CHANCE_OF_RAIN;
        this.DELAY_MILLISECONDS = DELAY_MILLISECONDS;
        this.THRESHOLD = THRESHOLD;
        this.PERCENT_OF_DROP_TO_MOVE_DOWN = PERCENT_OF_DROP_TO_MOVE_DOWN;
        this.data = new Data(width, height);
        this.row_list = this.data.row_list;
    }

    // noinspection JSUnusedGlobalSymbols
    public send(command: Command) {
        write(command.name);
    }

    apply_drop(row_index: number, column_index: number) {
        if (Math.random() < this.CHANCE_OF_RAIN) { // What are the odds a drop hits this specific square?
            const drop_size = Math.random() * 4;
            this.row_list[row_index][column_index] += drop_size; //Add Drop
        }
    }

    pull_drops_down(row_index: number, column_index: number) {
        let drop_count = this.row_list[row_index - 1][column_index]; //Get amount of water from the row above.
        if (drop_count >= this.THRESHOLD) { //Is the drop heavy enough to fall?
            let new_drop_count = drop_count - Math.random() * 1.5; //drop_count * this.PERCENT_OF_DROP_TO_MOVE_DOWN;
            this.row_list[row_index - 1][column_index] -= new_drop_count; // decrease row above by drop_count
            if (row_index < this.BEYOND_LAST_ROW) {
                this.row_list[row_index][column_index] += new_drop_count;//Add amount of water from the row above.
            }
        }
    }

    update() {
        for (let row_index = this.BEYOND_LAST_ROW; row_index >= this.FIRST_ROW; row_index--) { //Loop from last-row+1 down to 0.
            for (let column_index = 0; column_index < this.WIDTH; column_index++) {//Loop forward through columns.
                if (row_index < this.BEYOND_LAST_ROW) {
                    this.apply_drop(row_index, column_index);
                }
                if (row_index > this.FIRST_ROW) { // skip the first row when looking to pull drops from the row above.
                    this.pull_drops_down(row_index, column_index);
                }
            }
        }
    }

}


// noinspection JSUnusedGlobalSymbols
class UserInterfaceCommandLine {
    public sink: any;

    constructor(sink: Rain) {
        this.sink = sink;
    }

    draw(row_list: any[] = []): void {
        const symbol_list = " .,:;oO";
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
        clear();
        write(output);
        //this.sink.send(new Command("drawing complete"))
    }
    cycle() {
        this.draw(this.sink.row_list);
        this.sink.update();
        setTimeout(() => {
            this.cycle()
        }, this.sink.DELAY_MILLISECONDS); //Call self/main (Recursion), after a delay. Repeat forever. An infinite loop.
    }
}
let ui = new UserInterfaceCommandLine(new Rain());
ui.cycle();