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

buscarUsuario( usuario ){
  var textoSQL = "select * from Usuarios where usuario = $usuario";
  var valoresParaSQL = { $usuario: usuario}
  return new Promise( ( resolver, rechazar ) => {
    this.laConexion.all( textoSQL, valoresParaSQL,
      ( err, res ) => {
        if( res == undefined ){
          resolver(false)
          return
        }        
        resolver(res[0])
      })
    })
}

//----------------------------------------------------------------------
// datos:JSON{usuario:Texto, password:Texto}
// --> iniciarSesion() -->
// V/F
//----------------------------------------------------------------------
async iniciarSesion( datos ){

  var usuario = await this.buscarUsuario(datos.usuario);

  return new Promise((resolver, rechazar) =>{

    if( !usuario ){
      resolver(false)
      console.log("No existe el usuario");
      
      return
    } 

    if( usuario.password != datos.password ){
      console.log("La contraseña no coincide");
      resolver(false)
      return
    }

    resolver(true)
    console.log("Credenciales correctas");
    
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
