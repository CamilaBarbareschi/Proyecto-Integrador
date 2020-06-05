window.addEventListener('load', function(){

   let nombre = prompt ('Ingrese su nombre, por favor')

   if (nombre = nombre){
       document.querySelector('div.user ul li.nombre').innerHTML += "Canciones favoritas de" + " " + nombre
   } else {
       document.querySelector('div.user ul li.nombre').innerHTML += "Canciones favoritas"
   }


  
})