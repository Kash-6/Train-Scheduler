$(document).ready(function () {
var options = [
	{
		question: "Which team won the very first Superbowl?", 
		choice: ["San Francisco 49ers", "Green Bay Packers", "Buffalo Bills", "Kansas City Chiefs"],
		answer: 1,
		photo: "assets/images/Greenbay.png"
	 },
	 {
	 	question: "Which quarterback has the most passing yards in NFL history?", 
		choice: ["Drew Brees", "Dan Marino", "Tom Brady", "Joe Montana"],
		answer: 0,
		photo: "assets/images/brees.jpg"
	 }, 
	 {
	 	question: "What is the record for passing touchdowns in a season?", 
		choice: ["49", "48", "55", "50" ],
		answer: 2,
		photo: "assets/images/peyton.jpg"
	}, 
	{
		question: "Who won the 2017-2018 Superbowl (Superbowl 52)?", 
		choice: ["New England Patriots", "Denver Broncos", "Philadelphia Eagles", "Seattle Seahawks" ],
		answer: 2,
		photo: "assets/images/eagles.png"
	}, 
	{
		question: "Which head coach has the most wins in NFL history?", 
		choice: ["Andy Reid", "Mike Ditka", "Bill Belichick", "Don Shula" ],
		answer: 3,
		photo: "assets/images/shula.jpg"
	}, 
	{
		question: "Which franchise has the most Superbowl wins?", 
		choice: ["Dallas Cowboys", "Pittsburgh Steelers", "San Francisco 49ers", "New England Patriots" ],
		answer: 1,
		photo: "assets/images/steelers.jpg"
	}]; 


var correctCount = 0;
var wrongCount = 0;
var unanswerCount = 0;
var timer = 30;
var intervalId;
var userGuess ="";
var running = false;
var qCount = options.length;
var pick;
var index;
var newArray = [];
var holder = [];



$("#reset").hide();

$("#start").on("click", function () {
		$("#start").hide();
		displayQuestion();
		runTimer();
		for(var i = 0; i < options.length; i++) {
	holder.push(options[i]);
}
	})

function runTimer(){
	if (!running) {
	intervalId = setInterval(decrement, 1000); 
	running = true;
	}
}

function decrement() {
	$("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
	timer --;

	if (timer === 0) {
		unanswerCount++;
		stop();
		$("#answerblock").html("<p>You ran out of time! The correct answer is: " + pick.choice[pick.answer] + "</p>");
		hidepicture();
	}	
}

function stop() {
	running = false;
	clearInterval(intervalId);
}

function displayQuestion() {
	index = Math.floor(Math.random()*options.length);
	pick = options[index];

		$("#questionblock").html("<h2>" + pick.question + "</h2>");
		for(var i = 0; i < pick.choice.length; i++) {
			var userChoice = $("<div>");
			userChoice.addClass("answerchoice");
			userChoice.html(pick.choice[i]);
			userChoice.attr("data-guessvalue", i);
			$("#answerblock").append(userChoice);
}




$(".answerchoice").on("click", function () {
	
	userGuess = parseInt($(this).attr("data-guessvalue"));

	if (userGuess === pick.answer) {
		stop();
		correctCount++;
		userGuess="";
		$("#answerblock").html("<p>Correct!</p>");
		hidepicture();

	} else {
		stop();
		wrongCount++;
		userGuess="";
		$("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
		hidepicture();
	}
})
}


function hidepicture () {
	$("#answerblock").append("<img src=" + pick.photo + ">");
	newArray.push(pick);
	options.splice(index,1);

	var hidpic = setTimeout(function() {
		$("#answerblock").empty();
		timer= 30;
	
	if ((wrongCount + correctCount + unanswerCount) === qCount) {
		$("#questionblock").empty();
		$("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
		$("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
		$("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
		$("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
		$("#reset").show();
		correctCount = 0;
		wrongCount = 0;
		unanswerCount = 0;

	} else {
		runTimer();
		displayQuestion();

	}
	}, 3000);


}

$("#reset").on("click", function() {
	$("#reset").hide();
	$("#answerblock").empty();
	$("#questionblock").empty();
	for(var i = 0; i < holder.length; i++) {
		options.push(holder[i]);
	}
	runTimer();
	displayQuestion();

})
})