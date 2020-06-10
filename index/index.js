window.addEventListener ("load", function (){
  

  let playlistFavoritas
  if (localStorage.getItem("playlistPreferidas") != null) {
      playlistFavoritas = localStorage.getItem("playlistPreferidas").split(",")
  } else {
      playlistFavoritas = []
  }

  let albumsFavoritos
  if (localStorage.getItem("albumsPreferidos") != null) {
      albumsFavoritos = localStorage.getItem("albumsPreferidos").split(",")
  } else {
      albumsFavoritos = []
  }

  let artistasFavoritos
  if (localStorage.getItem("artistasPreferidos") != null) {
      artistasFavoritos = localStorage.getItem("artistasPreferidos").split(",")
  } else {
      artistasFavoritos = []
  }

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

           let nuevoHtmlAlbumSlideShow 
              if(albumsFavoritos.includes("" + cadaAlbumId) == false ){
              
              nuevoHtmlAlbumSlideShow =
                  "<li class='uk-transition-toggle' tabindex='0'>"+ 
                  "<div class='container itemcontenedor'>" +  
                  "<img class='imgSlideAlbum' src=" + coverAlbums + 
                  "></img>" + "<button class='repro'  id-album='" + cadaAlbumId + "'><i class='fas fa-play'></i></button>"+ 
                  "<button class='albumSave' id-album='" + cadaAlbumId + "'><i class='fas fa-heart'></i></button>"+
                  "<div class='uk-position-center uk-panel'>" + 
                  "<a class='nombreLink' href='../albums/albums.html?idAlbum ='" + cadaAlbumId + "'>" + 
                  "<h2 class='uk-transition-slide-bottom-small'>"+  tituloAlbums + 
                  "</h2>" + "</a>" + "</div>" + "</div>" + "</li>"
           }else{
              nuevoHtmlAlbumSlideShow =
                  "<li class='uk-transition-toggle' tabindex='0'>"+ 
                  "<div class='container itemcontenedor'>" +  
                  "<img class='imgSlideAlbum' src=" + coverAlbums + 
                  "></img>" + "<button class='repro'  id-album='" + cadaAlbumId+ "'><i class='fas fa-play'></i></button>"+ 
                  "<button class='albumSave' id-album='" + cadaAlbumId + "'><i class='fas fa-heart' id='pintadito' ></i></button>"+
                  "<div class='uk-position-center uk-panel'>" + 
                  "<a class='nombreLink' href='../albums/albums.html?id-album ='" + cadaAlbumId + "'>" + 
                  "<h2 class='uk-transition-slide-bottom-small'>"+  tituloAlbums + 
                  "</h2>" + "</a>" + "</div>" + "</div>" + "</li>"
            }
           
           document.querySelector("ul.listadoAlbums").innerHTML += nuevoHtmlAlbumSlideShow
        }
        var buttonRepro = document.querySelectorAll("button.repro")
        for (let i = 0; i < buttonRepro.length; i++) {
          buttonRepro[i].onclick = function (){
            document.querySelector("nav.miniPlayer").innerHTML = '<iframe scrolling="no" frameborder="0" allowTransparency="true" src="https://www.deezer.com/plugins/player?format=clasic&autoplay=true&playlist=false&width=350&height=350&color=de00ff&layout=light&size=small&type=album&id=' + this.getAttribute("id-album") +'&app_id=1" width="350" height="350"></iframe>'
          }
        }

        var albumButtonSave = document.querySelectorAll("button.albumSave")
        for (let i = 0; i < albumButtonSave.length; i++) {
            albumButtonSave[i].addEventListener ('click', function(){

                if (albumsFavoritos.includes(this.getAttribute("id-album")) == false ) {
                   
                    albumsFavoritos.push(this.getAttribute("id-album"));

                    localStorage.setItem("albumsPreferidos", albumsFavoritos);
                    
                    alert("Álbum guardado en favoritos :)")
                } /*else para remover album */
                   
            })
            
        }

        



        let artistas = informacion.artists.data
         
        for (let index = 0; index < artistas.length; index++) {
          const cadaArtista = artistas[index];

            let imgArtista = cadaArtista.picture_medium 
         
            let nombreArtista = cadaArtista.name
            let artistaId = cadaArtista.id
            
            let nuevoHtmlArtistaSlideShow 
            if(artistasFavoritos.includes("" + artistaId) == false ){
               nuevoHtmlArtistaSlideShow =
                  "<li class='uk-transition-toggle' tabindex='0'>" +
                  "<div class='container itemcontenedor imgArt'>" +  
                  "<img class='imgSlide slide artistacontenedor' src=" + imgArtista +  
                  "></img>" + "<button class='repro artista' id-artista='" + artistaId + "'><i class='fas fa-play'></i></button>"+ 
                  "<button class='save' id-artista='" +  artistaId + "'><i class='fas fa-heart'></i></button>" +
                  "<div class='uk-position-center uk-panel'>" + 
                  "<a class='nombreLink' href='../artistas/artistas.html?id-artista ='" + artistaId + "'>"  + 
                  "<h2 class='uk-transition-slide-bottom-small'>" +  nombreArtista + 
                  "</h2>" + "</a>" + "</div>" + "</div>" + "</li>"
            }else{
              nuevoHtmlArtistaSlideShow =
                  "<li class='uk-transition-toggle' tabindex='0'>" +
                  "<div class='container itemcontenedor imgArt'>" +  
                  "<img class='imgSlide slide artistacontenedor' src=" + imgArtista +  
                  "></img>" + "<button class='repro artista' id-artista='" + artistaId + "'><i class='fas fa-play'></i></button>"+ 
                  "<button class='save' id-artista='" +  artistaId + "'><i class='fas fa-heart' id='pintadito'></i></button>" +
                  "<div class='uk-position-center uk-panel'>" + 
                  "<a class='nombreLink' href='../artistas/artistas.html?id-artista ='" + artistaId + "'>"  + 
                  "<h2 class='uk-transition-slide-bottom-small'>" +  nombreArtista + 
                 "</h2>" + "</a>" + "</div>" + "</div>" + "</li>"             
            }
            document.querySelector("ul.listadoArtistas").innerHTML += nuevoHtmlArtistaSlideShow
        }
        
        var buttonReproArtista = document.querySelectorAll("button.artista")
        for (let i = 0; i< buttonReproArtista.length; i++) {
          buttonReproArtista[i].onclick = function(){
            document.querySelector("nav.miniPlayer").innerHTML = '<iframe scrolling="no" frameborder="0" allowTransparency="true" src="https://www.deezer.com/plugins/player?format=clasic&autoplay=true&playlist=false&width=350&height=350&color=de00ff&layout=light&size=small&type=artist&id=' + this.getAttribute("id-artista") +'&app_id=1" width="350" height="350"></iframe>'
          }
         
        }

        var artistaButtonSave = document.querySelectorAll("button.save")
           
        for (let i = 0; i <  artistaButtonSave.length; i++) {
            
            artistaButtonSave[i].addEventListener ('click', function(){

                if (artistasFavoritos.includes(this.getAttribute("id-artista")) == false ) {

                    artistasFavoritos.push(this.getAttribute("id-artista"))

                    localStorage.setItem("artistasPreferidos", artistasFavoritos)
                    
                    alert("Artista guardado en favoritos :)")
                } 
            })
            
        }


        let playlist = informacion.playlists.data
         
        for (let index = 0; index < playlist.length; index++) {
          
          const cadaPlaylist = playlist[index];

            let coverPlaylist = cadaPlaylist.picture_medium 
            let previewPlaylist = cadaPlaylist.id

            let nuevoHtmlPlaylistSlideShow
            if(playlistFavoritas.includes("" + previewPlaylist) == false ){
              nuevoHtmlPlaylistSlideShow = 
                  "<li class='uk-transition-toggle' tabindex='0'>" + 
                  "<div class='container itemcontenedor'>"+
                  "<a class='nombreLink' href='../playlist/playlist.html'>"  + 
                  "<img class='imgSlide' src=" + coverPlaylist +  "></img>" + 
                  "</a>"+ "<button class='repro playlist' id-playlist =' " + previewPlaylist + "'><i class='fas fa-play'></i></button>"+ 
                  "<button class='savePlaylist' id-playlist ='" + previewPlaylist + "'><i class='fas fa-heart'></i></button>"+ "</div>" + "</li>"
            }else{
              nuevoHtmlPlaylistSlideShow = 
                  "<li class='uk-transition-toggle' tabindex='0'>" + 
                  "<div class='container itemcontenedor'>"+
                  "<a class='nombreLink' href='../playlist/playlist.html'>"  + 
                  "<img class='imgSlide' src=" + coverPlaylist +  "></img>" + 
                  "</a>"+ "<button class='repro playlist' id-playlist =' " + previewPlaylist + "'><i class='fas fa-play'></i></button>"+ 
                  "<button class='savePlaylist' id-playlist ='" + previewPlaylist + "'><i class='fas fa-heart' id='pintadito'></i></button>"+ "</div>" + "</li>"
             }
              document.querySelector("ul.listadoPlaylist").innerHTML += nuevoHtmlPlaylistSlideShow
        }

        var buttonReproPlaylist = document.querySelectorAll("button.playlist")
        for (let i = 0; i < buttonReproPlaylist.length; i++) {
          buttonReproPlaylist[i].onclick = function (){
            document.querySelector("nav.miniPlayer").innerHTML = '<iframe scrolling="no" frameborder="0" allowTransparency="true" src="https://www.deezer.com/plugins/player?format=classic&autoplay=true&playlist=false&width=350&height=350&color=de00ff&layout=light&size=medium&type=playlist&id=' + this.getAttribute("id-playlist") +'&app_id=1" width="350" height="350"></iframe>'
          }
        }
        
        var playlistButtonSave = document.querySelectorAll("button.savePlaylist")
        for (let i = 0; i <  playlistButtonSave.length; i++) {
          playlistButtonSave[i].addEventListener ('click', function(){
                if (playlistFavoritas.includes(this.getAttribute("id-playlist")) == false ) {
                    playlistFavoritas.push(this.getAttribute("id-playlist"))
                    localStorage.setItem("playlistPreferidas", playlistFavoritas) 
                    alert("Playlist guardado en favoritos :)")
                } 
            })
            
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
 