$(document).ready( function () {
  $('.game-screen').hide();
  ion.sound.play("tetris-soundtrack-original");

  $('.start-button').one( 'click', function () {
    $('.start-screen').fadeOut();
    $('.game-screen').fadeIn();
    ion.sound.stop("tetris-soundtrack-original");
    startGame();
    ion.sound.play("tetris-soundtrack-remix");
  });


});
