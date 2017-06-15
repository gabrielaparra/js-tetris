$(document).ready( function () {
  $('.game-screen').hide();
  ion.sound.play("tetris-soundtrack-original");

  $('.start-button').one( 'click', function () {
    $('.start-screen').fadeOut();
    $('.game-screen').fadeIn();
    startGame();
  });


});
