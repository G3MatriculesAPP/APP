var totalReq=0;
var copyResult;
var arrayUF=[];
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

  
  
  function subirFicheros(){
    var comprobar =true;
    for(i=0; i<totalReq; i++ ){
      if ($("#file"+i).val().length === 0){
        comprobar =false;
      }
    }
    if (comprobar){
      for(i=0; i<totalReq; i++ ){
        
        var dato_archivo = $("#file"+i).prop("files")[0];
        var form_data = new FormData();
        form_data.append("file", dato_archivo);
        
        $.ajax({
          method: "POST",
          // url: "http://localhost:5000/alum/login",               // [DEBUG] - Para pruebas LOCALHOST
          url: "https://g3matriculesapp.herokuapp.com/api/reqPerfils/uploadReq",  // [DEBUG] - Para pruebas con HERKOU
          datatype: "text",
          processData: false,
        
          data: form_data,
          success: function(result){
            alert(result);
          },
         
          error: function(result){
            alert('Error: '+ result)
          }
        });
      }
    }else {
      alert('Error: datos incompletos')
    }
  }


  function onDeviceReady() {
      // Cordova is now initialized. Have fun!
  
      console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
      document.getElementById("dIncompletos").onclick = VRed;
      document.getElementById("dPorValidar").onclick = VYellow;
      document.getElementById("dAceptados").onclick = VGreen;
      document.getElementById("cPerf").onclick = subirFicheros;
      document.getElementById("bGuardar").onclick = guardarUFs;
      obtenerCiclo();
      datosP();
      modulos();
      

      
  }
//  $("#curso1").append('<button class="accordion"><form action="#"><p><label class="black-text"> <input type="checkbox" /> <span>M01</span> </label> </p> </form> </button>')
  function modulos(){
    
    $("#acurso1").empty();
    $("#acurso2").empty();
   
}

// carregar les dades necesaries per al perfil seleccionat
$("#datosPersonales").change(function(){
  var selectedCountry = $(this).children("option:selected").val();
  //alert("You have selected the country - " + selectedCountry);
  
  var id = selectedCountry.split('"');
  console.log(id[1]);
  $.ajax({
    method: "POST",
    // url: "http://localhost:5000/alum/login",               // [DEBUG] - Para pruebas LOCALHOST
    url: "https://g3matriculesapp.herokuapp.com/api/reqPerfils/readOne",  // [DEBUG] - Para pruebas con HERKOU
    datatype: "json",
    data: ({
      id: id[1]
    }),
    success: function(result){
      if(result){
        $("#buttons").html("");
        totalReq = result.data.length;
        for(i=0; i<result.data.length;i++){
          if(result.data[i].tipusReq == 0){
            $("#buttons").append('<label for="file'+i+'">'+result.data[i].nomReq+'</label><input type="file" id="file'+i+'" name="fileImage'+i+'" accept="image/png, image/jpeg, image/jpg"><br/>');    
           
          }
          else if(result.data[i].tipusReq == 1){
            $("#buttons").append('<label for="file'+i+'">'+result.data[i].nomReq+'</label><input type="file" id="file'+i+'" name="fileDoc'+i+'" accept=".pdf"><br/>');    
           
          }
          else if(result.data[i].tipusReq == 2){
            $("#buttons").append('<label for="file'+i+'">'+result.data[i].nomReq+'</label><input type="text" id="file'+i+'" name="fileDoc'+i+'" ><br/>');    
           
          }
        }
        $("#cPerf").css("visibility","visible");
      }
    }

  })
})


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
        
        $('<option/>', { value : codigos}).text(perfil).appendTo('#datosPersonales');
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

function obtenerCiclo(){
  $.ajax({
    method: "POST",
    url: "https://g3matriculesapp.herokuapp.com/api/cicles/readOneByAlumne",  // [DEBUG] - Para pruebas con HERKOU
    datatype: "json",
    data: ({
      token: localStorage.getItem("TOKEN")
    }),
    success: function(result){
      
      copyResult = result;
      $("#nomCicle").text(result.data.nom);
      
      for(i=0; i<result.data.moduls.length;i++){ 
        $("#modulos").append('<button class="accordion"> <form action="#"> <p> <label class="black-text"> <input id="chk_modul-'+i+'" type="checkbox" /> <span>'+result.data.moduls[i].nomModul+'</span> </label> </p> </form> </button> <div class="panel" id="modul'+i+'"> </div>');
        
        countUF = result.data.moduls[i].unitatsFormatives.length;
        for(j=0; j< countUF ; j++){
          $('#modul'+i).append('<button class="accordion"> <form action="#"> <p> <label class="black-text"> <input id="chk_uf-'+i+'.'+j+'" type="checkbox" /> <span>'+result.data.moduls[i].unitatsFormatives[j].nomUnitatFormativa+'</span> </label> </p> </form> </button> <div class="panel" id="uf'+i+'.'+j+'"> </div>')
        }
        
        
        $("#chk_modul-"+i).click({result: result}, function(){
          var pos = jQuery(this).attr("id");
          var modulCheckbox = document.getElementById(pos);
          pos = pos.split("-")[1]
          var countUF = result.data.moduls[pos].unitatsFormatives.length;

          if(modulCheckbox.checked == true){
            for(y=0; y<countUF; y++){
              document.getElementById("chk_uf-"+pos+"."+y).checked = true;
            }
          }else{
            for(y=0; y<countUF; y++){
              document.getElementById("chk_uf-"+pos+"."+y).checked = false;
            }
          }

          
        })

      }

      var acc = document.getElementsByClassName("accordion");
      var x;

      for (x = 0; x < acc.length; x++) {
        acc[x].addEventListener("click", function() {
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

    },
    error: function(result){
      alert('Usuario/ContraseÃ±a incorrecta...')
    }
  });
}

function guardarUFs(){
  for(k=0; k<copyResult.data.moduls.length; k++){
    for(x=0; x<copyResult.data.moduls[k].unitatsFormatives.length; x++){
      var chk = document.getElementById("chk_uf-"+k+"."+x);
      if (chk.checked){
        arrayUF.push("1");
      }else {
        arrayUF.push("0");
      }
      
    }
  }
  console.log(arrayUF)
  $.ajax({
    method: "PATCH",
    url: "https://g3matriculesapp.herokuapp.com/api/alumnes/updateUF",  // [DEBUG] - Para pruebas con HERKOU
    datatype: "json",
    data: ({
      token: localStorage.getItem("TOKEN"),
      data: JSON.stringify(arrayUF)
    }),
    success: function(result){
      if(result){
        alert(result.message)
      }

    },
    error: function(result){
      alert('Error...')
    }
  });
}