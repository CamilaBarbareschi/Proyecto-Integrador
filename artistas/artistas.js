window.addEventListener ("load", function () {
    let queryString = new URLSearchParams (location.search);
    let codigoArtista = queryString.get ("id-artista")

    fetch ("https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/" + codigoArtista)
    .then (
        function (respuesta) {
            return respuesta.json();
        }
    )
    .then(
        function (resultado) {
            console.log(resultado);
            let info = resultado.data
            
            for (let index = 0; index < 1; index++) {
                const presentacionArtista = info [index];

                let imagenArtista = presentacionArtista.picture_medium;
                let Qfans = presentacionArtista.nb_fan;
                let nombreArtista = presentacionArtista.name;
                let HTMLpresentacion =
                `
                <div class="icono">
                <img src="` + imagenArtista + `">
                </div>
                <div clase="Texto">
                         <h1 class="NombreDelArtista"> ` + nombreArtista + ` </h1>
                         <h2 class= "Subtitulo">` + Qfans + `fans </h2>
                </div>
                `
                document.querySelector (".contenedor").innerHTML += HTMLpresentacion
            }
            
        }
    )
})