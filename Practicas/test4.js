//Arrow functions
const square2 = x => x * x;


console.log(minus(5));
console.log(power2(5,5));

function minus(a, b=5) {
  if (b === undefined) return -a;
  else return a - b;
}

function power(base, exponent){
  let result = 1;
  for (let count = 0; count < exponent; count++) {
    result *= base;
  }
  return result;
};

function power2(base, exponent = 2) {
  let result = 1;
  for (let count = 0; count < exponent; count++) {
    result *= base;
  }
  return result;
}