

let arr = ["A", "B", "C"];

console.log("Rango: " + range(1,10,));
console.log("RangoReverse: " + range(1,10,-1));
console.log("RangoSum: " + sum(range(1,100)));
console.log(arr);
console.log("ReverseArray: " );
console.log(reverseArray(arr));


function range (start, end, reverse){
	let rango = [];

	if (reverse==-1)
	{
		for (let i = end; i >= start; i--){
			rango.push(i);
		}			
	}
	else
	{
		for (let i = start; i <= end; i++){
			rango.push(i);
		}
	}

	return rango;
}

function sum (arreglo){

	let total=0;
	for (let i = 0; i < arreglo.length; i++){
		total+=arreglo[i];
	}
	return total;
}

function reverseArray(arreglo){
	let tmp0;
	let tmp1;
	let tmp2=arreglo.length - 1;
	let devolver = [];

	for (let i=0; i<(arreglo.length/2); i++){
		tmp1		  = arreglo[i];
		devolver[i]	  = arreglo[tmp2];
		devolver[tmp2] = tmp1;
		tmp2--;
	}

	return devolver;

}