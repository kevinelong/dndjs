/***
 * INTRODUCTION TO PROGRAMMING,
 * WITH MODERN JAVASCRIPT.
 * (ES6/ESM)
 */


/***
 COMMENTS
 */

/* This text is and example of a multi-line comment.
Note how the slash-star begins the multi-line comment,
and the opposite star-slash ends the comment.

Comments are ignored and not executed. */

// The two slashes that precede this text tells javascript that everything that follow the slashes on the same line is a comment.

/***
 STATEMENTS
 Statements are generally a single line. The most common kind of statement is a variable declaration.
 Most statements end with a semi-colon. A semi-colon looks like a period stacked on top of a comma.
 */
let age = 21; // this assigns the value 21 to the age variable

/***
 VARIABLES
 A variable is a name that refers to a value. Like a label on a jar its separate from the value itself.
 */
let person = "JOHN";

/***
 CONSTANTS
 A constant is a kind of variable that once declared does not change. We call the immutable.
 */
const SALES_TAX = 0.08;

/***
 DATA TYPES

 A data-type describes a kind of value. We have already seen the three most common data types.

 Integer - A whole number.
 String - A series of letters that form a block of text.
 Float - A floating point decimal number that represents a fraction. e.g. 0.5 is half of 1.0

 In traditional JavaScript data-types are implied vy the value we assign to the variable.
 Today using TypeScript we may specify the data-type explicitly.
 */

let score:Number = 0;

/***
 COLLECTIONS

 Collections are an advanced kind of data-type that can contain multiple variables.
*/

/***
 ARRAYS (Ordered Lists)
 Arrays are the most common kind of collection.
 Arrays are an ordered list of variables.
 Array contents can be accessed by using [n] (square brackets and a numeric index).
 The first element in an array is at index zero. The last item is one less than the number of items in the list.
 */
let fruit:(string)[] = [ "Apple", "Orange", "Pear"];

/***
 OBJECTS (Dictionary-like sets of key-value pairs)
 Objects allow us to store an retrieve values and access them using another value called a key.
 Items in an Object are not in any specific order.
 Items in an Object can added during object creation.
 Items in an object can be accessed using the [] (Square Bracket Notation) similar to an Array.
 */
let pet = {breed:"Black Lab", name:"Toby"};
pet.name = "Molly";
pet["breed"] = "Golden";
//pet["color"] = "Black"; Not valid in TypeScript only vanilla JS

console.log(pet.name);
console.log(pet["breed"]);
console.log(pet);

