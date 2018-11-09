function termine() {
    console.log('termine');
    setTimeout(termine2, 2000);
}

function termine2() {
    console.log('termine 2');
}

console.log('esperando 1 segundo...');
setTimeout(termine, 1000);