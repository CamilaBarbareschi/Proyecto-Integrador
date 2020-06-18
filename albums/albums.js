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
            console.log(informacion)

            let playlist = informacion.tracks.data;
            let album = informacion.artist.name
            let img =  informacion.cover
            let fans = informacion.fans
            let tiempo = informacion.duration 
            let fecha = informacion.release_date
            let cancionID = playlist.id;

            let htmlimg = `
            <section>
            <figure>
            <div><img class="portada" src="`+ img +`" alt="Álbum Anti"></div>
            <div class="i"><i class="far fa-play-circle"></i></div>
            </figure>
            <div class="info-container">
            <h1>`+ album +`</h1>
            <ul class="datos-album">
            <li>`+ fecha +`</li>
            <li> `+ tiempo +`  segundos</li>
            <li>`+ fans +` fans</li>
            </ul>
           </div>
           </section>
           <div class="toolbar">
           <div> 
           <button class="escuchar"> 
               <ul class="escucharbutton">
                   <li class="icono" id-playlist="`+ cancionID +`"><i class="far fa-play-circle"></i></li>
                   <li>Escuchar</li>
               </ul>
           </button>
           </div>
           <div> 
           <button class="agregar"> 
               <ul class="botones">
                   <li class="save" id-playlist="`+ cancionID +`"><i class="fas fa-heart"></i></li>
                   <li>Agregar</li>
               </ul>
           </button>
           </div>
           </div>
            `
             document.querySelector(".bloque").innerHTML += htmlimg  

             var cancionButtonRepro = document.querySelectorAll(".icono");
                 for (let i = 0; i < cancionButtonRepro.length; i++) {
                     cancionButtonRepro[i].onclick = function (){
                      document.querySelector("nav.miniPlayer").innerHTML = '<iframe scrolling="no" frameborder="0" allowTransparency="true" src="https://www.deezer.com/plugins/player?format=clasic&autoplay=true&playlist=false&width=350&height=350&color=de00ff&layout=light&size=small&type=tracks&id=' + this.getAttribute("id-playlist") +'&app_id=1" width="350" height="350"></iframe>'
                     }
                    }
                   var albumButtonSave = document.querySelectorAll(".save")
             for (let i = 0; i < albumButtonSave.length; i++) {
             albumButtonSave[i].addEventListener ('click', function(){

                if (albumsFavoritos.includes(this.getAttribute("id-album")) == false ) {
                   
                    albumsFavoritos.push(this.getAttribute("id-album"));

                    localStorage.setItem("albumsPreferidos", albumsFavoritos);
                    
                    UIkit.notification({message: '<span uk-icon=\'icon: heart\'></span> Álbum guardado en favoritos', status: 'danger'})
                   
                } 
                   
            })
            
        }

                let playlists = informacion.tracks.data;
                
                for (let index = 0; index < 9; index++) {
    
                const cadaplaylist = playlists[index];
                
                let cancionID = cadaplaylist.id
                let song = cadaplaylist.title;;
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
      fetch ("https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/"+ codigoDelAlbum )
      .then (function (respuestaArtista) {
          return respuestaArtista.json()
      })
      .then (function (infoArtista) {
          console.log(infoArtista);
      
          let informacionArtista = infoArtista.data;
           
          let HTMLnuevoalbum = ""
      
      for (let index = 0; index < 12; index++) {
          const cadaAlbum = informacionArtista[index];

          let imagenAlbum = cadaAlbum.cover_medium;
          let tituloAlbum = cadaAlbum.title;
          let linkParaIngresar = cadaAlbum.id;

        HTMLnuevoalbum +=
       `
       <ul class="uk-slider-items uk-grid uk-grid-match uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@m" uk-height-viewport=" true; offset-bottom: 60">   
       <li>
       <div class="uk-card uk-card-small uk-card-default">
           <div class="uk-card-media-top">
               <img class="artistasim" src="`+ imagenAlbum +`" alt="">
           </div>
           <div class="uk-card-body">
              <a href="../artistas/artistas.html"> <h3 class="uk-card-title">`+ tituloAlbum +`</h3></a>
           </div>
       </div>                        
       </li>
        </ul>
        <a class="slide-button uk-position-center-left uk-position-small uk-hidden-hover" href="#"uk-slidenav-previous uk-slider-item="previous"></a>
        <a class="slide-button uk-position-center-right uk-position-small uk-hidden-hover" href="#" uk-slidenav-next uk-slider-item="next"></a>
       `
      }
      document.querySelector (".albunes").innerHTML = HTMLnuevoalbum;

      let artistaRelacionado = infoArtista.data
  
  
      for (let index = 0; index < 1; index++) {
          const cadaRelacionado = artistaRelacionado[index];
  
          let imagenDeRelacionado = cadaRelacionado.picture_medium;
          let nameRelacionado = cadaRelacionado.name
          let AidiDelArtista = cadaRelacionado.id
        
         let HTMLrelacionado = `
         <ul class="uk-slider-items uk-grid uk-grid-match uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@m" uk-height-viewport=" true; offset-bottom: 60">
         <li>
         <div class="uk-card uk-card-small uk-card-default">
             <div class="uk-card-media-top">
                 <img src="`+ imagenDeRelacionado +`" alt="">
             </div>
             <div class="uk-card-body">
                <a href="../albums/albums.html"> <h3 class="uk-card-title">`+ nameRelacionado +`</h3></a>
             </div>
         </div>                        
         </li>
         </ul>
         <a class="slide-button uk-position-center-left uk-position-small uk-hidden-hover" href="#"uk-slidenav-previous uk-slider-item="previous"></a>
         <a class="slide-button uk-position-center-right uk-position-small uk-hidden-hover" href="#" uk-slidenav-next uk-slider-item="next"></a>
        `
          document.querySelector (".artistas").innerHTML += HTMLrelacionado;
      }   
      }) 
  })
            