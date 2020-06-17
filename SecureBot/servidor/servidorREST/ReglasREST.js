// .....................................................................
// ReglasREST.js
// .....................................................................

const path = require('path')
const fs = require('fs')

module.exports.cargar = function(servidorExpress, laLogica) {
  // .......................................................
  // GET /iniciarSesion
  // .......................................................
  servidorExpress.post('/iniciarSesion',
    async function(peticion, respuesta) {

      console.log("POST /iniciarSesion")

      var datos = JSON.parse(peticion.body)

      console.log(datos);

      var res = await laLogica.iniciarSesion(datos);

      console.log("Iniciar sesion: " + res);

      respuesta.send({
        laRespuesta: res
      })

    }) // get /iniciarSesion

  servidorExpress.get('/listaDeGrabaciones',
    async function(peticion, respuesta) {

      console.log("GET /listaDeGrabaciones")

      var grabaciones = fs.readdirSync('../grabaciones');

      respuesta.send({
        laRespuesta: grabaciones
      })

    }) // get /listaDeGrabaciones


  //-----------------------------------------------------------------------------
  // GET /ux/mapas/<mapa>
  //-----------------------------------------------------------------------------
  servidorExpress.get('/grabaciones/:grab', function(peticion, respuesta) {
    console.log(" servint grabació: " + peticion.params.grab)

    var elPath = path.join(__dirname, '..', 'grabaciones');
    respuesta.sendFile(elPath + "/" + peticion.params.grab);
  });

} // cargar()

// .....................................................................
// .....................................................................
