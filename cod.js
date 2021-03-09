/***
 * BUSINESS PROBLEM - I WANT TO CREATE AN APP WHERE:...
 *
 * Players can choose to play ranked or non-ranked matches in multiplayer mode.
 *
 * It has two types of in-game currencies: "Credits",
 * which are earned through playing the game, and "COD Points",
 * which have to be bought with real world money.
 *
 * It is possible to play the full game without paying,
 * though some exclusive character and weapon skins can only be bought with COD Points.[1]
 * Apart from standard matchmaking,
 * a private room for both the multiplayer,
 * and battle royale modes can also be accessed where players can invite,
 * and battle with just their in-game friends.
 *
 * NOUNS (People Places or things):
 *
 * Player, Rank, Match, Mode
 * Currency, Credits, Points
 * Game, Character, Weapon, Skin/Operator
 * Friend
 * Gun, SniperBase, Sniper, Marksman
 * Ammo, Light, Heavy, Sniper, Ballistic
 * LOOK FOR TWO TYPES OF RELATIONSHIPS: IS_A and HAS_A
 */

class AmmoBase{
    constructor(baseDamage=10, unitQuantity=10, color="white") {
        this.baseDamage = baseDamage;
        this.unitQuantity = unitQuantity;
        this.color = color;
    }
}
class AmmoLight extends AmmoBase{
    constructor() {
        super(15,30);
    }
}
class AmmoHeavy extends AmmoBase{
    constructor() {
        super(20, 20);
        this.color = "yellow";
    }
}
class AmmoBallistic extends AmmoBase{
    constructor() {
        super(50);
        this.color = "blue";
    }
}
class AmmoSniper extends AmmoBase{
    constructor() {
        super(80);
        this.color = "green";
    }
}

class Gun{
    constructor(clipSize= 8, damageRange = 10, ammoType="Light", spread=0) {
        this.ammo = 0;
        this.clipSize = clipSize;
        this.damageRange = damageRange;
        this.ammoType = ammoType
        this.hasScope = false;
    }
}

class SniperBase extends Gun{
    constructor() {
        super();
        this.ammoType = "Sniper";
    }
}

class Sniper extends SniperBase{
    constructor() {
        super();
        this.hasScope = true;
    }

}

class Marksman extends SniperBase{
    constructor() {
        super();
        this.bulletSpread = 10;
    }
}

class Player{
    constructor() {
        this.autoReload = false;
        this.inventorySlots = 5;
        this.inventory = [];
        this.weaponSlots = 2;
        this.weaponInHand = undefined;
    }
    addItem(item){
        if(this.inventory.length < this.inventorySlots){
            if(typeof ammo == "Ammo" && !hasRoomForAmmo(item)){
                console.log("Sorry no room for ammo of this kind.")
                return;
            }
            this.inventory.push(item);
        }else{
            console.log("Sorry Charlie, no room.")
        }
    }
    reload(){
        let ammo = this.findCompatibleAmmo();
        if (ammo == undefined){
            return;
        }
        this.weaponInHand.ammo += ammo.unitQuantity;
        this.inventory.remove(ammo);
    }
    findCompatibleAmmo(){
        // Look for ammo that works with your weapon in hand and return first match and return undefined if not found.

    }
}

