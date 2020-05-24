window.addEventListener ("load", function (){

    fetch ("https://cors-anywhere.herokuapp.com/https://api.deezer.com/album")
    .then(
        function (respuesta){
          return respuesta.json();
        }
    )
    .then (
        function (informacion) {
        let albums = infomacion.data
        console.log(albums)
    })
})