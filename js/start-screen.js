var SelectText = function(element) {
  var doc = document,
      text = doc.getElementById(element),
      range,
      selection;

  if (doc.body.createTextRange) {
      range = document.body.createTextRange();
      range.moveToElementText(text);
      range.select();
    } else if (window.getSelection) {
      selection = window.getSelection();
      range = document.createRange();
      range.selectNodeContents(text);
      selection.removeAllRanges();
      selection.addRange(range);
    }
};

var share, egg = function() {

  var o = $( '.outer path' );

  if ( o.css( 'opacity' ) == 0.2 ) {
    $( '.round, .url-share, h1' ).hide();
    $( '.daggers' ).show();

      o.css({ 'fill' : 'rgb( 255, 255, 255 )' });
  }

};

var getVoteState = function() {

  var vote = window.location.href.split( '#' );
  console.log(vote);

    return vote;
};

var setToggle = function( state ) {

  var t = 'toggle-',
      light,
      vote = getVoteState();

  // Rem/Add toggles
    $( '.button' ).removeClass( function ( index, css ) {
      return( css.match ( /\btoggle-\S+/g ) || [] ).join( ' ' );
    });

  // Determine state and asign toggle
  if ( state === 'in' ) {
    $( '.in' ).addClass( t + 'in' );
     light = $( '.in' ).attr( 'data' );


  } else if ( state === 'out' ) {
    $( '.out' ).addClass( t + 'out' );
     light = $( '.out' ).attr( 'data' );
  }

    // Update share URl
    $( '.url-share > em' ).text( 'https://output.jsbin.com/hinulo' + '#' + state );

     // Switch lamps to new colour
     $( '.outer path ').css({ 'fill' : 'rgba(' + light + ', 1)' });

};


// Init
(function($){
  var state = getVoteState();
    setToggle( state[1] );
      egg();
})();

// Events
$( '.button' ).click( function() {

  var toggle = $( this ).attr( 'id' ), timer = 4600;

  // Clear share timer and reset for each click
  window.clearTimeout(share);

  // Show and tell
  $( 'h1:visible' ).fadeOut(100);

    share = setTimeout( function() {
      $( '.url-share:hidden' ).fadeIn(400);
    }, timer);

  // Rem/Add toggles
  setToggle( toggle );

  // Catch scroll
  return false;

});

$( '.url-share' ).click( function() {
  SelectText( 'url' );
});
