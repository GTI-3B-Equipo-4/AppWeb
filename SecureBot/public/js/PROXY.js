var ip_host = "http://localhost:8080"
class LogicaFake {

  constructor( ){
    console.log("Proxy creado")
  }

  //----------------------------------------------------------------------
  // datos:JSON{usuario:Texto, password:Texto}
  // --> iniciarSesion() -->
  // V/F
  //----------------------------------------------------------------------
  iniciarSesion( datos, callback){

    fetch(ip_host+"/iniciarSesion",{
      method: 'POST', // or 'PUT'
      body: JSON.stringify(datos), // data can be `string` or {object}!
      headers: {
      'User-Agent': 'Emilio',
      'Content-Type': 'application/json'
      }
    })
    .then((res)=>{
      return res.json();
    })
    .then((data)=>{
      callback(data.laRespuesta)
    })
  }


}



/*class LogicaFake {

      constructor( ){
        console.log("Proxy creado")
      }

      //----------------------------------------------------------------------
      // datos:JSON{usuario:Texto, password:Texto}
      // --> iniciarSesion() -->
      // V/F
      //----------------------------------------------------------------------
      iniciarSesion( datos, callback){

        fetch("http://192.168.1.134:8080"+"/iniciarSesion",{
          method: 'POST', // or 'PUT'
          body: JSON.stringify(datos), // data can be `string` or {object}!
          headers: {
          'User-Agent': 'Emilio',
          'Content-Type': 'application/json'
          }
        })
        .then((res)=>{
          return res.json();
        })
        .then((data)=>{
          callback(data.laRespuesta)
        })
      }

  }
*/
