var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern=[]

function handler() {
     var userChosenColour = $(this).attr("id");     
     userClickedPattern.push(userChosenColour);
     playSound(userChosenColour);
     animatePress(userChosenColour);
     checkAnswer(userClickedPattern.length-1)
   };


$(".btn").on('click',handler)


function playSound(name){
          var audio = new Audio("sounds/" + name + ".mp3");
          audio.play();
          // if(name==="wrong"){
          //      var audio = new Audio("sounds/wrong.mp3");
          //      audio.play();
          // }
     };

function animatePress(currentColor){
     $("#"+currentColor).addClass("pressed");
     setTimeout(function(){
          $("#"+currentColor).removeClass("pressed");
      },100);
}     
var started=true
var value=0
$(document).on('keypress',function(){
     if(started){
          $("h1").text("Level "+value)
          started=false
          nextSequence();
     }
})

function checkAnswer(currentLevel){
if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
     // console.log("success")
     if(userClickedPattern.length===gamePattern.length){
          setTimeout(function () {
               nextSequence();
             }, 1000);
     }
}
else{
     // console.log("wrong")
//    let check="wrong";
     $("body").addClass("game-over");
     setTimeout(function()
     {$("body").removeClass("game-over");
},200);
playSound("wrong");
startOver();
}
}

function nextSequence() {
     userClickedPattern=[];
     value++
     $("h1").text("Level "+value)
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour)  
}

function startOver(){
     value=0;
     gamePattern=[];
     started=true;
     $("h1").text("Press Any key to start")
}