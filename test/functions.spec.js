const mdLinks = require('../index.cjs');
const path = require ('path');
const fs = require('fs');
const axis = require('axios');

const {rutaExistente, rutaAbsoluta, rutaDirectorio, leerContenido,retornarEstadisticas,enlacesRotos,preguntarAxiosHTTP,extraerEnlaces }= require('../functions.cjs');


/*---------------------------------------------*/
//    TESTING RUTA EXISTENTE                   //
/*---------------------------------------------*/
describe('Probar la existencia de la ruta',()=>{
  it('Validar la funcion', ()=>{
    expect(typeof rutaExistente).toBe('function');
  });
});

/*---------------------------------------------*/
//    TESTING RUTA EXISTENTA                    //
/*---------------------------------------------*/
describe('Probar que la ruta sea absoluta',()=>{
  it('Validar la funcion', ()=>{
    expect(typeof rutaAbsoluta).toBe('function');
  });
});
/*---------------------------------------------*/
//    TESTING RUTA DIRECTORIO                   //
/*---------------------------------------------*/
describe('Probar que tenga contenido en el directorio',()=>{
  it('Validar la funcion', ()=>{
    expect(typeof rutaDirectorio).toBe('function');
  });
});
/*---------------------------------------------*/
//    TESTING lEER EL CONTENIDO               //
/*---------------------------------------------*/
describe('Probar que se pueda leer el contenido',()=>{
  it('Validar la funcion', ()=>{
    expect(typeof leerContenido).toBe('function');
  });
});
/*---------------------------------------------*/
//    TESTING EXTRAER EL ENLACES               //
/*---------------------------------------------*/
describe('Probar que se pueda extraer enlaces',()=>{
  it('Validar la funcion', ()=>{
    expect(typeof extraerEnlaces).toBe('function');
  });
});

/*---------------------------------------------*/
//    TESTING PREGUNTAR AXIOS HTTP              //
/*---------------------------------------------*/
describe('Probar que se pueda leer el contenido',()=>{
  it('Validar la funcion', ()=>{
    expect(typeof preguntarAxiosHTTP).toBe('function');
  });
});

/*---------------------------------------------*/
//    TESTING ESTADÍSTICAS DE ENLACES          //
/*---------------------------------------------*/
describe('Probar que se pueda retornar las estadísticas',()=>{
  it('Validar la funcion', ()=>{
    expect(typeof retornarEstadisticas).toBe('function');
  });
});
/*---------------------------------------------*/
//    TESTING ESTADÍSTICAS DE ENLACES ROTOS    //
/*---------------------------------------------*/
describe('Probar que se pueda retornar las estadísticas de los enlaces rotos',()=>{
  it('Validar la funcion', ()=>{
    expect(typeof enlacesRotos).toBe('function');
  });
});
