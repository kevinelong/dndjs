function add(a, b) {
    return a + b;
}


data = [
    [17, 88],
    [5, 18],
    [7, 9],
]
for (let i = 0; i < data.length; i++) {


    let row = data[i];
    let a = row[0];
    let b = row[1];
    let result = add(a, b);
    console.log(result);
}