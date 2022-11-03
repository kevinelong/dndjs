
const Location = require('./Location').Location;
const Attribute = require('./Attribute').Attribute;

class Mover {
    constructor(name,
                kind = 'hero',
                attributes = undefined,
                inventory = undefined,
                gold = 0,
                location = new Location()) {
        this.status = 'idle';
        this.name = name;
        this.location = location;
        this.kind = kind;
        this.gold = gold;
        if (attributes === undefined) {

            this.attributes = [];
            this.attributes.push(new Attribute("health"));
            this.attributes.push(new Attribute("strength"));
            this.attributes.push(new Attribute("dexterity"));
        } else {
            this.attributes = attributes;
        }

        if (inventory === undefined) {
            this.inventory = [];

        } else {
            this.attributes = attributes;
        }
    }

    toString() {
        return this.name;
    }

    getValue(attributeName) {
        for (let a of this.attributes) {
            if (a.name == attributeName) {
                return a.value;
            }
        }
        console.log('ERROR NO SUCH ATTRIBUTE ' + attributeName);
    }

    setValue(attributeName, value) {
        for (let a of this.attributes) {
            if (a.name == attributeName) {
                a.value = value;
                return;
            }
        }
    }
}

module
    .exports
    .Mover= Mover;
