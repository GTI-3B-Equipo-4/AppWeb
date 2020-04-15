// .....................................................................
// Logica.js
// .....................................................................
const sqlite3 = require( "sqlite3" )
// .....................................................................
// .....................................................................


module.exports = class Logica {


// .................................................................
// nombreBD: Texto
// -->
// constructor () -->
// .................................................................
constructor( nombreBD, cb ) {
  this.laConexion = new sqlite3.Database(
    nombreBD,
    ( err ) => {
      if( ! err ) {
        this.laConexion.run( "PRAGMA foreign_keys = ON" )
      }
      cb( err )
    })
} // ()


// .................................................................
// nombreTabla:Texto
// -->
// borrarFilasDe() -->
// .................................................................
borrarFilasDe( tabla ) {
  return new Promise( ( resolver, rechazar ) => {
    this.laConexion.run(
      "delete from " + tabla + ";",
      ( err )=> ( err ? rechazar( err ) : resolver( ) )
    )
  })
} // ()


// .................................................................
// borrarFilasDeTodasLasTablas() -->
// .................................................................
async borrarFilasDeTodasLasTablas() {
  await this.borrarFilasDe( "Usuarios" )
} // ()


// .................................................................
// datos:{usuario:Texto, password:Texto}
// -->
// darDeAltaUsuario() -->
// .................................................................
darDeAltaUsuario( datos ) {
  var textoSQL =
  'insert into Usuarios values( $usuario, $password );'
  var valoresParaSQL = { $usuario: datos.usuario, 
    $password: datos.password }
    return new Promise( ( resolver, rechazar ) => {
      this.laConexion.run( textoSQL, valoresParaSQL, function( err ) {
        ( err ? rechazar( err ) : resolver( ) )
      })
    })
} // ()

//----------------------------------------------------------------------
// datos:JSON{usuario:Texto, password:Texto}
// --> iniciarSesion() -->
// V/F
//----------------------------------------------------------------------
iniciarSesion( datos ){
  var textoSQL = "select * from Usuarios where usuario = $usuario and password = $password";
  var valoresParaSQL = { $usuario: datos.usuario, $password: datos.password }
  return new Promise( ( resolver, rechazar ) => {
    this.laConexion.all( textoSQL, valoresParaSQL,
      ( err, res ) => {
        console.log(res);
        if( res.length == 0 ){
          resolver(false)
        } else{
          resolver(true)
        }
      })
    })
}

// .................................................................
// cerrar() -->
// .................................................................
cerrar( ) {
  return new Promise( ( resolver, rechazar ) => {
    this.laConexion.close( ( err )=>{
      ( err ? rechazar(err) : resolver() )
    })
  })
  } // ()

} // class
// .....................................................................
// .....................................................................
