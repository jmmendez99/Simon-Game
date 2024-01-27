// State variables
buttonColors = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickedPattern = [];
var started = false;
var level = 0;

// Events
$(document).keypress(function () {
  if (!started) {
    $("#level-title").text(`Level ${level}`);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

// Gets random color, show user the color, start game
function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text(`Level ${level}`);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $(`#${randomChosenColor}`).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

// Plays game sounds
function playSound(name) {
  var audio = new Audio(`./sounds/${name}.mp3`);
  audio.play();
}

// Animates button presses
function animatePress(currentColor) {
  $(`#${currentColor}`).addClass("pressed");
  setTimeout(function () {
    $(`#${currentColor}`).removeClass("pressed");
  }, 100);
}

//Checks answer, starts next level if right, game over if wrong
function checkAnswer(currentLevel) {
  if (userClickedPattern.at(currentLevel) === gamePattern.at(currentLevel)) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}

// Resets values once user gets a wrong answer
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
