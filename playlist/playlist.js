
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
               
                let img = informacion.picture;
                let duration = informacion.duration
                let fans = informacion.fans
                let numero = informacion.nb_tracks   
                let titulo = informacion.title

                let htmlimg = `
                <figure>
                <div><img class="portada" src="`+ img +`" alt="Álbum Anti"></div>
                <div class="i"><i class="far fa-play-circle"></i></div>
                </figure>
                <div class="info-container">
                <h1>`+ titulo +`</h1>
                <ul class="datos-album">
                <li> `+numero+` canciones</li>
                <li> `+ duration +`  segundos</li>
                <li> 28/01/2016</li>
                <li>`+ fans +` fans</li>
                </ul>
               </div>
           
                `
                 document.querySelector(".imagenes").innerHTML += htmlimg  
                
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

    


    