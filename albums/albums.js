window.addEventListener("load", function() {

     /*Condiciones para crear arrays o guardar canciones en el LocalStorage*/
     let cancionesFavoritas
     if (localStorage.getItem("cancionesPreferidas") != null) {
         cancionesFavoritas = localStorage.getItem("cancionesPreferidas").split(",")
     } else {
         cancionesFavoritas = []
     }
     let albumsFavoritos
     if (localStorage.getItem("albumsPreferidos") != null) {
      albumsFavoritos = localStorage.getItem("albumsPreferidos").split(",")
     } else {
      albumsFavoritos = []
     }

    let queryString = new URLSearchParams(location.search);

    let codigoDelAlbum = queryString.get("id-album");
 

    fetch("https://cors-anywhere.herokuapp.com/https://api.deezer.com/album/" + codigoDelAlbum)
    .then(
        function(respuesta) {
            return respuesta.json();            
        }
    )
    .then(
        function(informacion) {
          
            let album = informacion
            let nombreAlbum =  album.title
            let albumId =  album.id
            let playlist = informacion.tracks.data;
            let img = album.cover
            let fans = informacion.fans
            let tiempo = informacion.duration 
            let fecha = informacion.release_date
            let cancionID = playlist.id;

            let htmlimg = `
            <section>
            <figure>
            <div><img class="portada" src="`+ img +`"></div>
            </figure>
            <div class="info-container">
            <h1>`+ nombreAlbum +`</h1>
            <ul class="datos-album">
            <li>`+ fecha +`</li>
            <li> `+ tiempo +`segundos</li>
            <li>`+ fans +` fans</li>
            </ul>
            </div>
            </section>
            <div class="toolbar">
            <div> 
            <button class="escuchar icono" id-album="`+ albumId +`"> 
               <ul class="escucharbutton">
                   <li class="icono" id-album="`+ albumId +`"><i class="far fa-play-circle"></i></li>
                   <li>Escuchar</li>
               </ul>
            </button>
            </div>
            <div> 
            <button class="agregar"> 
               <ul class="botones">
                   <li class="save" id-album="`+ albumId +`"><i class="fas fa-heart" id='pintadito'></i></li>
                   <li>Agregar</li>
               </ul>
            </button>
            </div>
            </div>`
             
             document.querySelector(".bloque").innerHTML += htmlimg  

            var cancionButtonRepro = document.querySelectorAll(".icono");
                for (let i = 0; i < cancionButtonRepro.length; i++) {
                    cancionButtonRepro[i].onclick = function (){
                      document.querySelector("nav.miniPlayer").innerHTML = '<iframe scrolling="no" frameborder="0" allowTransparency="true" src="https://www.deezer.com/plugins/player?format=clasic&autoplay=true&playlist=false&width=350&height=350&color=de00ff&layout=light&size=small&type=album&id=' + this.getAttribute("id-album") +'&app_id=1" width="350" height="350"></iframe>'
                    }
                }
                   var albumButtonSave = document.querySelectorAll(".save")
            
            for (let i = 0; i < albumButtonSave.length; i++) {
             albumButtonSave[i].addEventListener ('click', function(){
                if (albumsFavoritos.includes(this.getAttribute("id-album")) == false ) {
                    albumsFavoritos.push(this.getAttribute("id-album"))
                    localStorage.setItem("albumsPreferidos", albumsFavoritos);
                    UIkit.notification({message: '<span uk-icon=\'icon: heart\'></span> Álbum guardado en favoritos', status: 'danger'})
                }  
            })
            
        }

            let playlists = informacion.tracks.data;
                
                for (let index = 0; index < 9; index++) {
    
                const cadaplaylist = playlists[index];
                
                let cancionID = cadaplaylist.id
                let song = cadaplaylist.title;
                let AidiCancion = cadaplaylist.id
                let duracion = cadaplaylist.duration
                let cancionTimeInMinute = duracion/60
                cancionTimeInMinute = Math.floor(cancionTimeInMinute)
                let cancionTimeInSeconds = duracion%60
                
                if(cancionTimeInSeconds<10){
                    cancionTimeInSeconds = '0' + cancionTimeInSeconds
                }
               
                    let htmlNuevo = `
                    <article class="canciones">
                    <div class="simbolos">
                    <button class= "Repro" id-album=`+ AidiCancion +`><i class="fas fa-play"></i></button>
                    </div>
                    <div  class="play">`+ song +`</div>
                    <div>`+ cancionTimeInMinute +`:`+ cancionTimeInSeconds + ` </div>
                    <button class='saveAlbum' id-album="`+ cancionID +`"><i class='fas fa-heart' id='pintadito'></i></button>
                    </article> 
                    `
                    
                    document.querySelector("main").innerHTML += htmlNuevo
                 
                 var cancionButtonRepro = document.querySelectorAll(".Repro");
                 for (let i = 0; i < cancionButtonRepro.length; i++) {
                     cancionButtonRepro[i].onclick = function (){
                      document.querySelector("nav.miniPlayer").innerHTML = '<iframe scrolling="no" frameborder="0" allowTransparency="true" src="https://www.deezer.com/plugins/player?format=clasic&autoplay=true&playlist=false&width=350&height=350&color=de00ff&layout=light&size=small&type=tracks&id=' + this.getAttribute("id-album") +'&app_id=1" width="350" height="350"></iframe>'
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
            