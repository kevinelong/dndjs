const Item = require("./Item").Item;

class Armor extends Item {
    constructor(name, armor) {
        super(name, "armor");
        this.armor = armor;
    }

}

module
    .exports
    .Armor= Armor;
