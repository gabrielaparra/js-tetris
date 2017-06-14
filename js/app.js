$(document).ready( function () {
  $('.game-screen').hide();

  $('.start-button').click( function () {
    $('.start-screen').fadeOut();
    $('.game-screen').fadeIn();
  });

  playerReset();
  updateScore();
  update();

});
