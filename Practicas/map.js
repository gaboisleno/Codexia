async function getPost(url){
    const axios = require('axios');
    const pag = await (axios.get(url)) ;
    const json = pag.data;
    return json;
}
function totalPosts (json,usr){
    const jsonFiltrado = (json.filter(json => json.userId==usr));
    const jsonMapeado = jsonFiltrado.map( jsonElem => {return jsonElem.id });

    console.log('Los post del usuario '+usr+' son: '+jsonMapeado);
}; 


/************************************************************************************************* */

//Main

async function main() {
    const usr=8;

    //getPost();
    const json = getPost('https://jsonplaceholder.typicode.com/posts');
    
    //Filter Post
    json.then((response)=>{
        (totalPosts(response,usr));
    });
}


main();







