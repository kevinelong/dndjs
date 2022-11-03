
const Location = require('./Location').Location;
class Map {
    constructor(size = new Size()) {
        this.size = size;
        this.locations = [];

        for (let x = 0; x < size.width; x++) {
            for (let y = 0; y < size.height; y++) {
                this.locations.push(new Location(x, y));
            }
        }
    }

    moveRandom(mover) {

        mover.location.x = Math.floor(Math.random() * this.size.width);
        mover.location.y = Math.floor(Math.random() * this.size.height);
    }

    moveCenter(mover) {
        mover.location.x = Math.floor(0.5 * this.size.width);
        mover.location.y = Math.floor(0.5 * this.size.height);
    }
}


module
    .exports
    .Map= Map;
