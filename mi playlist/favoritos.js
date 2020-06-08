window.addEventListener('load', function(){

   let nombre = prompt ('Ingrese su nombre, por favor')

   if (nombre = nombre){
       document.querySelector('div.user ul li.nombre').innerHTML += "Canciones favoritas de" + " " + nombre
   } else {
       document.querySelector('div.user ul li.nombre').innerHTML += "Canciones favoritas"
   }

   
    if(localStorage.getItem("cancionesPreferidas") != null) {

    let cancionesFavoritas = localStorage.getItem("cancionesPreferidas").split(",")

    // Paso 3: Recorremos el array de favoritos
    for (let i = 0; i < cancionesFavoritas.length; i++) {

        // Paso 4: Traigo de Giphy el detalle del gif
        fetch("https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/"+ cancionesFavoritas[i] )
        .then(
            function(respuesta) {
                return respuesta.json();            
            }
            
        )
      
        .then(
            function(resultado) {
                // Acá es donde vamos a trabajar
                console.log(resultado)
                
            }
        )

    }

} else {    
    alert("Ey! No hay favs!")
}
  
})