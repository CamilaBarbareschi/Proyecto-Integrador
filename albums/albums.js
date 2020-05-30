window.addEventListener("load", function() {

    let queryString = new URLSearchParams(location.search);

    let codigoDelAlbum = queryString.get("idAlbum");
    console.log (codigoDelAlbum)

    fetch("https://cors-anywhere.herokuapp.com/https://api.deezer.com/album/" + codigoDelAlbum)
    .then(
        function(respuesta) {
            return respuesta.json();            
        }
    )
    .then(
        function(informacion) {
            let album = informacion.title
            let img = informacion.cover
            console.log(img)
        }
    )
})