
    // queryString.get("idPlaylist") ese es el id que le puse a home para la pagina de playlist

    window.addEventListener("load", function() {

        let queryString = new URLSearchParams(location.search);
    
        let codigoDeplaylist = queryString.get("id-playlist");
     
    
        fetch( "https://cors-anywhere.herokuapp.com/https://api.deezer.com/playlist/" + codigoDeplaylist )
        .then(
            function(respuesta) {
                return respuesta.json();            
            }
        )
        .then(
            function(informacion) {
                console.log (informacion)
                let playlists = informacion.tracks.data;
    
                for (let index = 0; index < 9; index++) {
    
                const cadaplaylist = playlists[index];
                
                
                let song = cadaplaylist.title;;
                let artist = cadaplaylist.artist.name;
                let album = cadaplaylist.album.title;
    
                    let htmlNuevo = `
                    <div class="musica">
                    <div><i class="fas fa-play"></i></div>
                    <div> ` + song +` </div>
                    <div> <a href="../artistas/artistas.html"> ` + artist +` </a> </div>
                    <div> <a href="../albums/albums.html"> ` + album +` </a></div>
                    </article>
                    </div>
                    `
                    
                    document.querySelector(".playlistss").innerHTML += htmlNuevo
                 }
             }
        )
    })

    