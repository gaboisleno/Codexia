class Calculator {
	constructor() {
		this.power = 2;
	}
	square(x) {
		return x ** this.power;
	}
}

let mycalc = new Calculator();
console.log(mycalc.square(2));