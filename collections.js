


let fruit = ['apple', 'orange', 'pear']; //create an array of three 'strings'
console.log(fruit[0]);

let person = {name:'mattise',age:33}; //create an object with two keys and two values [green = values pink = keys.)
console.log(person.age);
console.log(person['age']);

people = [
    {name:'mattise',age:33},{name:'Kevin',age:53}
]
console.log(people[1]['age']);
let p = people[1];
console.log(`${p.name} ${p.age}`); // String Templates (new feature)
console.log(p.name + " " + p.age); //concatenation (*) + " " + (*)
console.log(p.name, p.age);