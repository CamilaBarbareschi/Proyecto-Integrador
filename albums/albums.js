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