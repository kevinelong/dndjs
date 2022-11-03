const Dice = require("./Dice").Dice;

class Attribute {
    constructor(name, value = undefined) {
        this.name = name;
        if (value === undefined) {
            this.value = Dice.rollMany(3, 6);
        } else {
            this.value = value;
        }
    }
}

module
    .exports
    .Attribute= Attribute;
