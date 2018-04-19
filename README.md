# corporate-WA

## Speed up your website! Loading Action

//WINDOW LOAD
$(window).load(function(){  
  $('body').addClass('loaded');  
  $('#loader-wrapper').fadeOut();
});

//DOCUMENT READY
$(document).ready(function(){
  $('body').addClass('loaded');
  $('#loader-wrapper').fadeOut();
});
