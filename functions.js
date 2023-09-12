const fs    = require('fs');
const path  = require ('path');
const axios = require('axios');

/*---------------------------------------------*/
//    Validación de la ruta                     //
/*---------------------------------------------*/
function rutaExistente(route){
    return fs.existsSync(route);
}

/*---------------------------------------------*/
//    Transformar de la ruta en absoluta        //
/*---------------------------------------------*/
function rutaAbsoluta(route){
  if(path.isAbsolute(route)){
    return route;
  }else {
    return path.resolve(route);
  }
}

function esArchivo(route){
const stats =fs.statSync(route);
if(stats.isFile()){
return true;
} else {
  return false;
}
}




/*---------------------------------------*/
// Validar si la ruta es un directorio   //
/*--------------------------------------*/
function isDirectory(route) {
    let array = [];
 function exploreDirectory(exploreRoute) {
    const files = fs.readdirSync(exploreRoute,'utf-8');
      files.forEach((file)=>{
        const nuevaRuta = path.join(exploreRoute,file);
        const nuevoEstado =fs.statSync(nuevaRuta);
        if(nuevoEstado.isFile()){
          array.push(nuevaRuta);
        } else {
          exploreDirectory(nuevaRuta);
        }
      });
    }
      exploreDirectory(route);
      return array;
}

function filtroMd(arrayFiles){
  return arrayFiles.filter(file => path.extname(file)==='.md');
}

/*-------------------------------------*/
//      Leer el contenido de la ruta   //
/*------------------------------------*/
function leerContenido(arrayFiles) {
 const contenidoArreglo =[];
 arrayFiles.forEach((pathFile) =>{
  const contenido =fs.readFileSync(pathFile,'utf-8');
  contenidoArreglo.push({filePath:pathFile, content:contenido});
 });
 return contenidoArreglo;
}
/*---------------------------------------*/
// Leer los links del documento          //
/*---------------------------------------*/
function extraerEnlaces(arr) {
   const enlacesArreglo = [];
   const rgx = /\[([^\]]+)\]\(([^)]+)\)/g;
    arr.forEach((file) =>{
      const igualEnlaces = file.content.match(rgx);
      if(igualEnlaces){
         igualEnlaces.forEach((emparejarEnlace) =>{
           const objeto = emparejarEnlace.match(/\[([^\]]+)\]\(([^)]+)\)/);
           const texto  = objeto[1];
           const enlace = objeto[2];
           enlacesArreglo.push({
            file : file.filePath,
            href: enlace,
            text: texto,
           })
         })
      }
    });
    return enlacesArreglo;
  }

/*---------------------------------------------*/
//  axios para retornar el status y el mensaje
/*---------------------------------------------*/

function preguntarAxiosHTTP(linksArrays) {
const promesasArreglo = linksArrays.map((item) =>{
  return axios
  .get(item.href)
  .then((response)=>{
    item.status = response.status
    item.mensaje = response.statusText
    return item
  })
  .catch((err) =>{
    if(err.response){
      item.status =err.response.status
      item.mensaje=err.response.statusText
    }else{
      item.status = 404
      item.mensaje='No encontrado'
    }
    return item
  })
})
return Promise.all(promesasArreglo);
}

/*---------------------------------------*/
//        Retornar estadísticas          //
/*---------------------------------------*/
function retornarEstadisticas(arrayLinks) {
const setEnlaces = new Set();
arrayLinks.forEach(item => setEnlaces.add(item.href));
return {
  total: arrayLinks.length,
  unique: setEnlaces.size
};
}

/*-------------------------------------------------*/
//    incluir a las estadisticas los enlaces rotos
/*-------------------------------------------------*/
function enlacesRotos(arrayLinks) {
  const setEnlaces = new Set();
  arrayLinks.forEach(item => setEnlaces.add(item.href));
 const enlaceQuebrado = arrayLinks.filter(item => item.status === 404);
 return {
    total: arrayLinks.length,
    unique: setEnlaces.size,
    broken: enlaceQuebrado.length
 };
}

/*-------------------------------*/
//    Exportar modulos
/*-------------------------------*/

  module.exports = {rutaExistente, rutaAbsoluta, isDirectory, leerContenido,retornarEstadisticas,enlacesRotos,preguntarAxiosHTTP,extraerEnlaces,esArchivo,filtroMd };
