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
           let nuevoHtmlAlbumSlideShow = "<li class='uk-transition-toggle' tabindex='0'>" + "<div class='container itemcontenedor'>" +  "<img class='imgSlideAlbum' src=" + coverAlbums +  "></img>" + "<button class='repro'><i class='fas fa-play'></i></button>"+ "<button class='save'><i class='fas fa-heart'></i></button>"+"<div class='uk-position-center uk-panel'>" + "<a class='nombreLink' href='../albums/albums.html'>" + " <h2 class='uk-transition-slide-bottom-small'>"+  tituloAlbums + "</h2>" + "</a>" + "</div>" + "</div>" + "</li>"
           document.querySelector("ul.listadoAlbums").innerHTML += nuevoHtmlAlbumSlideShow
        }
      
        let artistas = informacion.artists.data
         
        for (let index = 0; index < artistas.length; index++) {
          const cadaArtista = artistas[index];

            let imgArtista = cadaArtista.picture_medium 
            let nombreArtista = cadaArtista.name
            let nuevoHtmlArtistaSlideShow = "<li class='uk-transition-toggle' tabindex='0'>" + "<div class='container itemcontenedor imgArt'>" +  "<img class='imgSlide slide artistacontenedor' src=" + imgArtista +  "></img>" + "<button class='repro'><i class='fas fa-play'></i></button>"+ "<button class='save'><i class='fas fa-heart'></i></button>" +"<div class='uk-position-center uk-panel'>" + "<a class='nombreLink' href='../artistas/artistas.html'>"  + "<h2 class='uk-transition-slide-bottom-small'>"+  nombreArtista + "</h2>" + "</a>" + "</div>" + "</div>" + "</li>"
            document.querySelector("ul.listadoArtistas").innerHTML += nuevoHtmlArtistaSlideShow
        }

        let playlist = informacion.playlists.data
         
        for (let index = 0; index < playlist.length; index++) {
          const cadaPlaylist = playlist[index];

            let coverPlaylist = cadaPlaylist.picture_medium 
            let tituloPlaylist = cadaPlaylist.title
            let nuevoHtmlPlaylistSlideShow = "<li class='uk-transition-toggle' tabindex='0'>" + "<div class='container itemcontenedor'>"+"<a class='nombreLink' href='../playlist/playlist.html'>"  +  "<img class='imgSlide' src=" + coverPlaylist +  "></img>" + "</a>"+ "<button class='repro'><i class='fas fa-play'></i></button>"+ "<button class='save'><i class='fas fa-heart'></i></button>"+ "</div>" + "</li>"
            document.querySelector("ul.listadoPlaylist").innerHTML += nuevoHtmlPlaylistSlideShow
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


  
  




})
 