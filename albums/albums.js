window.addEventListener("load", function() {

    let queryString = new URLSearchParams(location.search);

    let codigoDelAlbum = queryString.get("albumID");
 

    fetch("https://cors-anywhere.herokuapp.com/https://api.deezer.com/album/302127" + codigoDelAlbum)
    .then(
        function(respuesta) {
            return respuesta.json();            
        }
    )
    .then(
        function(informacion) {
            console.log(informacion)
            
            let album = informacion.title
            let img =  informacion.cover
            let fans = informacion.fans
            let tiempo = informacion.duration 

            let htmlimg = `
            <figure>
            <div><img class="portada" src="`+ img +`" alt="Álbum Anti"></div>
            <div class="i"><i class="far fa-play-circle"></i></div>
            </figure>
            <div class="info-container">
            <h1>`+ album +`</h1>
            <ul class="datos-album">
            <li> `+ tiempo +`  segundos</li>
            <li>`+ fans +` fans</li>
            </ul>
           </div>
       
            `
             document.querySelector("section").innerHTML += htmlimg  

             let albunes = informacion.tracks.data;
                
                for (let index = 0; index < 9; index++) {
    
                const cadacancion = albunes[index];
                
                
                let song = cadacancion.title;;
                
    
                    let htmlNuevo = `
                    <article class="canciones">
                    <div class="numero">1</div>
                    <div><i class="fas fa-play"></i></div>
                    <div  class="play">`+ song +`</div>
                    <div> 03:39 </div>
                    <div><i class="fas fa-heart"></i></div>
                    </article> 
                    `
                    
                    document.querySelector("main").innerHTML += htmlNuevo
                }
            }
       )
       
   })