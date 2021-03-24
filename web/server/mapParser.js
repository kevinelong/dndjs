const fs = require('fs');

class MapParser {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.output = [];
        try {
            const data = fs.readFileSync('map.txt', 'utf8');
            this.mapData = this.mapToMovers(data);

        } catch (err) {
            console.error(err);
        }

    }

    letterToObject(l) {
        if (l == '\r') {
            this.x = 0;
        } else if (l == '\n') {
            this.y++;
        } else if (l == " ") {
            //do nothing
        } else if (l == ".") {
            this.x++;
        } else {
            this.output.push({x: this.x, y: this.y, value: l});
            this.x++;
        }
    }


    mapToMovers(data) {
        this.output = [];
        this.x = 0;
        this.y = 0;

        data = [...data]; //turning a string into an array of individual letters
        data.map(l => this.letterToObject(l));

        return this.output;
    }
}

module
    .exports
    .MapParser = MapParser;