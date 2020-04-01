// ........................................................
// mainTest1.js
// ........................................................

const Logica = require( "../Logica.js" )
var assert = require ('assert')

// ........................................................
// main ()
// ........................................................

describe( "Test 1: insertar una persona", function() {
// ....................................................
// ....................................................
  var laLogica = null
// ....................................................
// ....................................................
  it( "conectar a la base de datos", function( hecho ) {
    laLogica = new Logica(
      "../bd/datos.bd",
      function( err ) {
        if ( err ) {
          throw new Error ("No he podido conectar con datos.db")
        }
        hecho()
      })
    }) // it
// ....................................................
// ....................................................
  it( "borrar todas las filas", async function() {
    await laLogica.borrarFilasDeTodasLasTablas()
  }) // it
// ....................................................
// ....................................................
  it( "puedo insertar una persona",
  async function() {
    await laLogica.darDeAltaUsuario({usuario: "Emilio", password:"lul"});
  }) // it
// ....................................................
// ....................................................
  it( "puedo iniciar sesion",
  async function() {
    var res = await laLogica.iniciarSesion({usuario: "Emilio", password: "lul"});
    console.log("puedo iniciar sesion: " + res);
  }) // it
// ....................................................
// ....................................................
it( "no puedo iniciar sesion",
async function() {
  var res = await laLogica.iniciarSesion({usuario: "Emilio", password: "1234"});
  console.log("puedo iniciar sesion:" + res);
}) // it
// ....................................................
// ....................................................
  it( "cerrar conexión a la base de datos",
  async function() {
    try {
      await laLogica.cerrar()
    } catch( err ) {
      // assert.equal( 0, 1, "cerrar conexión a BD fallada: " + err)
      throw new Error( "cerrar conexión a BD fallada: " + err)
    }
  }) // it
}) // describe
