
async function getJson(url){
    const axios = require('axios');
    const pag = await (axios.get(url)) ;
    const json = pag.data;
    return json;
}

async function getUsrID(email){
    const jsonUsrs = await getJson('https://jsonplaceholder.typicode.com/users');

       const jsonFiltrado = jsonUsrs.filter(jsonUsrs => jsonUsrs.email==email);
       //const jsonMapeado  = jsonFiltrado.map( jsonElem => {return jsonElem.id}); //
       return jsonElem[0].id; //
       //return jsonMapeado[0];
}

async function getCompleted(usrID){
    const jsonTodos = await getJson('https://jsonplaceholder.typicode.com/todos');

        const jsonFiltrado   = jsonTodos.filter(jsonTodos => jsonTodos.userId==usrID && jsonTodos.completed==true);
        const totalCompleted = jsonFiltrado.map(jsonElem => {return jsonElem.id });
        return (totalCompleted.length);
}

/****************************************************/

async function main (){

    let user = "Sincere@april.biz"; 
    getUsrID(user).then(v=>{
       getCompleted(v).then(x=>{
           console.log('El usuario: '+user+' (ID: '+v+') tiene '+x+' TODOs completados.');
       });
    });   
}

main();
