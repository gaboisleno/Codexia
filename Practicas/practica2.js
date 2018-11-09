
async function titulo(pagina){
    const axios = require('axios');
    const pag = await axios.get(pagina);
    const json = pag.data;
    //return (pag.data.match("<title>(.*?)</title>")[1]);
    console.log(json.title);

} 

const t = titulo('https://jsonplaceholder.typicode.com/todos/1');





/*
t.then((response) =>{
    console.log(response);
}); 

console.log(t); 

let number = 24;*/




