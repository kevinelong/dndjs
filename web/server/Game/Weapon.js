
const Item= require('./Item').Item;
class Weapon extends Item {
    constructor(name, damage) {
        super(name, "weapon")
        this.damage = damage;

    }
}


module
    .exports
    .Weapon= Weapon;
