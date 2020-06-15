var IP_PUERTO = "http://localhost:8080"

class LogicaFake {

  constructor() {
    console.log("Proxy creado")
  }

  //----------------------------------------------------------------------
  // datos:JSON{usuario:Texto, password:Texto}
  // --> iniciarSesion() -->
  // V/F
  //----------------------------------------------------------------------
  iniciarSesion(datos, callback) {

    fetch(IP_PUERTO + "/iniciarSesion", {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(datos), // data can be `string` or {object}!
        headers: {
          'User-Agent': 'Emilio',
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        callback(data.laRespuesta)
      })
  }

  //----------------------------------------------------------------------------
  // url:Texto, nombreArchivo:Texto -->
  // descargarArchivo() -->
  //----------------------------------------------------------------------------
  descargarArchivo(url, nombreArchivo) {
    fetch(url).then(function(t) {
      return t.blob().then((b) => {
        var a = document.createElement("a");
        a.href = URL.createObjectURL(b);
        a.setAttribute("download", nombreArchivo);
        a.click();
      });
    });
  }

  //----------------------------------------------------------------------------
  // nombre:Texto
  // descargarMapa() -->
  //----------------------------------------------------------------------------
  descargarGrabacion(nombre) {
    this.descargarArchivo(IP_PUERTO + "/grabaciones/" + nombre, nombre)
  }

}
