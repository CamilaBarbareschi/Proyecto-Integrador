
    // queryString.get("idPlaylist") ese es el id que le puse a home para la pagina de playlist

    window.addEventListener("load", function() {

        let queryString = new URLSearchParams(location.search);
    
        let codigoDeplaylist = queryString.get("idPlaylist");
     
    
        fetch( "https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart/0/playlists" + codigoDeplaylist )
        .then(
            function(respuesta) {
                return respuesta.json();            
            }
        )
        .then(
            function(resultado) {
                console.log (resultado)
                let playlist = resultado.data;
                
                for (let index = 0; index < 9; index++) {
                    const cadaCancion = playlist[index];
                    
                let title = cadaCancion.title;;
                let artist = cadaCancion.name;
                let album = cadaCancion.name;
    
                    let htmlNuevo = `
                    <article class="musica">
                    <div><button><i class="fas fa-heart"></i></button></div>
                    <div><i class="fas fa-play"></i></div>
                    <div> ` + title +` </div>
                    <div> <a href="../artistas/artistas.html"> ` + artist +` </a> </div>
                    <div> <a href="../albums/albums.html"> ` + album +` </a></div>
                    </article>
                    `
                    
                    document.querySelector("playlist").innerHTML += htmlNuevo
                }
            }
        )
    })