people = [
    {
        first: "Mattise",
        last: "Hakala",
        age: 32
    },
    {
        first: "Keason",
        last: "Hess",
        age: 12
    }
]
function render(person, i){
    let number = i + 1;
    let whole_name = person.first + " " + person.last
    console.log(`${number}.) ${whole_name}`)
    if (person.age >= 21) {
        console.log("\tGOOD TO GO!");
    } else {
        console.log("\tGet the F*** OUT!");
    }
}
let how_many = people.length;
for(let i=0; i<how_many; i++){
    let person = people[i];
    render(person, i);
}
