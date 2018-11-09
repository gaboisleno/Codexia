async function getPost(url){
    const axios = require('axios');
    const pag = await (axios.get(url)) ;
    const json = pag.data;
    return json;
    /*
    json.forEach(function(element) {
        if (element.userId==usr)
            console.log('IdPost: '+element.id + ' ' + 'TituloPost: '+element.title);
      });
    */
}
function totalPosts (json,usr){
    jsonFiltrado = (json.filter(json => json.userId==usr));
    userPosts = [];

    jsonFiltrado.forEach((element)=>{
        userPosts.push(element.id);
    })
    console.log('Los post del usuario '+usr+' son: '+userPosts);
}; 

/************************************************************************************************* */

//Main

async function main() {

}
const usr=1;

//getPost();
const json = getPost('https://jsonplaceholder.typicode.com/posts');

//Filter Post
json.then((response)=>{
    (totalPosts(response,usr));
});

main()







