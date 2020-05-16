window.addEventListener ("load", function (){

    var boton = document.querySelector ("button.textoLink")
  
    boton.onclick = function change () {
    boton.addEventListener("click", function () {
      document.querySelector("section.rankings").style.display = "block";
    });
    boton.addEventListener("click", function () {
      document.querySelector("div.animacionWrapper").style.display = "none";
    });
    boton.addEventListener("click", function () {
      document.querySelector("div.btnback").style.display = "block";
    });
    boton.addEventListener("click", function () {
      document.querySelector("div.btnback").style.display = "grid";
    });
    boton.addEventListener("click", function () {
      document.querySelector("div.btnback").style.gridTemplateColumns = "auto auto";
    });
    }

    var goGoback = document.querySelector("div.circulo")
    
    goGoback.addEventListener ("mouseover", function(){
        document.querySelector("div.circulo").style.backgroundColor = "#dbff4b"
    })  
    goGoback.addEventListener ("mouseout", function(){
        document.querySelector("div.circulo").style.backgroundColor = "gray"
    })  

    var goGobackTexto = document.querySelector("div.textoBack")
    
    goGobackTexto.addEventListener ("mouseover", function(){
        document.querySelector("div.textoBack").style.color = "#dbff4b"
    })  
    goGobackTexto.addEventListener ("mouseout", function(){
        document.querySelector("div.textoBack").style.color = "gray"
    })  
 
})