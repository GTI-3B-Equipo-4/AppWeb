// .....................................................................
// ReglasREST.js
// .....................................................................

const path = require('path')

module.exports.cargar = function( servidorExpress, laLogica ) {
// .......................................................
// GET /iniciarSesion
// .......................................................
servidorExpress.get('/iniciarSesion',
   async function( peticion, respuesta ){

    console.log( "GET /iniciarSesion" )

    console.log(peticion.body);
  
    var datos = JSON.parse(peticion.body)

    var res = await laLogica.iniciarSesion(datos);

    respuesta.send({laRespuesta: res})

}) // get /iniciarSesion


servidorExpress.get(':archivo', function( peticion, respuesta ){
    console.log( " servint html normal: " + peticion.params.archivo )

    var elPath = path.join(__dirname, '..', '..', 'public');
    respuesta.sendFile( elPath + "/" +  peticion.params.archivo);
});

} // cargar()

// .....................................................................
// .....................................................................
