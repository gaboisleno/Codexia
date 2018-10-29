
async function getJson(url){
    const axios = require('axios');
    const pag = await (axios.get(url)) ;
    return pag.data;
}

async function getUsrID(email){
    const jsonUsrs = await getJson('https://jsonplaceholder.typicode.com/users');
       const jsonFiltrado = jsonUsrs.find(jsonUsrs => jsonUsrs.email==email);
       return jsonFiltrado.id;
}

async function getCompleted(usrID){
    const jsonTodos = await getJson('https://jsonplaceholder.typicode.com/todos');

        const jsonFiltrado   = jsonTodos.filter(jsonTodos => jsonTodos.userId==usrID && jsonTodos.completed==true);
        return (jsonFiltrado.length);
}

/****************************************************/

async function main (){

let user = "Sincere@april.biz";
let idUser = await getUsrID(user);
let totalCompleted = await getCompleted(idUser);

console.log('El usuario: '+user+' (ID: '+idUser+') tiene '+totalCompleted+' TODOs completados.');

/*
    let user = "Sincere@april.biz"; 
    getUsrID(user).then(v=>{
       getCompleted(v).then(x=>{
           console.log('El usuario: '+user+' (ID: '+v+') tiene '+x+' TODOs completados.');
       });
    });
*/   
}

main();
