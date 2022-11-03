
class Location {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    equals(otherLocation) {
        return this.x == otherLocation.x && this.y == otherLocation.y;
    }

    /*  toString(){
         return  `{x: ${this.x}, y: ${this.y}}`;
     } */

}

Location.prototype.toString = function () {
    return `{x: ${this.x}, y: ${this.y}}`;
}


module
    .exports
    .Location= Location;
