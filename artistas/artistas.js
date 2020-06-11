window.addEventListener ("load", function () {
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
    ////TOP TRACK CORREGIR
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
               let cancionTimeInMinute = duracion/60
                cancionTimeInMinute = Math.floor(cancionTimeInMinute)
                let cancionTimeInSeconds = duracion%60
                
                if(cancionTimeInSeconds<10){
                    cancionTimeInSeconds = '0' + cancionTimeInSeconds
                }
               
                HTMLtoptrack +=
                `
                <nav class="canciones">
                <div class="numero"> ` + parseInt(index + 1)  +`. </div>
                <div class="nombre" >`+ cancionName +`</div>
                <div class="simbolos">
                    <i class="fas fa-play"></i>
                     <i class="fas fa-heart"></i>
                 </div>
                <div class="tiempo">`+ cancionTimeInMinute +`:`+ cancionTimeInSeconds + `  </div>
                </nav>
                `    
           }
            document.querySelector (".Top").innerHTML = HTMLtoptrack;
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
             let HTMLnuevoalbum = "";
           for (let index = 0; index < 12; index++) {
               const cadaAlbum = informacionAlbums[index];

               let imagenAlbum = cadaAlbum.cover_medium;
               let tituloAlbum = cadaAlbum.title;
               let linkParaIngresar = cadaAlbum.id;

             HTMLnuevoalbum +=`
               
               <article class="Principal"> 
               <a href="../albums/albums.html?id-album=`+ linkParaIngresar +`"><img src="`+ imagenAlbum +`" alt=""></a>
               <a style="text-decoration: none;" href="../albums/albums.html?id-album=`+ linkParaIngresar +`"><h2 class="Titulo">`+ tituloAlbum +`</h2></a>
               <p>by `+ nombreArtistaGeneral +`</p>
               </article>
                `;
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

    let HTMLrelacionado = ""

    for (let index = 0; index < 1; index++) {
        const cadaRelacionado = artistaRelacionado[index];

        let imagenDeRelacionado = cadaRelacionado.picture_medium;
        let nameRelacionado = cadaRelacionado.name
        let QfansRelacionado = cadaRelacionado.nb_fan
      
      HTMLrelacionado +=
      `
      <h1 class="nuevo"> Artista relacionado </h1>
      <nav class="fototexto"> 
          <div class="textos">
            <div><h1 class="thriller">`+ nameRelacionado +`</h1></div>
            <h2 class="fecha">`+ QfansRelacionado + " " +`fans </h2>
        </div>
        <div class="imagen">
          <img src="`+ imagenDeRelacionado +`" alt="">
        </div>
        </nav>
      `
        
    }
    document.querySelector (".New").innerHTML = HTMLrelacionado;   
        
    })
})