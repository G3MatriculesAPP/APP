$.ajax({
    method: "GET",
    // url: "http://localhost:5000/api/auth",                      // [DEBUG] - Para pruebas LOCALHOST
    url: "https://g3matriculesapp.herokuapp.com/api/auth",          // [DEBUG] - Para pruebas con HERKOU
    datatype: "json",
    headers: ({
      token : localStorage.getItem("TOKEN")
    }),
    success: function(result){
      alert(result.message)
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
   
  var bcerca = document.getElementById("bcerca");
  
  
  
  document.addEventListener('deviceready', onDeviceReady, false);
   
  function onDeviceReady() {
      // Cordova is now initialized. Have fun!
  
      console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
      
      //document.getElementById('deviceready').classList.add('ready');
  }
  
  