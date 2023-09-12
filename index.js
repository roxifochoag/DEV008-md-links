const {
  rutaExistente,
  rutaAbsoluta,
  isDirectory,
  filtroMd,
  leerContenido,
  retornarEstadisticas,
  enlacesRotos,
  preguntarAxiosHTTP,
  extraerEnlaces,
  esArchivo,
} = require("./functions.js");

/*-------------------------------
|                                |
|            PROMESA             |
|                                |
/*-------------------------------*/

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    if (rutaExistente(path) === false) {
      reject("No existe la ruta");
    }
    const validacionRutaAbsoluta = rutaAbsoluta(path);
    let arrayArchivos = [];

    if (esArchivo(validacionRutaAbsoluta) === true) {
      arrayArchivos.push(validacionRutaAbsoluta);
    } else {
       // console.log(2,validacionRutaAbsoluta);
      arrayArchivos = isDirectory(validacionRutaAbsoluta);
    }
    let arrayFilesMd = filtroMd(arrayArchivos);

    if (arrayFilesMd.length === 0) reject("No existen archivos .md ");
    let fileString = leerContenido(arrayFilesMd);
    //console.log(1,fileString);
    const enlace = extraerEnlaces(fileString);
    //console.log(1,enlace);
    //console.log(1,options);
    if (options.validate === false && options.stats === false) {
      resolve(enlace);
    }

    if (options.validate === true && options.stats === false) {
        preguntarAxiosHTTP(enlace).then((response) => resolve(response));
    }

    if (options.validate === false && options.stats === true) {
      resolve(retornarEstadisticas(enlace));
    }
    if (options.validate === true && options.stats === true) {
      preguntarAxiosHTTP(enlace).then((response) =>
        resolve(enlacesRotos(response))
      );
    }
  });
};

/*-------------------------------*/
//    Exportar modulos
/*-------------------------------*/
module.exports = { mdLinks };
