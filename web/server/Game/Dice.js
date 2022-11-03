
class Dice {

    static rollOne(sides = 6) {
        return Math.floor(Math.random() * sides) + 1;
    }

    static rollMany(quantity = 1, sides = 6) {
        let total = 0;
        for (let t = 0; t < quantity; t++) {
            total += this.rollOne(sides);
        }
        return total;
    }
}


module
    .exports
    .Dice = Dice;
