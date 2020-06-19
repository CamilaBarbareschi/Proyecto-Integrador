
    // queryString.get("idPlaylist") ese es el id que le puse a home para la pagina de playlist

    window.addEventListener("load", function() {

        /*Condiciones para crear arrays o guardar canciones en el LocalStorage*/
     let cancionesFavoritas
     if (localStorage.getItem("cancionesPreferidas") != null) {
         cancionesFavoritas = localStorage.getItem("cancionesPreferidas").split(",")
     } else {
         cancionesFavoritas = []
     }
     let playlistFavoritas
    if (localStorage.getItem("playlistPreferidas") != null) {
        playlistFavoritas = localStorage.getItem("playlistPreferidas").split(",")
    } else {
        playlistFavoritas = []
    }



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
                let cancionID = informacion.id;


                let htmlimg = `
                <section class="imagenes">
                <figure>
                <div><img class="portada" src="`+ img +`" alt="Álbum Anti"></div>
                </figure>
                <div class="info-container">
                <h2>`+ titulo +`</h2>
                <ul class="datos-album">
                <li> `+numero+` canciones</li>
                <li> `+ duration +`  segundos</li>
                <li>`+ fans +` fans</li>
                </ul>
               </div>
               </section>
               <div class="toolbar">
               <div> 
                   <button class="escuchar"> 
                       <ul class="escucharbutton icono" id-playlist="`+ cancionID +`" >
                           <li class="icono" id-playlist="`+ cancionID +`"><i class="far fa-play-circle"></i></li>
                           <li>Escuchar</li>
                       </ul>
                   </button>
               </div>
               <div> 
                   <button class="agregar"> 
                       <ul class="botones save" id-playlist="`+ cancionID +`">
                           <li class="save" id-playlist="`+ cancionID +`"><i class="fas fa-heart"></i></li>
                           <li>Agregar</li>
                       </ul>
                   </button>
               </div>
           </div>
                `
                 document.querySelector(".milagro").innerHTML += htmlimg  

                 var cancionButtonRepro = document.querySelectorAll(".icono");
                 for (let i = 0; i < cancionButtonRepro.length; i++) {
                     cancionButtonRepro[i].onclick = function (){
                      document.querySelector("nav.miniPlayer").innerHTML = '<iframe scrolling="no" frameborder="0" allowTransparency="true" src="https://www.deezer.com/plugins/player?format=clasic&autoplay=true&playlist=false&width=350&height=350&color=de00ff&layout=light&size=small&type=playlist&id=' + this.getAttribute("id-playlist") +'&app_id=1" width="350" height="350"></iframe>'
                     }
                    }
                    var playlistButtonSave = document.querySelectorAll(".save")
                 for (let i = 0; i <  playlistButtonSave.length; i++) {
                    playlistButtonSave[i].addEventListener ('click', function(){
                if (playlistFavoritas.includes(this.getAttribute("id-playlist")) == false ) {
                    playlistFavoritas.push(this.getAttribute("id-playlist"))
                    localStorage.setItem("playlistPreferidas", playlistFavoritas) 
                    UIkit.notification({message: '<span uk-icon=\'icon: heart\'></span> Playlist guardada en favoritos ', status: 'danger'})
                  
                } 
            })
            
        }
                
                let playlists = informacion.tracks.data;
                
                for (let index = 0; index < playlists.length; index++) {
    
                const cadaplaylist = playlists[index];
                
                
                let song = cadaplaylist.title;;
                let artist = cadaplaylist.artist.name;
                let linkartist = cadaplaylist.artist.id;
                let album = cadaplaylist.album.title;
                let link = cadaplaylist.album.id;
                let cancionID = cadaplaylist.id;
    
                    let htmlNuevo = `
                    <div class="musica">
                    <div class="simbolos">
                    <button class='saveAlbum' id-song="`+ cancionID +`"><i class='fas fa-heart' id='pintadito'></i></button>
                    </div>
                    <div class="simbolos">
                    <button class= "Repro" id-playlist=`+ cancionID +`><i class="fas fa-play"></i></button>
                    </div>
                    <div> ` + song +` </div>
                    <div> <a href="../artistas/artistas.html?id-artista=`+ linkartist +`"> ` + artist +` </a> </div>
                    <div> <a href="../albums/albums.html?id-album=`+ link +`"> ` + album +` </a></div>
                    </article>
                    </div>
                    `
                    
                    document.querySelector(".playlistss").innerHTML += htmlNuevo
                    var cancionButtonRepro = document.querySelectorAll(".Repro");
                 for (let i = 0; i < cancionButtonRepro.length; i++) {
                     cancionButtonRepro[i].onclick = function (){
                      document.querySelector("nav.miniPlayer").innerHTML = '<iframe scrolling="no" frameborder="0" allowTransparency="true" src="https://www.deezer.com/plugins/player?format=clasic&autoplay=true&playlist=false&width=350&height=350&color=de00ff&layout=light&size=small&type=tracks&id=' + this.getAttribute("id-playlist") +'&app_id=1" width="350" height="350"></iframe>'
                     }
                    }
                    var cancionButtonSave = document.querySelectorAll("button.saveAlbum")

                    for (let i = 0; i < cancionButtonSave.length; i++) {
                           
                       cancionButtonSave[i].addEventListener ('click', function(){
       
                           if(cancionesFavoritas.includes(this.getAttribute("id-song")) == false ){
   
                               cancionesFavoritas.push(this.getAttribute("id-song"));
   
                               localStorage.setItem("cancionesPreferidas", cancionesFavoritas);
   
                               UIkit.notification({message: '<span uk-icon=\'icon: heart\'></span> Canción guardada en favoritos ', status: 'danger'})  
           
                           
                      }
                                  
                     })
                           
                 } 
                }

             }
        )
        
    })

    


    