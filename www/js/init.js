var totalReq=0;
var arrayUF = [];

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
  var semaforo3 = document.getElementById("semaforo3");
  

  function VRed(){    
    
    document.getElementById("tsemaforo").innerHTML = "Datos incompletos";
    semaforo1.style.backgroundColor="#D50000";
    semaforo2.style.backgroundColor="#614C00";
    semaforo3.style.backgroundColor="#005906";
  }

  function VYellow(){
    
    document.getElementById("tsemaforo").innerHTML = "Datos por verificar";
    semaforo1.style.backgroundColor="#650000";
    semaforo2.style.backgroundColor="#EDB000";
    semaforo3.style.backgroundColor="#005906";
  }

  function VGreen(){
   
    document.getElementById("tsemaforo").innerHTML = "Datos aceptados";
    semaforo1.style.backgroundColor="#650000";
    semaforo2.style.backgroundColor="#614C00";
    semaforo3.style.backgroundColor="#00E00F";
  }  



  function fileStr(file){
    const toBase64 = new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => {
        console.log(err)
        reject(error);
      }
    });
    
    return toBase64
  }

  async function subirFicheros(){
    var perfil = $( "#datosPersonales option:selected" ).text()
    var perfils = perfil.split('"')
    $.ajax({
      method: "POST",
      
      url: "https://g3matriculesapp.herokuapp.com/api/reqPerfils/updateAlumProfile",  // [DEBUG] - Para pruebas con HERKOU
      datatype: "json",
      data: ({
        token: localStorage.getItem("TOKEN"),
        nomPerfil: perfils[1],
       
      }),
      success: function(result){
        if(result){
          alert(result)
        }

      },
      error: function(result){
        alert('Error')
      }
    });
    for(i=0; i<totalReq; i++ ){
      if ($("#file"+i).val().length !== 0){
        var myFile = $('#file'+i)[0].files[0];
        var file64 = await fileStr(myFile);
        var label = $('#file'+i).prop('labels');

        $.ajax({
          method: "POST",
          url: "https://g3matriculesapp.herokuapp.com/api/uploadReq",                      // [DEBUG] - Para pruebas LOCALHOST
          datatype: "json",
          data: ({
            token: localStorage.getItem("TOKEN"),
            reqName: label[0].innerText,
            file: file64
          }),
          success: function(result){
            alert(result.message)
          },
          error: function(result){
            alert("Error...")
          }
        });
      }
    }
  }


  function onDeviceReady() {
      // Cordova is now initialized. Have fun!
  
      console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
      document.getElementById("dIncompletos").onclick = VRed;
      document.getElementById("dPorValidar").onclick = VYellow;
      document.getElementById("dAceptados").onclick = VGreen;
      document.getElementById("cPerf").onclick = subirFicheros;
      document.getElementById("bGuardar").onclick = guardarUF;
      obtenerCiclo();
      datosP();
      estadoPerfil();
      modulos();
      userStatus();
       
  }



  function guardarUF(){

    var arrayCheckbox = [];
    for(xi = 0; xi < copyResult.data.moduls.length; xi++){
      for(xj = 0; xj < copyResult.data.moduls[xi].unitatsFormatives.length; xj++){
        var checkbox = document.getElementById("chk_uf-"+xi+"."+xj);
        if(checkbox.checked){
          arrayCheckbox.push("1")
        }else{
          arrayCheckbox.push("0")
        }
      }
    }

    arrayUF = arrayCheckbox;
    $.ajax({
      method: "PATCH",
      url: "https://g3matriculesapp.herokuapp.com/api/alumnes/updateUF",                      // [DEBUG] - Para pruebas LOCALHOST
      datatype: "json",
      data: ({
        token : localStorage.getItem("TOKEN"),
        data: JSON.stringify(arrayUF)
      }),
      success: function(result){
        alert(result.message)
      },
      error: function(result){
        alert("No tienes acceso")
        window.location = 'index.html'   
      }
  });

  }


//  $("#curso1").append('<button class="accordion"><form action="#"><p><label class="black-text"> <input type="checkbox" /> <span>M01</span> </label> </p> </form> </button>')
  function modulos(){
    
    $("#acurso1").empty();
    $("#acurso2").empty();
   
}

// carregar les dades necesaries per al perfil seleccionat
$("#datosPersonales").change(function(){
  var selectedCountry = $(this).children("option:selected").val();
  
  var id = selectedCountry.split('"');
  console.log(id[1])
  
  $.ajax({
    method: "POST",
    url: "https://g3matriculesapp.herokuapp.com/api/reqPerfils/readOne",
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
            $("#buttons").append('<label for="file'+i+'"><i class="material-icons circle semaforo center-align" style="background-color: #606060;" id="semaf'+ i +'"></i>'+result.data[i].nomReq+'</label><br/><input type="file" id="file'+i+'" name="fileImage'+i+'" accept="image/png, image/jpeg, image/jpg"> <br/>');    
           
          }
          else if(result.data[i].tipusReq == 1){
            $("#buttons").append('<label for="file'+i+'"><i class="material-icons circle semaforo center-align" style="background-color: #606060;" id="semaf'+ i +'"></i>'+result.data[i].nomReq+'</label><br/><input type="file" id="file'+i+'" name="fileDoc'+i+'" accept=".pdf"><br/>');    
           
          }
          else if(result.data[i].tipusReq == 2){
            $("#buttons").append('<label for="file'+i+'"><i class="material-icons circle semaforo center-align" style="background-color: #606060;" id="semaf'+ i +'"></i>'+result.data[i].nomReq+'</label><br/><input type="text" id="file'+i+'" name="fileDoc'+i+'"  ><br/>');    
           
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
      alert('Usuario/Contraseña incorrecta...')
    }
  });
}


function userStatus(){
  $.ajax({
    method: "POST",
   
    url: "https://g3matriculesapp.herokuapp.com/api/alumnes/status",  // [DEBUG] - Para pruebas con HERKOU
    datatype: "json",
    data: ({
      token:localStorage.getItem("TOKEN")
    }),
    success: function(result){
      
      if(result.result== "Validada"){
        VGreen();
      }else if(result.result== "Per_validar"){
        VYellow();
      }else if(result.result== "Incomplet"){
        VRed();
      }

    },
    error: function(result){
      alert('Usuario/Contraseña incorrecta...')
    }
  });
}

function  estadoPerfil(){
  $.ajax({
    method: "POST",
    url: "https://g3matriculesapp.herokuapp.com/api/perfils/getStatusPerfil",  
    datatype: "json",
    data: ({
      token: localStorage.getItem("TOKEN")
    }),
    success: function(result1){
      console.log("aqui vamos")
      console.log(result1);
      console.log(result1.data[0].estatRequisits[0]);
      var tempId= result1.dataPerfil[0]._id;
      $.ajax({
        
        method: "POST",
        url: "https://g3matriculesapp.herokuapp.com/api/reqPerfils/readOne",
        datatype: "json",
        data: ({
          id: tempId
        }),
        success: function(result2){
          if(result2){
            $("#buttons").html("");
            totalReq = result2.data.length;
            // estatRequisits == 0 rojo - estatRequisits == 1 amarillo - estatRequisits == 2 verde
            for(i=0; i<result2.data.length;i++){
              if(result2.data[i].tipusReq == 0 && result1.data[0].estatRequisits[i] == 0 ){
                $("#buttons").append('<label for="file'+i+'"><i class="material-icons circle semaforo center-align" style="background-color: #EF4100;" id="semaf'+ i +'"></i>'+result2.data[i].nomReq+'</label><br/><input type="file" id="file'+i+'" name="fileImage'+i+'" accept="image/png, image/jpeg, image/jpg"> <br/>');    
               
              }else if(result2.data[i].tipusReq == 0 && result1.data[0].estatRequisits[i] == 1){
                $("#buttons").append('<label for="file'+i+'"><i class="material-icons circle semaforo center-align" style="background-color: #F3C700;" id="semaf'+ i +'"></i>'+result2.data[i].nomReq+'</label><br/><input type="file" id="file'+i+'" name="fileImage'+i+'" accept="image/png, image/jpeg, image/jpg"> <br/>');    

              }
              else if(result2.data[i].tipusReq == 0 && result1.data[0].estatRequisits[i] == 2){
                $("#buttons").append('<label for="file'+i+'"><i class="material-icons circle semaforo center-align" style="background-color: #0FE600;" id="semaf'+ i +'"></i>'+result2.data[i].nomReq+'</label><br/><input type="file" id="file'+i+'" name="fileImage'+i+'" accept="image/png, image/jpeg, image/jpg"> <br/>');    

              }
              else if(result2.data[i].tipusReq == 1 && result1.data[0].estatRequisits[i] == 0){
                $("#buttons").append('<label for="file'+i+'"><i class="material-icons circle semaforo center-align" style="background-color: #EF4100;" id="semaf'+ i +'"></i>'+result2.data[i].nomReq+'</label><br/><input type="file" id="file'+i+'" name="fileDoc'+i+'" accept=".pdf"><br/>');    
               
              }
              else if(result2.data[i].tipusReq == 1 && result1.data[0].estatRequisits[i] == 1){
                $("#buttons").append('<label for="file'+i+'"><i class="material-icons circle semaforo center-align" style="background-color: #F3C700;" id="semaf'+ i +'"></i>'+result2.data[i].nomReq+'</label><br/><input type="file" id="file'+i+'" name="fileDoc'+i+'" accept=".pdf"><br/>');    
               
              }
              else if(result2.data[i].tipusReq == 1 && result1.data[0].estatRequisits[i] == 2){
                $("#buttons").append('<label for="file'+i+'"><i class="material-icons circle semaforo center-align" style="background-color: #0FE600;" id="semaf'+ i +'"></i>'+result2.data[i].nomReq+'</label><br/><input type="file" id="file'+i+'" name="fileDoc'+i+'" accept=".pdf"><br/>');    
               
              }
              else if(result2.data[i].tipusReq == 2 && result1.data[0].estatRequisits[i] == 0){
                $("#buttons").append('<label for="file'+i+'"><i class="material-icons circle semaforo center-align" style="background-color: #EF4100;" id="semaf'+ i +'"></i>'+result2.data[i].nomReq+'</label><br/><input type="text" id="file'+i+'" name="fileDoc'+i+'"  ><br/>');    
               
              }
              else if(result2.data[i].tipusReq == 2 && result1.data[0].estatRequisits[i] == 1){
                $("#buttons").append('<label for="file'+i+'"><i class="material-icons circle semaforo center-align" style="background-color: #F3C700;" id="semaf'+ i +'"></i>'+result2.data[i].nomReq+'</label><br/><input type="text" id="file'+i+'" name="fileDoc'+i+'"  ><br/>');    
               
              }
              else if(result2.data[i].tipusReq == 2 && result1.data[0].estatRequisits[i] == 2){
                $("#buttons").append('<label for="file'+i+'"><i class="material-icons circle semaforo center-align" style="background-color: #0FE600;" id="semaf'+ i +'"></i>'+result2.data[i].nomReq+'</label><br/><input type="text" id="file'+i+'" name="fileDoc'+i+'"  ><br/>');    
               
              }
            }
            $("#cPerf").css("visibility","visible");
          }
        }
    
      })




    },
    error: function(result2){
      alert('Error al obtener perfil')
    }
  });
}