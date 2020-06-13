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

    let artistasFavoritos
    if (localStorage.getItem("artistasPreferidos") != null) {
        artistasFavoritos = localStorage.getItem("artistasPreferidos").split(",")
    } else {
        artistasFavoritos = []
    }

    
    /*Resultados de busqueda*/
    let queryString = new URLSearchParams(location.search)

    let resultadosBusqueda = queryString.get("search");
    
    /*Resultados de busqueda - API de tracks*/
    fetch("https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/track?q=" + resultadosBusqueda)
    .then(
        function(respuesta) {
            return respuesta.json();            
        }
    )
    .then(
        function(informacion) {
            let resultadoBusquedaDeezer = informacion.data;

            if (resultadoBusquedaDeezer.length == 0) {
                document.querySelector("div.sinResultados").style.display = "block"
                document.querySelector("main.resultadosDeBusqueda").style.display = "none"
            } 
            
            for (let index = 0; index < 8; index++) {
                const cadaCancion = resultadoBusquedaDeezer[index];
                
                let cancionTitulo = cadaCancion.title
                let cancionID = cadaCancion.id

                let cancionTime = cadaCancion.duration
                let cancionTimeInMinute = cancionTime/60
                cancionTimeInMinute = Math.floor(cancionTimeInMinute)
                let cancionTimeInSeconds = cancionTime %60

                if(cancionTimeInSeconds<10){
                    cancionTimeInSeconds = '0' + cancionTimeInSeconds
                }

                let  cancionNuevoHTML 
                if(cancionesFavoritas.includes("" + cancionID) == false ){

                     cancionNuevoHTML = 
                "<article class='canciones'>"+ 
                "<div><button class='songRepro' id-song='"+ cancionID + "'><i class='fas fa-play'></i></button></div>" +
                "<div  class='cancionName'>" + cancionTitulo + "</div>" +
                "<div class='cancionTime'>" + cancionTimeInMinute +':'+ cancionTimeInSeconds + "</div>" + 
                "<div><button class='saveSong' id-song='" + cancionID + "'><i class='fas fa-heart' id='porPintar'></i></button></div>" +
                "</article>"
               
                } else{
                     cancionNuevoHTML = 
                "<article class='canciones'>"+ 
                "<div><button class='songRepro' id-song='"+ cancionID + "'><i class='fas fa-play'></i></button></div>" +
                "<div  class='cancionName'>" + cancionTitulo + "</div>" +
                "<div class='cancionTime'>" + cancionTimeInMinute +':'+ cancionTimeInSeconds + "</div>" + 
                "<div><button class='saveSong' id-song='" + cancionID + "'><i class='fas fa-heart' id='pintadito'></i></button></div>" +
                "</article>"

                }
                
                document.querySelector("div.resultadoCancionesContainer").innerHTML += cancionNuevoHTML

            }

            var cancionButtonRepro = document.querySelectorAll("button.songRepro")
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
    

     /*Resultados de busqueda - API de Albums*/
    fetch("https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/album?q=" + resultadosBusqueda)
        .then(
            function(respuesta) {
                return respuesta.json();            
            }
        )
        .then(
            function(informacionAlbum) {
                let resultadoBusquedaAlbum = informacionAlbum.data;
                
                if (resultadoBusquedaAlbum.length != 0) {
                    
                    for (let index = 0; index < resultadoBusquedaAlbum.length; index++) {
                        const cadaAlbum = resultadoBusquedaAlbum[index];
                    
                        let albumTitulo = cadaAlbum.title
                        let albumID = cadaAlbum.id
                        let albumCover = cadaAlbum.cover_medium

                        let  albumNuevoHTML 
                        if(albumsFavoritos.includes(""+ albumID) == false ){
                           
                                albumNuevoHTML = 
                             "<li><div class='uk-card uk-card-small uk-card-default'>" +
                             "<div class='uk-card-media-top'>" +
                             "<img src='"+ albumCover +"'></div>" +
                             "<div class='uk-card-body'>" +
                             "<a href='../albums/albums.html?albumID=" + albumID + "'><h3 class='uk-card-title'>"+ albumTitulo + "</h3></a>" +
                             "<button class='repro' id-album='" + albumID + "'><i class='fas fa-play'></i></button>" +
                             "<button class='saveAlbum' id-album='" + albumID + "'><i class='fas fa-heart'></i></button>" +
                             "</div></div></li>"

                        } else{

                                albumNuevoHTML = 
                             "<li><div class='uk-card uk-card-small uk-card-default'>" +
                             "<div class='uk-card-media-top'>" +
                             "<img src='"+ albumCover +"'></div>" +
                             "<div class='uk-card-body'>" +
                             "<a href='../albums/albums.html?albumID=" + albumID + "'><h3 class='uk-card-title'>"+ albumTitulo + "</h3></a>" +
                             "<button class='repro' id-album='" + albumID + "'><i class='fas fa-play'></i></button>" +
                             "<button class='saveAlbum' id-album='" + albumID + "'><i class='fas fa-heart' id='pintadito'></i></button>" +
                             "</div></div></li>"
                             
                        }
                        document.querySelector("ul.resultadoAlbum").innerHTML += albumNuevoHTML
                    }
                }else{
                    document.querySelector("ul.resultadoAlbum").style.display = "none"
                    document.querySelector("div.albums").style.display = "none"
                    
                }
                  var buttonRepro = document.querySelectorAll("button.repro")
                  for (let i = 0; i < buttonRepro.length; i++) {
                        buttonRepro[i].onclick = function (){
                             document.querySelector("nav.miniPlayer").innerHTML = '<iframe scrolling="no" frameborder="0" allowTransparency="true" src="https://www.deezer.com/plugins/player?format=clasic&autoplay=true&playlist=false&width=350&height=350&color=de00ff&layout=light&size=small&type=album&id=' + this.getAttribute("id-album") +'&app_id=1" width="350" height="350"></iframe>'
                        }
                    }   

                  var albumButtonSave = document.querySelectorAll("button.saveAlbum")

                    for (let i = 0; i < albumButtonSave.length; i++) {
                        
                        albumButtonSave[i].addEventListener ('click', function(){
    
                            if (albumsFavoritos.includes(this.getAttribute("id-album")) == false ) {
                               
                                albumsFavoritos.push(this.getAttribute("id-album"));

                                localStorage.setItem("albumsPreferidos", albumsFavoritos);
                                
                                UIkit.notification({message: '<span uk-icon=\'icon: heart\'></span> Album guardado en favoritos ', status: 'danger'})
                            } 
                               
                        })
                        
                    }
            }
        )
    
    /*Resultados de busqueda - API de Artistas*/
    fetch("https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/artist?q=" + resultadosBusqueda)
        .then(
            function(respuesta) {
                return respuesta.json();            
            }
        )
        
        .then(
            function(informacion) {       
                let resultadoBusquedaArtista = informacion.data;
               
                if (resultadoBusquedaArtista.length != 0) {
                     for (let index = 0; index < 10; index++) {
                              const cadaArtista = resultadoBusquedaArtista[index];
                    
                               let artistaName = cadaArtista.name
                               let artistaId = cadaArtista.id
                               let artistaImg = cadaArtista.picture_medium

                               let  artistaNuevoHTML
                                 if(artistasFavoritos.includes("" + artistaId) == false ){

                                    artistaNuevoHTML = 
                                       "<li>" + "<div class='uk-card uk-card-small uk-card-default'>" +
                                       "<div class='uk-card-media-top'>" + "<img class='artistasim' src='"+ artistaImg + "'>" +
                                       "</div> <div class='uk-card-body'>"+
                                       "<a href='../artistas/artistas.html?id-artista="+ artistaId +"'><h3 class='uk-card-title'>" + artistaName + "</h3></a>"+
                                       "<button class='reproArtista' id-artista='"+ artistaId + "'><i class='fas fa-play'></i></button>" +
                                       "<button class='saveArtista' id-artista='"+ artistaId + "'><i class='fas fa-heart'></i></button>" +    
                                       "</div></div></li>"
                                } else{
                                    artistaNuevoHTML = 
                                       "<li>" + "<div class='uk-card uk-card-small uk-card-default'>" +
                                       "<div class='uk-card-media-top'>" + "<img class='artistasim' src='"+ artistaImg + "'>" +
                                       "</div> <div class='uk-card-body'>"+
                                       "<a href='../artistas/artistas.html?id-artista="+ artistaId +"'><h3 class='uk-card-title'>" + artistaName + "</h3></a>"+
                                       "<button class='reproArtista' id-artista='"+ artistaId + "'><i class='fas fa-play'></i></button>" +
                                       "<button class='saveArtista' id-artista='"+ artistaId + "'><i class='fas fa-heart' id='pintadito'></i></button>" +    
                                       "</div></div></li>"

                                }
                                document.querySelector("ul.resultadoArtista").innerHTML += artistaNuevoHTML
                            }
                } else{
                    document.querySelector("ul.resultadoArtista").style.display = "none"
                    document.querySelector("div.artista").style.display = "none"      
                }

            var buttonReproArtista = document.querySelectorAll("button.reproArtista")
            for (let i = 0; i < buttonReproArtista.length; i++) {
              buttonReproArtista[i].onclick = function (){
                document.querySelector("nav.miniPlayer").innerHTML = '<iframe scrolling="no" frameborder="0" allowTransparency="true" src="https://www.deezer.com/plugins/player?format=clasic&autoplay=true&playlist=false&width=350&height=350&color=de00ff&layout=light&size=small&type=artist&id=' + this.getAttribute("id-artista") +'&app_id=1" width="350" height="350"></iframe>'
              }
            }
           
            var artistaButtonSave = document.querySelectorAll("button.saveArtista")
           
            for (let i = 0; i <  artistaButtonSave.length; i++) {
                
                artistaButtonSave[i].addEventListener ('click', function(){

                    if (artistasFavoritos.includes(this.getAttribute("id-artista")) == false ) {

                        artistasFavoritos.push(this.getAttribute("id-artista"))

                        localStorage.setItem("artistasPreferidos", artistasFavoritos)
                        
                        UIkit.notification({message: '<span uk-icon=\'icon: heart\'></span> Artista guardado en favoritos ', status: 'danger'})
                    } 
                    
                    
        
                    
                })
                
            }
        }        
       
            
            
        
            
            
        
    )

})
