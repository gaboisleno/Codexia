
//Devuelve el jon de una direccion url
async function getJson(url){
    const axios = require('axios');
    const pag   = await (axios.get(url)) ;
    return pag.data;
};

//Devuelve el ID de un usuario
async function getUsrID(email){
    const jsonUsrs     = await getJson('https://jsonplaceholder.typicode.com/users');
    const jsonFiltrado = jsonUsrs.find(jsonUsrs => jsonUsrs.email==email);
    return jsonFiltrado.id;
};

//Devuelve todos los almbumes de un usuario
async function getAlbumsUser(userID){
    const jsonAlbums    = await getJson('https://jsonplaceholder.typicode.com/albums');
    const jsonFiltrado = jsonAlbums.filter(jsonAlbums => jsonAlbums.userId==userID);
    return (jsonFiltrado);
};

//Dado un id de album, devuelve ese album
async function getAlbum(albumId){
    const jsonPhotos   = await getJson('https://jsonplaceholder.typicode.com/photos');
    const jsonAlbum = jsonPhotos.filter(jsonPhotos => jsonPhotos.albumId==albumId);
    return (jsonAlbum);
};

//Crea una nueva carpeta
async function newFolder(nombre){
    const Promise = require('bluebird');
    const fs      = require('fs');
    const dir     = './'+nombre;

    const mkFolder = Promise.promisify(fs.mkdirSync); 
    fldr = await mkFolder(dir);
};

//Dada una url descarga la imagen
async function dwnImage(url, imgName, folder){
    const fs      = require('fs');
    const axios   = require('axios');
    const Promise = require('bluebird');

    const img     = await (axios.get(url));
    const saveimg = Promise.promisify(fs.writeFile);

    const conten  = await saveimg(folder+'/'+imgName+'.png', img.data, function(err) {
        if(err) {return console.log(err)};
        });
};

async function createAlbums(userID){
    let albumes   = await getAlbumsUser(userID);
    let idAlbumes = albumes.map(element => {return element.id});
    console.log(idAlbumes);

    //Por cada AlbumId
    idAlbumes.forEach(async (item)=>{
        console.log(item);
        
        //Descargar el album
        let album = await getAlbum(idAlbumes[item]);
        console.log(album);

        //Crear una carpeta
        await newFolder(item);

        //Descargar cada foto del album
        album.forEach(async (foto)=>{
            await dwnImage(foto.url, foto.id, item);
        });
     
    });
};


/****************************************************/

async function main (){
    let user            = "Sincere@april.biz";
    let idUser          = await getUsrID(user);
    createAlbums(idUser); 
};

main();
