window.addEventListener('load', function(){

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

    let artistasFavoritos
    if (localStorage.getItem("artistasPreferidos") != null) {
        artistasFavoritos = localStorage.getItem("artistasPreferidos").split(",")
    } else {
        artistasFavoritos = []
    }
    let playlistFavoritas
    if (localStorage.getItem("playlistPreferidas") != null) {
        playlistFavoritas = localStorage.getItem("playlistPreferidas").split(",")
    } else {
        playlistFavoritas = []
    }

        /*ARTIST*/
        if(localStorage.getItem("artistasPreferidos") != null) {
            let artistasPreferidos = localStorage.getItem("artistasPreferidos").split(",")
                for (let i = 0; i < artistasPreferidos.length; i++) {
                    fetch ("https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/" + artistasPreferidos[i])
                    .then(
                        function(respuesta) {
                            return respuesta.json();            
                        }
                    )
                    .then(
                        function(resultado) {
                                  let artist = resultado
                                  let artistName = artist.name
                                  let artistId = artist.id
                                  let artistImg = artist.picture_medium

                                  let newHtmlArtist =
                                  '<div class="artistaContainer"><div class="imgContenedor"><a href="../artistas/artistas.html?id-artista='+ artistId + '"><img src="'+ artistImg +'" alt="' + artistName + '"></a></div>' +
                                  '<div class="itemContainer"><h3 class="nombreArtista"><a href="../artistas/artistas.html?id-artista='+ artistId + '">'+ artistName+'</a></h3>' +
                                  '<button class="reproArtista" id-artista="'+ artistId + '"><i class="fas fa-play"></i></button>' +
                                  '<button class="unSaveArtist" id-artista="'+ artistId + '"><i class="fas fa-heart" id="pintadito"></i></button></div></div>' 
                                  
                                  document.querySelector(".artist").innerHTML += newHtmlArtist
                        
                        var buttonReproArtista = document.querySelectorAll("button.reproArtista")
                        for (let i = 0; i < buttonReproArtista.length; i++) {
                            buttonReproArtista[i].onclick = function (){
                                    document.querySelector("nav.miniPlayer").innerHTML = '<iframe scrolling="no" frameborder="0" allowTransparency="true" src="https://www.deezer.com/plugins/player?format=clasic&autoplay=true&playlist=false&width=350&height=350&color=de00ff&layout=light&size=small&type=artist&id=' + this.getAttribute("id-artista") +'&app_id=1" width="350" height="350"></iframe>'
                            }
                        } 

                    
                        var buttonElimnarArtista = document.querySelectorAll(".unSaveArtist")
                        for (let index = 0; index <  buttonElimnarArtista.length; index++) {
                            buttonElimnarArtista[index].addEventListener('click', function (){
                              let removeConfirm = confirm('Deseas eliminar el artista de favoritos?')
                                if (removeConfirm == true) {
                                  let remove = artistasFavoritos.indexOf (this.getAttribute("id-artista"))
                                  artistasFavoritos.splice (remove, 1)
                                  localStorage.setItem("artistasPreferidos", artistasFavoritos)
                                }
                            })
                           
                        }

                    })
               
                }
        } else{
            document.querySelector("li.artistaSelector").onclick = function(){
                UIkit.notification({message: 'No tienes artistas guardados en favoritos', pos: 'top-center'})
            }
        }
           

        /*TRACKS*/
        if (localStorage.getItem("cancionesPreferidas") != null) {
            let cancionesPreferidas = localStorage.getItem("cancionesPreferidas").split(",")
                for (let i = 0; i < cancionesPreferidas.length; i++) {
                    fetch ("https://cors-anywhere.herokuapp.com/https://api.deezer.com/track/" + cancionesPreferidas[i])
                    .then(
                        function(respuesta) {
                            return respuesta.json();            
                        }
                    )
                    .then(
                        function(resultado) {
                                  let track = resultado
                                  let trackId = track.id
                                  let trackAlbum = track.album.title
                                  let trackAlbumID = track.album.id
                                  let trackArtist = track.artist.name
                                  let trackArtistID = track.artist.id
                                  let trackTitle = track.title
                                  let trackTime = track.duration
                                 
                                  let trackTimeInMinute = trackTime/60
                                  trackTimeInMinute = Math.floor(trackTimeInMinute)
                                  let trackTimeInSeconds = trackTime %60
                  
                                  if(trackTimeInSeconds<10){
                                     trackTimeInSeconds= '0' + trackTimeInSeconds
                                  }

                                  let newHtmlTrack =
                                    "<article class='canciones'" +
                                    "<div class='reproducir'><button class='songRepro' id-song='"+ trackId + "'><i class='fas fa-play'></i></button></div>"+
                                    "<div  class='cancionName'>" + trackTitle + "</div>" +
                                    "<div class='artistaCancion'><a href='../artistas/artistas.html?id-artista="+ trackArtistID + "'>" +  trackArtist + "</a></div>" +
                                    "<div class='albumCancion'><a href='../albums/albums.html?id-album=" + trackAlbumID + "'>" + trackAlbum + "</a></div>" +
                                    "<div class='cancionTime'>" + trackTimeInMinute + ":" + trackTimeInSeconds + "</div>" +
                                    "<div><button class='saveSong' id-track='"+ trackId +"'><i class='fas fa-heart' id='pintadito'></i></button></div>" +
                                    "</article>"
                                  document.querySelector(".cancionesContainer").innerHTML += newHtmlTrack 
        
                                var buttonReproSong = document.querySelectorAll("button.songRepro")
                                for (let i = 0; i < buttonReproSong.length; i++) {
                                    buttonReproSong[i].onclick = function (){
                                         document.querySelector("nav.miniPlayer").innerHTML = '<iframe scrolling="no" frameborder="0" allowTransparency="true" src="https://www.deezer.com/plugins/player?format=clasic&autoplay=true&playlist=false&width=350&height=350&color=de00ff&layout=light&size=small&type=tracks&id=' + this.getAttribute("id-song") +'&app_id=1" width="350" height="350"></iframe>'
                                    }
                                }   
                                var buttonElimnarCancion = document.querySelectorAll(".saveSong")
                                    for (let index = 0; index <  buttonElimnarCancion.length; index++) {
                                        buttonElimnarCancion[index].addEventListener('click', function (){
                                           let removeConfirm = confirm('Deseas eliminar la canción de favoritos?')
                                                if (removeConfirm == true) {
                                                     let remove = cancionesFavoritas.indexOf (this.getAttribute("id-track"))
                                                         cancionesFavoritas.splice (remove, 1)
                                                         localStorage.setItem("cancionesPreferidas", cancionesFavoritas)
                                                }
                                         })
                            
                                    }  
                        }
                    ) 
                   
                }
        } else{
                UIkit.notification({message: 'No tienes canciones guardadas en favoritos', pos: 'top-center'})
        }
           
        
        /*ALBUM*/
        if(localStorage.getItem("albumsPreferidos") != null) {
            let albumsFavoritos = localStorage.getItem("albumsPreferidos").split(",")
                for (let i = 0; i < albumsFavoritos.length; i++) {
                    fetch ("https://cors-anywhere.herokuapp.com/https://api.deezer.com/album/" +  albumsFavoritos[i])
                    .then(
                        function(respuesta) {
                            return respuesta.json();            
                        }
                    )
                    .then(
                        function(resultado) {
                            let album = resultado
                            let albumName = album.title
                            let albumId = album.id
                            let albumImg = album.cover_medium

                          
                           let newHtmlAlbum =
                            '<div class="albumContainer"><div class="imgContenedor"><a href="../albums/albums.html?id-album='+ albumId + '"><img src="'+ albumImg +'" alt="' + albumName + '"></a></div>' +
                            '<div class="itemContainer"><h3 class="nombreAlbum"><a href="../albums/albums.html?id-album='+ albumId + '">'+ albumName+'</a></h3>' +
                            '<button class="reproAlbum" id-album="'+ albumId + '"><i class="fas fa-play"></i></button>' +
                            '<button class="unSaveAlbum" id-album="'+ albumId + '"><i class="fas fa-heart" id="pintadito"></i></button></div>' + '</div>' 
                            
                            document.querySelector("article.album").innerHTML += newHtmlAlbum
                         
                            var buttonReproAlbum = document.querySelectorAll("button.reproAlbum")
                                for (let i = 0; i < buttonReproAlbum.length; i++) {
                                    buttonReproAlbum[i].onclick = function (){
                                         document.querySelector("nav.miniPlayer").innerHTML = '<iframe scrolling="no" frameborder="0" allowTransparency="true" src="https://www.deezer.com/plugins/player?format=clasic&autoplay=true&playlist=false&width=350&height=350&color=de00ff&layout=light&size=small&type=album&id=' + this.getAttribute("id-album") +'&app_id=1" width="350" height="350"></iframe>'
                                    }
                                }   
                                var buttonEliminarAlbum = document.querySelectorAll(".unSaveAlbum")
                                for (let index = 0; index < buttonEliminarAlbum.length; index++) {
                                    buttonEliminarAlbum[index].addEventListener('click', function (){
                                       let removeConfirm = confirm('Deseas eliminar el album de favoritos?')
                                            if (removeConfirm == true) {
                                                 let remove = albumsFavoritos.indexOf (this.getAttribute("id-album"))
                                                     albumsFavoritos.splice (remove, 1)
                                                     localStorage.setItem("albumsPreferidos", albumsFavoritos)
                                            }
                                     })
                        
                                }        
                        }
                    )
                            
                }
        } else{
            document.querySelector("li.albumSelector").onclick = function(){
                UIkit.notification({message: 'No tienes albums guardados en favoritos', pos: 'top-center'})
            }
        }

        /*PLAYLIST*/
        if(localStorage.getItem("playlistPreferidas") != null) {
            let playlistFavoritas = localStorage.getItem("playlistPreferidas").split(",")
                for (let i = 0; i < playlistFavoritas.length; i++) {
                    fetch ("https://cors-anywhere.herokuapp.com/https://api.deezer.com/playlist/" +  playlistFavoritas[i])
                    .then(
                        function(respuesta) {
                            return respuesta.json();            
                        }
                    )
                    .then(
                        function(resultado) {
                            let  playlist = resultado
                            let  playlistName =  playlist.title
                            let  playlistId =  playlist.id
                            let  playlistImg =  playlist.picture_medium
                          
                           let newHtmlPlaylist =
                            '<div class="playlistContainer"><div class="imgContenedor"><a href="../playlist/playlist.html?id-playlist='+  playlistId + '"><img src="'+  playlistImg +'" alt="' +  playlistName + '"></a></div>' +
                            '<div class="itemContainer"><h3 class="nombrePlaylist"><a href="../playlist/playlist.html?id-playlist='+  playlistId + '">'+  playlistName+'</a></h3>' +
                            '<button class="reproPlaylist" id-playlist="'+  playlistId + '"><i class="fas fa-play"></i></button>' +
                            '<button class="unSavePlaylist" id-playlist="'+  playlistId + '"><i class="fas fa-heart" id="pintadito"></i></button></div></div>' 
                            
                            document.querySelector("article.playlist").innerHTML += newHtmlPlaylist
                             
                            var buttonReproPlaylist = document.querySelectorAll("button.reproPlaylist")
                                for (let i = 0; i < buttonReproPlaylist.length; i++) {
                                    buttonReproPlaylist[i].onclick = function (){
                                         document.querySelector("nav.miniPlayer").innerHTML = '<iframe scrolling="no" frameborder="0" allowTransparency="true" src="https://www.deezer.com/plugins/player?format=classic&autoplay=true&playlist=false&width=350&height=350&color=de00ff&layout=light&size=medium&type=playlist&id=' + this.getAttribute("id-playlist") +'&app_id=1" width="350" height="350"></iframe>'
                                    }
                                }     
                            
                            var buttonEliminarPlaylist = document.querySelectorAll(".unSavePlaylist")
                            for (let index = 0; index < buttonEliminarPlaylist.length; index++) {
                                buttonEliminarPlaylist[index].addEventListener('click', function (){
                                       let removeConfirm = confirm('Deseas eliminar la playlist de favoritos?')
                                            if (removeConfirm == true) {
                                                 let remove = playlistFavoritas.indexOf (this.getAttribute("id-playlist"))
                                                     playlistFavoritas.splice (remove, 1)
                                                     localStorage.setItem("playlistPreferidas", playlistFavoritas)
                                            }
                                        
                                     })
                        
                            }    
                        }
                    )
                }
        }else{
            document.querySelector("li.playlistSelector").onclick = function(){
                UIkit.notification({message: 'No tienes playlists guardadas en favoritos', pos: 'top-center'})
            }
        }
})