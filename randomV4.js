var theQuote = '';
var theAuthor ='';
//zeige das erste zufällige Zitat wenn die Seite geladen wird
  $(document).ready(function() {

    randomZitat();
  });
//zeige ein zufälliges Zitat wenn der user den Nächstes Zitat button klickt
  $("#nextZitat").on("click", function(event){
    event.preventDefault();
    randomZitat();
  });
//die funktion, die ein zufälliges Zitat aus der API lädt und in das HTML dokument lädt
  function randomZitat(){
    var $zitate = $("#zitate");
    var $pic    = $("#pic");

    $.ajax({
      type: 'GET',
      url: 'https://thesimpsonsquoteapi.glitch.me/quotes?count=1',
      success: function(zitate){

          $.each(zitate, function(i, zitat){
            theQuote = zitat.quote;
            theAuthor= zitat.character;
            //update das zitat
            if(zitat.characterDirection != "Right"){
              $("#zitate").html('<h1 id="quote">'+zitat.quote+'</h1>').fadeIn();
              $("#pic").html('<span><img id="pic" src='+zitat.image+'></span>').fadeIn();
            } else {
              $("#pic").html('<h1 id="quote">'+zitat.quote+'</h1>').fadeIn();
              $("#zitate").html('<span><img id="pic" src='+zitat.image+'></span>').fadeIn();
            }

        });
  }
});
}

//make tweet work

$('#tweet').on("click", function(){
  var myUrl = 'https://twitter.com/intent/tweet?text=' + theQuote + ' '+'- ' + theAuthor;
window.open(myUrl, 'twitter');
return false;
});


//url:'https://fcc-weather-api.glitch.me/api/current?lat='+latitude+'&lon='+longitude,
