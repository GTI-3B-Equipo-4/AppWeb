// ........................................................
// mainTest1.js
// ........................................................
var request = require ('request')
var assert = require ('assert')
// ........................................................
// ........................................................
const IP_PUERTO="http://localhost:8080"
// ........................................................
// main ()
// ........................................................
describe( "Test 1 : Iniciar Sesión", function() {
// ....................................................
// ....................................................
it( "POST /iniciarSesión da true", function( hecho ) {

  var datos = {
    usuario: "Emilio",
    password: "lul"
  }
  request.post(
    { url : IP_PUERTO+"/iniciarSesion",
    headers : { 'User-Agent' : 'jordi', 'Content-Type' : 'application/json' },
    body : JSON.stringify( datos )
  },
  function( err, respuesta, carga ) {

    hecho()
  } // callback
  ) // .post

}) // it

it( "POST /iniciarSesión da false", function( hecho ) {

  var datos = {
    usuario: "Emilio",
    password: "1234"
  }
  request.post(
    { url : IP_PUERTO+"/iniciarSesion",
    headers : { 'User-Agent' : 'jordi', 'Content-Type' : 'application/json' },
    body : JSON.stringify( datos )
  },
  function( err, respuesta, carga ) {
    hecho()
  } // callback
  ) // .post

}) // it


}) // describe
