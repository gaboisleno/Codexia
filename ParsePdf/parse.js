let fs = require('fs');
PDFParser = require("pdf2json");

let pdfParser = new PDFParser();
pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
pdfParser.on("pdfParser_dataReady", pdfData => {

    const string = (JSON.stringify(pdfData));
    const json   = JSON.parse(string);

    debugger;
    
    var objList      = [];
    var vehiculo     = [];
    var textPage     = 0;                                   //Total de textos en la pagina, para limitar el for 
    var bandera      = false;                               //Bandera para saber si la palabra esta dividida en dos renglones
    var tmpStr       = '';                                  //String temporal para almacenar palabras divididas en dos renglones
    var anio         = '';                                  //Almacena el campo anio
    var bordeY       = 3.5;
    var bordeX       = 13;
    var prices       = {};

    //Bucle por cada pagina
    for (let pag=0; pag < json.formImage.Pages.length; pag++){
        textPage = json.formImage.Pages[pag].Texts.length;
    
        //Bucle por cada objeto
        for (let i=0; i < textPage; i++){  
    
            //Bucle por cada elemento dentro del objeto
            for(let x=0; x < json.formImage.Pages[pag].Texts[i].R.length; x++){
                
                const element = json.formImage.Pages[pag].Texts[i].R[x];
    
                //Por cada elemento texto que comienza con I/N
                if (element.T == 'I' || element.T == 'N' || element.T.startsWith("P%C3%A1gina")){
    
                    //Si la informacion no esta vacia, inserto el vehiculo
                    if (vehiculo.length != 0) {             
                        
                        let autoInfo = {
                            in:         vehiculo[0],
                            mtm:        vehiculo[1],
                            t:          vehiculo[2],
                            fab:        vehiculo[3],
                            marca:      vehiculo[4],
                            tipo:       vehiculo[5],
                            mod:        vehiculo[6],
                            desmarca:   vehiculo[7],
                            descmodelo: vehiculo[8],
                            desctipo:   vehiculo[9]
                        };
                        Object.assign(autoInfo, prices);
                        objList.push(autoInfo);
                    }
                    //Si es el final de pag
                    if (element.T.startsWith("P%C3%A1gina")){   
                        break;
                    }
                    //Se resetea la informacion del auto
                    vehiculo = [];                              
                    prices = {};
                    vehiculo.push(element.T);
                    continue;
                }
                //Palabras cortadas en dos renglones
                else if(element.T.endsWith('%20')){             
                    bandera = true;
                    tmpStr  = '';
                    tmpStr  = (element.T);
                    continue;
                }
                //Si el texto no es I/N, se inserta informacion del auto al []
                else{
                    if (bandera){                               
                        vehiculo.push(cleanWord(tmpStr+element.T));
                        tmpStr ='';
                        bandera = false;
                        continue;
                    }
                    //Comprobar si x > 13, comienzan los precios
                    else {                                      
                        if ((json.formImage.Pages[pag].Texts[i].x) > bordeX && (json.formImage.Pages[pag].Texts[i].y) > bordeY){
                            anio = getYear(json.formImage.Pages[pag].Texts[i].x);
                            prices[anio] = element.T;
                            continue;    
                        }                                       
                        //Comprobar si el campo Fab esta vacio
                        if (vehiculo[3]==null && json.formImage.Pages[pag].Texts[i].x > 3.899 && json.formImage.Pages[pag].Texts[i].y > bordeY){
                            vehiculo.push('');
                        }
                        //Comprobar que el texto no sea el nombre de los campos
                        if ((json.formImage.Pages[pag].Texts[i].y) > bordeY){ 
                            vehiculo.push(cleanWord(element.T));
                        }
                    }
                }
            }
        }
    }

    console.log(objList);
    //console.log(objList.length);
    //console.log('Autos en esta pagina: '+(listVehiculo.length-1));
    

});


/*
 __  __       _       
|  \/  |     (_)      
| \  / | __ _ _ _ __  
| |\/| |/ _` | | '_ \ 
| |  | | (_| | | | | |
|_|  |_|\__,_|_|_| |_|*/


pdfParser.loadPDF("./real.pdf");







function cleanWord(palabra){
    return ((palabra.replace(/%20/gi, ' ')).replace(/%2F/gi,'/'));
}

function getYear(x){

    if (x > 14.000 && x < 14.999){
        return '0KM';
    }
    else if (x > 16.000 && x < 16.999){
        return '2017';
    }
    else if (x > 17.000 && x < 17.999){
        return '2016';
    }
    else if (x > 18.000 && x < 18.999){
        return '2015';
    } 
    else if (x > 19.000 && x < 19.999){
        return '2014';
    }
    else if (x > 21.000 && x < 21.999){
        return '2013';
    }
    else if (x > 22.000 && x < 22.999){
        return '2012';
    }
    else if (x > 23.000 && x < 23.999){
        return '2011';
    }
    else if (x > 25.000 && x < 25.999){
        return '2010';
    }
    else if (x > 26.000 && x < 26.999){
        return '2009';
    }
    else if (x > 27.000 && x < 27.999){
        return '2008';
    }
    else if (x > 29.000 && x < 29.999){
        return '2007';
    }
    else if (x > 30.000 && x < 30.999){
        return '2006';
    }
    else if (x > 32.000 && x < 32.999){
        return '2005';
    }
    else if (x > 33.000 && x < 33.999){
        return '2004';
    }
    else if (x > 34.000 && x < 34.999){
        return '2003';
    }
    else if (x > 36.000 && x < 36.999){
        return '2002';
    }
    else if (x > 37.000 && x < 37.999){
        return '2001';
    }
    else if (x > 38.000 && x < 39.500){
        return '2000';
    }
    else if (x > 40.000 && x < 40.999){
        return '1999';
    }
    else if (x > 41.000 && x < 41.999){
        return '1998';
    }
    else if (x > 42.000 && x < 42.999){
        return '1997';
    }
    else if (x > 44.000 && x < 44.999){
        return '1996';
    }
    else if (x > 45.000 && x < 45.999){
        return '1995';
    }
}

//Fab 3.875
/*-=TABLA DE ANIOS=-*/
/*
X = 14.736 (0km)
X = 16.101 (2017)
    16.251
X = 17.468 (2016)
X = 17.618 (2016)
X = 18.788 (2015)
X = 19.958 (2014)
X = 21.278 (2013)
X = 22.598 (2012)
X = 23.918 (2011)
X = 23.918
X = 25.238 (2010)
X = 25.238
X = 26.604 (2009)
X = 27.969 (2008)
X = 29.334 (2007)
X = 29.334
X = 30.699 (2006)
X = 32.064 (2005)
X = 32.064
X = 33.429 (2004)
X = 33.429
X = 34.796 (2003)
X = 36.161 (2002)
X = 37.526 (2001)
X = 38.891 (2000)
X = 40.256 (1999)
X = 41.621 (1998)
X = 42.836 (1997) 
X = 42.686
X = 44.053 (1996)
X = 45.268 (1995) 
*/


// json.formImage.Pages[0].Texts[i].R => objects  del tipo [ { T: 'Vigencia%2001-10-2018', S: -1, TS: [ 0, 7.8, 0, 0 ] } ]
// json.formImage.Pages[0].Texts[i].x  
// json.formImage.Pages[0].Texts[i].y