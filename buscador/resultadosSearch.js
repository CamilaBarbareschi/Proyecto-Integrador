window.addEventListener("load", function() {
    let queryString = new URLSearchParams(location.search)

    let resultadosBusqueda = queryString.get("search");
    
    fetch("https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=" + resultadosBusqueda)
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
        
            for (let index = 0; index < 10; index++) {
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
                let cancionNuevoHTML = 
                "<article class='canciones'>"+ 
                "<div><button class='songRepro' id-song='"+ cancionID + "'><i class='fas fa-play'></i></button></div>" +
                "<div  class='cancionName'>" + cancionTitulo + "</div>" +
                "<div class='cancionTime'>" + cancionTimeInMinute +':'+ cancionTimeInSeconds + "</div>" + 
                "<div><button><i class='fas fa-heart'></i></button></div>" +
                "</article>"

                document.querySelector("div.resultadoCancionesContainer").innerHTML += cancionNuevoHTML

            }
            var cancionButtonRepro = document.querySelectorAll("button.songRepro")
                for (let i = 0; i < cancionButtonRepro.length; i++) {
                    cancionButtonRepro[i].onclick = function (){
                     document.querySelector("nav.miniPlayer").innerHTML = '<iframe scrolling="no" frameborder="0" allowTransparency="true" src="https://www.deezer.com/plugins/player?format=clasic&autoplay=true&playlist=false&width=350&height=350&color=de00ff&layout=light&size=small&type=tracks&id=' + this.getAttribute("id-song") +'&app_id=1" width="350" height="350"></iframe>'
                    }
                }
            
            for (let index = 0; index < 10; index++) {
                const cadaAlbum = resultadoBusquedaDeezer[index];
                    
                let albumTitulo = cadaAlbum.album.title
                let albumID = cadaAlbum.album.id
                let albumCover = cadaAlbum.album.cover_medium
                let albumNuevoHTML = 
                "<li><div class='uk-card uk-card-small uk-card-default'>" +
                "<div class='uk-card-media-top'>" +
                "<img src='"+ albumCover +"'></div>" +
                "<div class='uk-card-body'>" +
                "<a href='../albums/albums.html'><h3 class='uk-card-title'>"+ albumTitulo + "</h3></a>" +
                "<button class='repro' id-album='" + albumID + "'><i class='fas fa-play'></i></button>" +
                "<button class='save'><i class='fas fa-heart'></i></button>" +
                "</div></div></li>"
    
                document.querySelector("ul.resultadoAlbum").innerHTML += albumNuevoHTML
    
            }
            var buttonRepro = document.querySelectorAll("button.repro")
            for (let i = 0; i < buttonRepro.length; i++) {
              buttonRepro[i].onclick = function (){
                document.querySelector("nav.miniPlayer").innerHTML = '<iframe scrolling="no" frameborder="0" allowTransparency="true" src="https://www.deezer.com/plugins/player?format=clasic&autoplay=true&playlist=false&width=350&height=350&color=de00ff&layout=light&size=small&type=album&id=' + this.getAttribute("id-album") +'&app_id=1" width="350" height="350"></iframe>'
              }
            }
            
            for (let index = 0; index < 10; index++) {
                const cadaArtista = resultadoBusquedaDeezer[index];
                    
                let artistaName = cadaArtista.artist.name
                let artistaId = cadaArtista.artist.id
                let artistaImg = cadaArtista.artist.picture_medium
                let artistaNuevoHTML = 
               "<li>" + "<div class='uk-card uk-card-small uk-card-default'>" +
               "<div class='uk-card-media-top'>" + "<img class='artistasim' src='"+ artistaImg + "'>" +
               "</div> <div class='uk-card-body'>"+
               "<a href='../artistas/artistas.html'><h3 class='uk-card-title'>" + artistaName + "</h3></a>"+
               "<button class='repro' id-artista='"+ artistaId + "'><i class='fas fa-play'></i></button>" +
               "<button class='save'><i class='fas fa-heart'></i></button>" +    
               "</div></div></li>"
    
                document.querySelector("ul.resultadoArtista").innerHTML += artistaNuevoHTML
    
            }
            var buttonReproArtista = document.querySelectorAll("button.repro")
            for (let i = 0; i < buttonReproArtista.length; i++) {
              buttonReproArtista[i].onclick = function (){
                document.querySelector("nav.miniPlayer").innerHTML = '<iframe scrolling="no" frameborder="0" allowTransparency="true" src="https://www.deezer.com/plugins/player?format=clasic&autoplay=true&playlist=false&width=350&height=350&color=de00ff&layout=light&size=small&type=artist&id=' + this.getAttribute("id-artista") +'&app_id=1" width="350" height="350"></iframe>'
              }
            }
            
        }
            
            
        
    )

})
