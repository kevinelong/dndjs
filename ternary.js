/***
 * TERNARY (Three-way) OPERATOR
 * Boolean Expression ? Value if True : Value if False
 */
let age = 33;
let status = age >= 21 ? "GOOD" : "BAD";
console.log(status);

//WITHOUT THE TERNARY IT WOULD BE ONE OF THESE TWO
let status2 = "BAD";
if ( age >= 21){
    status2 = "GOOD";
}
//REALLY LONG WAY but more efficient
let status3 = undefined;
if ( age >= 21){
    status3 = "GOOD";
}else{
    status3 = "BAD";
}


