class Logica {

  constructor( ){
    console.log("Proxy creado");   
  }

  //----------------------------------------------------------------------
  // datos:JSON{usuario:Texto, password:Texto}
  // --> iniciarSesion() -->
  // V/F
  //----------------------------------------------------------------------
  async iniciarSesion( datos, callback){

    var myInit = { method: 'GET',
                   headers: {
                     'User-Agent' : 'jordi', 'Content-Type' : 'application/json'
                   },
                   mode: 'cors',
                   cache: 'default' };

    fetch(this.ip+"/iniciarSesion", myInit)
    .then((res)=>{
      return res.json();
    })
    .then((data)=>{
      callback(res.laRespuesta)
    })

  }

}
