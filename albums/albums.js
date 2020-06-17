window.addEventListener("load", function() {

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
            
            let album = informacion.artist.name
            let img =  informacion.cover
            let fans = informacion.fans
            let tiempo = informacion.duration 
            let fecha = informacion.release_date
            

            let htmlimg = `
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
       
            `
             document.querySelector("section").innerHTML += htmlimg  

                let playlists = informacion.tracks.data;
                
                for (let index = 0; index < 9; index++) {
    
                const cadaplaylist = playlists[index];
                
                
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
                    <div><i class="fas fa-heart"></i></div>
                    </article> 
                    `
                    
                    document.querySelector("main").innerHTML += htmlNuevo
                 
                 var cancionButtonRepro = document.querySelectorAll(".Repro");
                 for (let i = 0; i < cancionButtonRepro.length; i++) {
                     cancionButtonRepro[i].onclick = function (){
                      document.querySelector("nav.miniPlayer").innerHTML = '<iframe scrolling="no" frameborder="0" allowTransparency="true" src="https://www.deezer.com/plugins/player?format=clasic&autoplay=true&playlist=false&width=350&height=350&color=de00ff&layout=light&size=small&type=tracks&id=' + this.getAttribute("id-album") +'&app_id=1" width="350" height="350"></iframe>'
                     }
                    }
             }
         }
      )
        
  })
            