window.addEventListener ("load", function () {

    /*Condiciones para crear arrays o guardar canciones en el LocalStorage*/
    let cancionesFavoritas
    if (localStorage.getItem("cancionesPreferidas") != null) {
        cancionesFavoritas = localStorage.getItem("cancionesPreferidas").split(",")
    } else {
        cancionesFavoritas = []
    }

    let queryString = new URLSearchParams (location.search);
    let codigoArtista = queryString.get ("id-artista")

    let nombreArtistaGeneral = ""

    fetch ("https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/" + codigoArtista)
    .then (
        function (respuesta) {
            return respuesta.json();
        }
    )
    .then(
        function (resultado) {
          let nameArtista = resultado.name;
          nombreArtistaGeneral = resultado.name;
          let Qfans = resultado.nb_fan;
          let imagenArtista = resultado.picture_medium
          let HTMLpresentacion =
        `
        <div class="icono">
        <img src="` + imagenArtista + `" alt="">
        </div>
        <div clase="Texto">
        <h1 class="NombreDelArtista"> ` + nameArtista + ` </h1>
        <h2 class= "Subtitulo">`+ Qfans + " " + `fans </h2>
        </div>
        `
        document.querySelector ("header.contenedor").innerHTML = HTMLpresentacion    
        }
    )
    ////TOP TRACK
    fetch("https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/"+codigoArtista+"/top")
    .then (
        function (respuestaTopTracks) {
            return respuestaTopTracks.json()
        }
    )
    .then (
       function (infoTopTracks) {
           ////console.log(infoTopTracks);
           let informacion = infoTopTracks.data;
           HTMLtoptrack = '<h1 class="tituloTop10"> Top tracks</h1>';
           for (let index = 0; index < informacion.length; index++) {
               const cadaelemento = informacion[index];
               
               let cancionName = cadaelemento.title
               let duracion = cadaelemento.duration
               let AidiCancion = cadaelemento.id
               let cancionTimeInMinute = duracion/60
                cancionTimeInMinute = Math.floor(cancionTimeInMinute)
                let cancionTimeInSeconds = duracion%60
                
                if(cancionTimeInSeconds<10){
                    cancionTimeInSeconds = '0' + cancionTimeInSeconds
                }
               
                if(cancionesFavoritas.includes("" + AidiCancion) == false ){

                HTMLtoptrack +=
                `
                <nav class="canciones">
                <div class="numero"> ` + parseInt(index + 1)  +`. </div>
                <div class="nombre" >`+ cancionName +`</div>
                <div class="simbolos">
                    <button class= "Repro" id-song=`+ AidiCancion +`><i class="fas fa-play"></i></button>
                     <button class= "saveSong" id-song=`+ AidiCancion +`><i class="fas fa-heart" id="porPintar"></i></button>
                 </div>
                <div class="tiempo">`+ cancionTimeInMinute +`:`+ cancionTimeInSeconds + `  </div>
                </nav>
                ` 
             } else {

                 HTMLtoptrack +=

                `
                <nav class="canciones">
                <div class="numero"> ` + parseInt(index + 1)  +`. </div>
                <div class="nombre" >`+ cancionName +`</div>
                <div class="simbolos">
                    <button class= "Repro" id-song=`+ AidiCancion +`><i class="fas fa-play"></i></button>
                     <button class= "saveSong" id-song=`+ AidiCancion +`><i class="fas fa-heart" id="pintadito"></i></button>
                 </div>
                <div class="tiempo">`+ cancionTimeInMinute +`:`+ cancionTimeInSeconds + `  </div>
                </nav>
                ` 
             }

              
           }
           document.querySelector (".Top").innerHTML = HTMLtoptrack;
            
           var cancionButtonRepro = document.querySelectorAll(".Repro");
            for (let i = 0; i < cancionButtonRepro.length; i++) {
                cancionButtonRepro[i].onclick = function (){
                 document.querySelector("nav.miniPlayer").innerHTML = '<iframe scrolling="no" frameborder="0" allowTransparency="true" src="https://www.deezer.com/plugins/player?format=clasic&autoplay=true&playlist=false&width=350&height=350&color=de00ff&layout=light&size=small&type=tracks&id=' + this.getAttribute("id-song") +'&app_id=1" width="350" height="350"></iframe>'
                }
            }
            var cancionButtonSave = document.querySelectorAll("button.saveSong")
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
    )
    ///ALBUMS
    fetch ("https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/" + codigoArtista + "/albums")
    .then (
          function (respuestaAlbums) {
              return respuestaAlbums.json();
          }
    )
    .then (
       function (infoAlbums) {
           ///console.log(infoAlbums);
           
           let informacionAlbums = infoAlbums.data;
           
           let HTMLnuevoalbum = ""
           
           for (let index = 0; index < 12; index++) {
               const cadaAlbum = informacionAlbums[index];

               let imagenAlbum = cadaAlbum.cover_medium;
               let tituloAlbum = cadaAlbum.title;
               let linkParaIngresar = cadaAlbum.id;

             HTMLnuevoalbum +=
            `   
               <article class="Principal"> 
               <a href="../albums/albums.html?id-album=`+ linkParaIngresar +`"><img src="`+ imagenAlbum +`" alt=""></a>
               <a style="text-decoration: none;" href="../albums/albums.html?id-album=`+ linkParaIngresar +`"><h2 class="Titulo">`+ tituloAlbum +`</h2></a>
               <p>by `+ nombreArtistaGeneral +`</p>
               </article>
            `
           }
           document.querySelector ("#main").innerHTML = HTMLnuevoalbum;

       }
    )
    
    fetch ("https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/"+ codigoArtista +"/related")
    .then (function (respuestaArtistaRelacionado) {
        return respuestaArtistaRelacionado.json()
    })
    .then (function (infoArtistaRelacionado) {
        console.log(infoArtistaRelacionado);
    let artistaRelacionado = infoArtistaRelacionado.data


    for (let index = 0; index < 1; index++) {
        const cadaRelacionado = artistaRelacionado[index];

        let imagenDeRelacionado = cadaRelacionado.picture_medium;
        let nameRelacionado = cadaRelacionado.name
        let QfansRelacionado = cadaRelacionado.nb_fan
        let AidiDelArtista = cadaRelacionado.id
      
       let HTMLrelacionado =
      `
      <h1 class="nuevo"> Artista relacionado </h1>
      <nav class="fototexto"> 
          <div class="textos">
            <div><a style="text-decoration: none;" href= "artistas.html?id-artista= `+ AidiDelArtista +`"><h1 class="thriller">`+ nameRelacionado +`</h1></a></div>
            <h2 class="fecha">`+ QfansRelacionado + " " +`fans </h2>
        </div>
        <div class="imagen">
          <img src="`+ imagenDeRelacionado +`" alt="">
        </div>
        </nav>
      `
        document.querySelector (".New").innerHTML += HTMLrelacionado;
    }
       
        
    })

})
