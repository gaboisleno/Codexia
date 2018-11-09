let listOfNumbers = [2, 3, 5, 7, 11];
//console.log(listOfNumbers[2]);

console.log(listOfNumbers.length);

listOfNumbers.push(7);

console.log(listOfNumbers.length);

let doh = "doh";
console.log(doh.toUpperCase());


let anObject = {left: 1, right: 2};
console.log(anObject.right);

Object.assign(anObject,{up:3, down:4});
console.log(anObject.up);


//JSon
let string = JSON.stringify({squirrel: false, events: ["weekend"]});
console.log(string);

console.log(JSON.parse(string).events);

