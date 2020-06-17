window.addEventListener ("load",function () {
    let queryString = new URLSearchParams (location.search);
   let codigoGeneros = queryString.get ("id-generos")
   

   fetch ("https://cors-anywhere.herokuapp.com/https://api.deezer.com/genre/"+ codigoGeneros)
   .then (
       function (respuesta) {
           return respuesta.json();
       }
   )
   .then (
       function (resultado) {
           console.log(resultado);

           let nombreGenero = resultado.name;
           let imagenGenero = resultado.picture_medium;
           let HTMLdeGenero =
           `
           <article>
           <h1>`+ nombreGenero +`</h1>
           <img src="`+ imagenGenero +`" alt="">
           </article>
           `
           document.querySelector ("main").innerHTML = HTMLdeGenero
       }
   )
})