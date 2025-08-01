var started = false;
var level = 0;
var buttonColours = ["red" , "blue" , "green" , "yellow"];
var gamePattern = [];
var userClickedPattern = [];


function nextSequence(){
userClickedPattern = [];

 level++;
 $("#level-title").text("Level " + level);

 
 var randomNumber = Math.floor((Math.random()*4));
 var randomChosenColour = buttonColours[randomNumber];
 gamePattern.push(randomChosenColour);
 
$("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

playSound(randomChosenColour);

}

// To start the game
$(document).on("keypress", function(){
 
    if (started !== true){
      nextSequence();
      started = true;
    }
       
});

$(".btn").on("click", function() {

    if(started){
   var userChosenColour = $(this).attr("id");
   userClickedPattern.push(userChosenColour);
   playSound(userChosenColour);
   animatePress(userChosenColour);
   // This will check for the last colour that was clicked
   var lastIndex = userClickedPattern.length - 1 ;
   checkAnswer(lastIndex);
   }
});

// this plays the sound for the colours clicked
function playSound(name){

var audio = new Audio("sounds/" + name + ".mp3");
audio.play();

}

//This animates the buttons
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

//To restart the game
function startOver(){

level=0;
gamePattern=[];
started = false;
}



// This is going to check if the answer the user clicks matches the game pattern
function checkAnswer(currentlevel){

  if (userClickedPattern[currentlevel] === gamePattern[currentlevel]){
      
       console.log("Success!");

       if (userClickedPattern.length === gamePattern.length){
         
          setTimeout(function(){
            nextSequence();
          },1000);

       }   
  }

       else {
          console.log ("Wrong!");
          playSound("wrong");

          $("body").addClass("game-over");
          
          setTimeout(function(){
            $("body").removeClass("game-over");
          },200);

          $("#level-title").text("Game Over,Press Any Key to Restart");


          startOver();
       }
}


