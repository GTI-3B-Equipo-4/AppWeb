// .....................................................................
// ReglasREST.js
// .....................................................................

const path = require('path')

module.exports.cargar = function( servidorExpress, laLogica ) {
// .......................................................
// GET /iniciarSesion
// .......................................................
servidorExpress.post('/iniciarSesion',
   async function( peticion, respuesta ){

    console.log( "POST /iniciarSesion" )
  
    var datos = JSON.parse(peticion.body)

    console.log(datos);
    
    var res = await laLogica.iniciarSesion(datos);

    console.log("Iniciar sesion: " + res);

    respuesta.send({laRespuesta: res})

}) // get /iniciarSesion


servidorExpress.get('/prueba',
    function( peticion, respuesta ){

    console.log("Funciona correctamente");
    

}) // get /iniciarSesion

} // cargar()

// .....................................................................
// .....................................................................
