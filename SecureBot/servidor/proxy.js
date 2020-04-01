
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

    var myInit = { method: 'GET',
                   headers: {
                     'User-Agent' : 'jordi', 'Content-Type' : 'application/json'
                   },
                   mode: 'cors',
                   cache: 'default' };

    fetch("http://192.168.56.1:8080"+"/iniciarSesion", myInit)
    .then((res)=>{
      return res.json();
    })
    .then((data)=>{
      callback(data.laRespuesta)
    })

  }

}
