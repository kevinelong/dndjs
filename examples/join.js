
const data = ["apple", "orange", "pear"];

function fakeJSON(data){
    return "[" + data.map(i => `"${i}"`).join(",") + "]";
}

console.log(fakeJSON(data));

console.log("Long, Kevin".split("").reverse().join(""))
console.log("Long, Kevin".split(", ").reverse().join(", "))
