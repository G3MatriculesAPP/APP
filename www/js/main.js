(function ($) {
    "use strict";


    /*==================================================================
    [ Focus input ]*/
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
    
    $.ajax({
        method: "POST",
        url: "http://localhost:25012/alumnes/login",
        datatype: "json",
        data: ({
          username: $("#itUsername").val(),
          password: md5($("#itPassword").val())
        }),
        success: function(result){

          if(result){
            window.location = 'http://www.google.com/'
          }

        }
      });

}