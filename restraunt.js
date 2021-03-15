/***
 Buisness that makes and serves food and drink?
 Yes!
 Makes for for  guests/customers at a table?
 Yes!
 Do people work at a restraunt?
 Yes: Server, cook, manager, owner.
 customers sit at a seat
 tables have a number of seats.
 Empoyee has a personal pin.
 map that shows all tables.
 server can only select table in their OWN section, but able to see ALL tables and covers.
 cover has items, menu has category, categories have menu items.
 Items have one or more categories.
 Items have price, name, 0 or more ingredient.
 Cover item = quantity and item, extended price 1 * __ =.
 Every cover gets a total price, and itemized receipt.
 The cover starts empty unless items are added.
 */
class Menu {
    constructor() {
        this.catagoryList = [];
    }
}

class Category {
    constructor() {
        this.itemList = [];
    }
}

class Item {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}

class CoverItem {
    constructor(item, quantity = 1) {
        this.menu_item = item;
        this.quantity = quantity;
    }

    extendedPrice() {
        return this.quantity * this.menu_item.price;
    }
}

class Cover {
    constructor(table, server) {
        this.orderNumber = Math.floor(Math.random() * 10000);
        this.table = table;
        this.server = server;
        this.time = new Date();
        this.itemList = [];
    }

    print() {
        let total = 0;
        console.log("SERVER: " + this.server);
        console.log("TIME: " + this.time.toLocaleString("en"));
        console.log("TABLE: " + this.table);
        console.log("ORDER NUMBER: " + this.orderNumber);

        console.log("");
        console.log("ITEM(s): ");
        for (let item of this.itemList) {
            total += item.quantity * item.menu_item.price;
            console.log("\t" + item.quantity, item.menu_item.name, toCurrency(item.extendedPrice()));

        }
        console.log("GRAND TOTAL: " + toCurrency(total));
        console.log("THANK YOU !!!<^>(*:*)<^>!!! ");
    }
}

function toCurrency(pennies) {
    let dollars = pennies / 100;
    let text = "$" + dollars.toFixed(2);
    return text;
}

let item = new Item("soda", 100);
let item2 = new Item("fries", 150);
let cover = new Cover("101", "Mattise");
let coverItem = new CoverItem(item, 4);
let coverItem2 = new CoverItem(item2, 7);
cover.itemList.push(coverItem);
cover.itemList.push(coverItem2);
cover.print();

