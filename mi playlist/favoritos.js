window.addEventListener('load', function(){

   let nombre = prompt ('Ingrese su nombre, por favor')
    document.querySelector('div.user ul li.nombre').innerHTML += "Canciones favoritas de" + " " + nombre

})