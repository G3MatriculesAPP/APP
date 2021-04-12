(function ($) {
    "use strict";

    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })

})(jQuery);

var btnLogin = document.getElementById("btnLogin").onclick = checkLogin;

function checkLogin(){

    // checkLogin()
    // Se comunica con la API y le pasa el valor introducido del usuario en itEmail
    // y el valor encriptado en MD5 introducido en itPassword, si la API devuelve STATUS 200
    // redirecciona al usuario a "dashboard.html" y guarda el TOKEN enviado por la API en LocalStorage
    // si la API devuelve STATUS 500 manda una alerta al usuario comunicando que el email/contraseña
    // son incorrectas.
    
    $.ajax({
        method: "POST",
        // url: "http://localhost:5000/alum/login",               // [DEBUG] - Para pruebas LOCALHOST
        url: "https://g3matriculesapp.herokuapp.com/alum/login",  // [DEBUG] - Para pruebas con HERKOU
        datatype: "json",
        data: ({
          itEmail: $("#itEmail").val(),
          itPassword: md5($("#itPassword").val())
        }),
        success: function(result){
          if(result){
            localStorage.setItem("TOKEN", result.token)
            window.location = 'dashboard.html'    // [DEBUG] - Esto hay que cambiarlo por "index.html" y esta por "login.html"
                                                  // hay que hacer que la APP abra primero el dashboard y si no tiene
                                                  // login activo redirigir a esta.
          }

        },
        error: function(result){
          alert('Usuario/Contraseña incorrecta...')
        }
      });

}
