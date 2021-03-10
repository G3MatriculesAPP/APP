// Arxiu init.js + index.js


  // Or with jQuery

   

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
  
  