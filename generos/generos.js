window.addEventListener("load", function() {

    fetch("https://cors-anywhere.herokuapp.com/https://api.deezer.com/genre")
    .then(function(respuesta) {
      return respuesta.json()
    })
    .then(function(informacion) {
        let listadoGenero = informacion.data

        for (let index = 1; index < listadoGenero.length; index++) {
            const cadaGenero = listadoGenero[index];
            
            let cadaGeneroNombre = cadaGenero.name
            
            let nuevoHTML ='<li class="uk-active cadaGenero"><a href="../generos/generos.html">'+ cadaGeneroNombre +'</a></li>' 
            document.querySelector (".cadaGeneroContenedor").innerHTML += nuevoHTML
        }

    })
})