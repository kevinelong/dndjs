/***
 * CLASSES AND OOP(OBJECT ORIENTED PROGRAMMING)
 * Classes provide a way of organizing your data and code and avoiding repeating yourself.
 * A class is a blueprint for an object instance.
 * Like a blueprint or a food recipe it contains the instructions for creating something.
 * The entry point for creating a new instance is called the constructor function.
 * Inside the classes code we refer to a specific instance of the class with the keyword "this".
 * Using the "this" keyword we can set properties on an object instance based on parameters passed into the constructor.
 * Properties are what we call variable defined inside of a class.
 * Methods are what we call functions defined inside a class.
 */

//BASE CLASS
class Animal{
    constructor(kind, sound="grrrrr") {
        this.kind = kind;
        this.sound = sound;
    }
    speak(){
        console.log(`Hello I am a ${this.kind} and I go ${this.sound}.`)
    }
}

//CHILD CLASS
class Pet extends Animal{
    constructor(kind, name, sound="whine") {
        super(kind, sound);
        this.name = name;
    }
    //Overrides superclass so as to add name.
    speak(){
        console.log(`Hello I am a ${this.kind} and my name is ${this.name} and I go ${this.sound}.`)
    }
}

//FINAL CLASS
class Dog extends Pet{
    constructor(name) {
        super("dog", name, "woof");
    }
}

//FINAL CLASS
class Cat extends Pet{
    constructor(name) {
        super("cat", name, "meow");
    }
}

let toby = new Dog("Toby");
let cat = new Cat("Bianca");
let cat2 = new Cat("Finley");

let zoo = [toby, cat, cat2];

for (let item of zoo){
    item.speak()
}
