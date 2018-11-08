const axios = require('axios');

//Devuelve el jon de una direccion url
async function getJson(url){
    const pag   = await (axios.get(url)) ;
    return pag.data;
};

//Devuelve el ID de un usuario
async function getUsrID(email){
    const jsonUsrs     = await getJson('https://jsonplaceholder.typicode.com/users');
    const jsonFiltrado = jsonUsrs.find(jsonUsrs => jsonUsrs.email==email);
    return jsonFiltrado.id;
};

//Devuelve los almbumes de un usuario
async function getAlbumsUser(userID){
    const jsonAlbums    = await getJson('https://jsonplaceholder.typicode.com/albums');
    const jsonFiltrado = jsonAlbums.filter(jsonAlbums => jsonAlbums.userId==userID);
    return (jsonFiltrado);
};

//Dado un ID de album, devuelve ese album
async function getAlbum(albumId){
    const jsonPhotos   = await getJson('https://jsonplaceholder.typicode.com/photos');
    const jsonAlbum = jsonPhotos.filter(jsonPhotos => jsonPhotos.albumId == albumId);
    return (jsonAlbum);
};

//Crea una nueva carpeta
async function newFolder(nombre){
    const Promise = require('bluebird');
    const fs      = require('fs');
    const dir     = './'+nombre;

    const mkFolder = Promise.promisify(fs.mkdir); 
    
    if (fs.existsSync(dir)) {
        return false;
    } else {
        fldr = await mkFolder(dir);
        return true;
    }
};

//Dada una url descarga la imagen
async function dwnImage(url, imgName, folder){
    const fs      = require('fs');
    const axios   = require('axios');
    const Promise = require('bluebird');

    const img     = await axios.get(url, {
        responseType: 'arraybuffer'
    });
    const saveimg = Promise.promisify(fs.writeFile);

    await saveimg('./' + folder+'/'+imgName+'.png', img.data);
};

//Descarga todos los albums de fotos de un usuario
async function createRandomAlbum(userID){
    let albumes   = await getAlbumsUser(userID);
    let idAlbumes = albumes.map(element => element.id);
    
    //Elegir un album aleatorio
    let rnd = idAlbumes[Math.floor(Math.random()*idAlbumes.length)];
    console.log('Descargando album '+rnd+'...');

    //Descargar el album aleatorio
    let album = await getAlbum(rnd);

    //Crea una carpeta para guardar las fotos (si no existe)
    let folderName = 'album_'+rnd;

    if (await newFolder(folderName)){
        album.forEach(async (foto)=>{
            await dwnImage(foto.url, foto.id, folderName);
        });  
    
        console.log('Descarga completa.');    
    }
    else console.log('El album ya existe.');
    
    
};


/****************************************************/

async function main (){
    let user            = "Sincere@april.biz";
    let idUser          = await getUsrID(user);
    await createRandomAlbum(idUser); 
    
};

main();
