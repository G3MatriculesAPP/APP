$.ajax({
    method: "GET",
    // url: "http://localhost:5000/api/auth",                      // [DEBUG] - Para pruebas LOCALHOST
    url: "https://g3matriculesapp.herokuapp.com/api/auth",          // [DEBUG] - Para pruebas con HERKOU
    datatype: "json",
    headers: ({
      token : localStorage.getItem("TOKEN")
    }),
    success: function(result){
      console.log(result.message)
    },
    error: function(result){
      alert("No tienes acceso")
      window.location = 'index.html'   
    }
});


  (function($){
    $(function(){
  
    var options = { "swipeable": true };
    var el = document.getElementById('tabs');
    var instance = M.Tabs.init(el, options);
    
    $('.sidenav').sidenav();
   
    }); // end of document ready
  })(jQuery); // end of jQuery name space
   
  var dIncompletos = document.getElementById("dIncompletos");
  var dPorValidar = document.getElementById("dPorValidar");
  var dAceptados = document.getElementById("dAceptados");
  
  document.addEventListener('deviceready', onDeviceReady, false);
  
  var semaforo1 = document.getElementById("semaforo1");
  var semaforo2 = document.getElementById("semaforo2");
  
  function VRed(){    
    semaforo1.style.backgroundColor="#D50000";
    document.getElementById("tsemaforo").innerHTML = "Datos incompletos";
    semaforo2.style.backgroundColor="#D50000";
  
  }

  function VYellow(){
    semaforo1.style.backgroundColor="#EDB000";
    document.getElementById("tsemaforo").innerHTML = "Datos por verificar";
    semaforo2.style.backgroundColor="#EDB000";
  }

  function VGreen(){
    semaforo1.style.backgroundColor="green";
    document.getElementById("tsemaforo").innerHTML = "Datos aceptados";
    semaforo2.style.backgroundColor="green";

  }

  
  // carregar les dades necesaries per al perfil seleccionat
  function carregarPerfil(){

    var elem = document.getElementById("datosPersonales");
    var instance = M.FormSelect.getInstance(elem);
    
    console.log(instance.getSelectedValues());
    
  }


  function onDeviceReady() {
      // Cordova is now initialized. Have fun!
  
      console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
      document.getElementById("dIncompletos").onclick = VRed;
      document.getElementById("dPorValidar").onclick = VYellow;
      document.getElementById("dAceptados").onclick = VGreen;
      document.getElementById("cPerf").onclick = carregarPerfil;
      datosP();
      modulos();
      

      
  }
//  $("#curso1").append('<button class="accordion"><form action="#"><p><label class="black-text"> <input type="checkbox" /> <span>M01</span> </label> </p> </form> </button>')
  function modulos(){
    
    $("#acurso1").empty();
    $("#acurso2").empty();
   
}



function datosP(){
    
 
 
 $.ajax({
  method: "GET",
  // url: "http://localhost:5000/alum/login",               // [DEBUG] - Para pruebas LOCALHOST
  url: "https://g3matriculesapp.herokuapp.com/api/reqPerfils/readAll",  // [DEBUG] - Para pruebas con HERKOU
  datatype: "json",
  
  success: function(result){
    if(result){
     

      for(i=0; i<result.data.length;i++){
        console.log("hola "+ result.data.length);
        var perfil = JSON.stringify(result.data[i].nom);
        var codigos = JSON.stringify(result.data[i]._id);
        console.log('<option value='+codigos+'>'+perfil+'</option>');
        $("#datosPersonales").append('<option value="'+codigos+'">'+perfil+'</option>');
      }


      document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('select');
        var instances = M.FormSelect.init(elems, options);
      });
      
      // Or with jQuery
      
      $(document).ready(function(){
        $('select').formSelect();
      });
      
     
    }
    

  },
  error: function(result){
    alert('Usuario/Contraseña incorrecta...')
  }
});
}



//   Sistema de acordeon con botones
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}


