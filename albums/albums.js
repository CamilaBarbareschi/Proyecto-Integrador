window.addEventListener("load", function() {

    let queryString = new URLSearchParams(location.search);

    let codigoDelAlbum = queryString.get("albumID");
 

    fetch("https://cors-anywhere.herokuapp.com/https://api.deezer.com/album/" + codigoDelAlbum)
    .then(
        function(respuesta) {
            return respuesta.json();            
        }
    )
    .then(
        function(informacion) {
            let resultadosAlbum = informacion.data
            let album = resultadosAlbum.title
            let img =  resultadosAlbum.cover
            let fans = resultadosAlbum.fans
            
        }
    )
})