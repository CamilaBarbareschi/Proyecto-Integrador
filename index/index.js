window.addEventListener ("load", function (){

  fetch ("https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart")
      .then(
          function (respuesta){
            return respuesta.json();
          }
      )
      .then (
        function (informacion) {
          
        let albums = informacion.albums.data

        for (let index = 0; index < albums.length; index++) {
          const cadaAlbum = albums[index];

           let coverAlbums = cadaAlbum.cover_medium
           let tituloAlbums = cadaAlbum.title
           let cadaAlbumId = cadaAlbum.id 
           let preview = cadaAlbum.id
           let nuevoHtmlAlbumSlideShow = 
           "<li class='uk-transition-toggle' tabindex='0'>"+ 
           "<div class='container itemcontenedor'>" +  
           "<img class='imgSlideAlbum' src=" + coverAlbums + 
           "></img>" + "<button class='repro'  id-album='" + preview + "'><i class='fas fa-play'></i></button>"+ 
           "<button class='save'><i class='fas fa-heart'></i></button>"+
           "<div class='uk-position-center uk-panel'>" + 
           "<a class='nombreLink' href='../albums/albums.html?idAlbum ='" + cadaAlbumId + "'>" + 
           "<h2 class='uk-transition-slide-bottom-small'>"+  tituloAlbums + 
           "</h2>" + "</a>" + "</div>" + "</div>" + "</li>"
           document.querySelector("ul.listadoAlbums").innerHTML += nuevoHtmlAlbumSlideShow
        }
        var buttonRepro = document.querySelectorAll("button.repro")
        for (let i = 0; i < buttonRepro.length; i++) {
          buttonRepro[i].onclick = function (){
            document.querySelector("nav.miniPlayer").innerHTML = '<iframe scrolling="no" frameborder="0" allowTransparency="true" src="https://www.deezer.com/plugins/player?format=clasic&autoplay=true&playlist=false&width=350&height=350&color=de00ff&layout=light&size=small&type=album&id=' + this.getAttribute("id-album") +'&app_id=1" width="350" height="350"></iframe>'
          }
        }
        let artistas = informacion.artists.data
         
        for (let index = 0; index < artistas.length; index++) {
          const cadaArtista = artistas[index];

            let imgArtista = cadaArtista.picture_medium 
         
            let nombreArtista = cadaArtista.name
            let previewArtista = cadaArtista.id
            
            let nuevoHtmlArtistaSlideShow = 
            "<li class='uk-transition-toggle' tabindex='0'>" +
            "<div class='container itemcontenedor imgArt'>" +  
            "<img class='imgSlide slide artistacontenedor' src=" + imgArtista +  
            "></img>" + "<button class='repro artista' id-artista='" + previewArtista + "'><i class='fas fa-play'></i></button>"+ 
            "<button class='save'><i class='fas fa-heart'></i></button>" +
            "<div class='uk-position-center uk-panel'>" + 
            "<a class='nombreLink' href='../artistas/artistas.html'>" + 
            "<h2 class='uk-transition-slide-bottom-small'>" +  nombreArtista + 
            "</h2>" + "</a>" + "</div>" + "</div>" + "</li>"
            document.querySelector("ul.listadoArtistas").innerHTML += nuevoHtmlArtistaSlideShow
        }
        
        var buttonReproArtista = document.querySelectorAll("button.artista")
        for (let i = 0; i< buttonReproArtista.length; i++) {
          buttonReproArtista[i].onclick = function(){
            document.querySelector("nav.miniPlayer").innerHTML = '<iframe scrolling="no" frameborder="0" allowTransparency="true" src="https://www.deezer.com/plugins/player?format=clasic&autoplay=true&playlist=false&width=350&height=350&color=de00ff&layout=light&size=small&type=artist&id=' + this.getAttribute("id-artista") +'&app_id=1" width="350" height="350"></iframe>'
          }
         
        }

        let playlist = informacion.playlists.data
         
        for (let index = 0; index < playlist.length; index++) {
          const cadaPlaylist = playlist[index];

            let coverPlaylist = cadaPlaylist.picture_medium 
            let previewPlaylist = cadaPlaylist.id
            let nuevoHtmlPlaylistSlideShow = 
            "<li class='uk-transition-toggle' tabindex='0'>" + 
            "<div class='container itemcontenedor'>"+
            "<a class='nombreLink' href='../playlist/playlist.html'>"  + 
            "<img class='imgSlide' src=" + coverPlaylist +  "></img>" + 
            "</a>"+ "<button class='repro playlist' id-playlist =' " + previewPlaylist + "'><i class='fas fa-play'></i></button>"+ 
            "<button class='save'><i class='fas fa-heart'></i></button>"+ "</div>" + "</li>"
            document.querySelector("ul.listadoPlaylist").innerHTML += nuevoHtmlPlaylistSlideShow
        }
        var buttonReproPlaylist = document.querySelectorAll("button.playlist")
        for (let i = 0; i < buttonReproPlaylist.length; i++) {
          buttonReproPlaylist[i].onclick = function (){
            document.querySelector("nav.miniPlayer").innerHTML = '<iframe scrolling="no" frameborder="0" allowTransparency="true" src="https://www.deezer.com/plugins/player?format=classic&autoplay=true&playlist=false&width=350&height=350&color=de00ff&layout=light&size=medium&type=playlist&id=' + this.getAttribute("id-playlist") +'&app_id=1" width="350" height="350"></iframe>'
          }
        }
        
      })
    
  var boton = document.querySelector ("button.textoLink")
  boton.addEventListener("click", function () {
      document.querySelector("section.rankings").style.display = "block";
      document.querySelector("div.animacionWrapper").style.display = "none";
      document.querySelector("div.btnback").style.display = "block";
      document.querySelector("div.btnback").style.display = "grid";
      document.querySelector("div.btnback").style.gridTemplateColumns = "auto auto";
  });
  
  var goGoback = document.querySelector("div.circulo")
  goGoback.addEventListener ("mouseover", function(){
      goGoback.style.backgroundColor = "#dbff4b"
  }); 
  goGoback.addEventListener ("mouseout", function(){
        goGoback.style.backgroundColor = "gray"
  });

  var goGobackTexto = document.querySelector("div.textoBack")
  goGobackTexto.addEventListener ("mouseover", function(){
      goGobackTexto.style.color = "#dbff4b"
  });
  goGobackTexto.addEventListener ("mouseout", function(){
      goGobackTexto.style.color = "gray"
  });
  
  document.querySelector("button.save").addEventListener("click", function() {
    let arrayDeCancionesFavoritas;
    
    // Me fijo si hay cosas en storage
    if (localStorage.getItem("cancionesPreferidos") != null) {
        //arrayDeGifsFavoritos y le voy a agregar el código el GIF
        arrayDeCancionesFavoritas = localStorage.getItem("cancionesPreferidos").split(",")
        arrayDeCancionesFavoritas.push(previewArtista)
    } else {
        //TENGO QUE CREAR UN ARRAY NUEVO CON EL CODIGO DEL GIF
        arrayDeCancionesFavoritas = []
        arrayDeCancionesFavoritas.push(previewArtista)
    }
    
    localStorage.setItem("cancionesPreferidos", arrayDeCancionesFavoritas);
    console.log(localStorage)
})
  

  



})
 