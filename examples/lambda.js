function transform(inputData){
    let outputData = inputData.toUpperCase();
    return outputData;
}

const transform2 = (i) => { return i.toUpperCase() }

console.log(transform("abc"));
console.log(transform2("xyz"));

console.log( ((i)=>{return i * 2})(123))

console.log([1,2,3].map(x => x * 2));
