window.addEventListener ("load", function (){

    var boton = document.querySelector ("button.textoLink")
  
    boton.onclick = function change () {
    boton.addEventListener("click", function () {
      document.querySelector("section.rankings").style.display = "block";
      document.querySelector("div.animacionWrapper").style.display = "none";
      document.querySelector("div.btnback").style.display = "block";
      document.querySelector("div.btnback").style.display = "grid";
      document.querySelector("div.btnback").style.gridTemplateColumns = "auto auto";
    });
    }

    var goGoback = document.querySelector("div.circulo")
    
    goGoback.addEventListener ("mouseover", function(){
      goGoback.style.backgroundColor = "#dbff4b"
    })  
    goGoback.addEventListener ("mouseout", function(){
        goGoback.style.backgroundColor = "gray"
    })  

    var goGobackTexto = document.querySelector("div.textoBack")
    
    goGobackTexto.addEventListener ("mouseover", function(){
      goGobackTexto.style.color = "#dbff4b"
    })  
    goGobackTexto.addEventListener ("mouseout", function(){
      goGobackTexto.style.color = "gray"
    })  

   
})