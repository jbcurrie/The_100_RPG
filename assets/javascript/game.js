//$("body").style.backgroundImage=("url(assets/images/Wiki_background.jpg)");
// $( "body" )
// after HTML and CSS setup
//variables needed

//If we reassign the HP  to a new variable, it would go to zero, and it would be unnecesary to reassign the hero HP if we can just run a function off whatever HP
// var myCharacterHP = 0;
// var defenderHP = 0;
var myCharacterAP = 0;
var myCharacterHP = 0;
var myCharacterName = "";
var defenderAP = 0;
var defenderHP = 0;
var defenderName = "";
var clarkeHP = 108;
var clarkeAP = 12;
var bellamyHP = 135;
var bellamyAP = 9;
var danteHP = 180;
var danteAP = 6;
var alieHP = 297;
var alieAP = 3;

var gamePlayers = $("a");
//HOLDS ATTRIBUTES AND CONTROLS CLICK FUNCTION
var gamePlayersClass = [".bellamy",".alie",".dante",".clarke"];
//SHOWS HP
var gamePlayersID = ["#bellamy","#alie","#dante","#clarke"];
var gameDefenders = [];
var gameEnemies = [];
var gameHeroes = [];
//+$(this).data(data attribute) converts the data value to a number
//you can pass a number or string to the .text() method
//.closest() (find class of closest parent), .find() (find class of closest child)
//if you need to add css attributes, add them in css and $(this).css({'background-color':'#fffff', 'border-color :1px solid'});
//use $(this).find('class').show(); to show hidden elements
$(document).ready(function() {
	//need to replace this with data attribute
	var bellamy = $("<h4>HP : " + $(gamePlayersClass[0]).attr("data-hp") + "</h4>");
	$(gamePlayersID[0]).append(bellamy);
	var alie = $("<h4>HP : " + $(gamePlayersClass[1]).attr("data-hp") + "</h4>");
	$(gamePlayersID[1]).append(alie);
	var clarke = $("<h4>HP : " + $(gamePlayersClass[2]).attr("data-hp") + "</h4>");
	$(gamePlayersID[2]).append(clarke);
	var dante = $("<h4>HP : " + $(gamePlayersClass[3]).attr("data-hp") + "</h4>");
	$(gamePlayersID[3]).append(dante);
	$("a").addClass("myCharacter");
	$("body",".jumbotron").attr("<img src=../images/Wiki_background.jpg>")
	pickHero();
	defenderSelection();
	// attack();
	//could also add data attributes here for AP
});	

	//var myCharacter = $("myCharacter");
	//var enemyCharacter = $("enemyCharacter");
	

//use this to apply function to this 'a'
//this is going to fire for any 'a' you click on unless it's stored to a function that specifies it's only for myCharacter div
//for 'a' in my character div run function. function stored as select characters
//or attach function as an in line script to each 'a' in my characters. 

function pickHero () {
	$("body").one("click", "a", function (event) {
		event.stopPropagation();
		$("a").removeClass("myCharacter");
			// console.log(this);
			for (var i = 0; i < gamePlayers.length; i++) {
				// console.log(i);
				if (this.closest("a") === gamePlayers.get(i)) {
					$(gamePlayersClass[i]).closest("a").addClass("myCharacter");
					gameHeroes.push(gamePlayersClass[i]);
				} else {
					//push class to enemy array
					//remove from the current div
					//append to the enemy div
					$(gamePlayersClass[i]).closest("a").addClass("enemyCharacter");
					gameEnemies.push(gamePlayersClass[i]);
					//$(gamePlayersClass[i]).closest(".col-lg-3").parent().detach();
					//to do: .remove() /.detach() the ".col" where the "a"'s' were reassigned
				}
			}
			$("#getStarted").empty().append("<h2>Select your first enemy to begin the battle!</h2>");
			//for each game defenders, append to new class
			// $("#enemyPlayers").append();
			for (j in gameEnemies) {
				$("#enemyPlayers").append("<div class='col-lg-3 col-md-3 col-sm-3 col-xs-3'></div>");
				$("#enemyPlayers").find(".col-lg-3").last().append($(gameEnemies[j]));
			}
				//add a class/variable/value indicating this is your character so that you can run a function to push enemies to the next div
				//click should only work for a in startPlayers div
				
				//could assign enemy class to all non-selected; and then run action that way
				//if 'hero' class is not assigned, assign enemy class, and append to enemy player div
				//remove myCharacter and add enemyCharacter
				//append below the col div of enemy players
	});	
};


function defenderSelection () {
	$("#enemyPlayers").one("click", "a", function (event) {
		event.stopPropagation();
		// console.log(this);
		for (var i = 0; i < gamePlayers.length; i++) {
		// console.log(i);
			if (this.closest("a") === gamePlayers.get(i)) {
				$(gamePlayersClass[i]).closest("a").addClass("defenderCharacter");
				gameDefenders.push(gamePlayersClass[i]);
			} else {
				$(gamePlayersClass[i]).closest("a").removeClass("defenderCharacter");
			}
		}
		$("#getStarted").empty().append("<h2>Attack when you're ready!</h2>");
		// $("#enemyPlayers").after("<div class='row' id='attackButton'></div>");
		// $("#attackButton").append("<div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'></div>");
		//.find(".col-lg-12").append
		//TO FIX
		$("#enemyPlayers").after("<div class='row' id='attackButton'></div>")
		.append("<div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'></div>")
		.after("<button type='button' class='btn btn-success' id='attackBtn'>Attack!</button>");
		
		for (j in gameDefenders) {
			$("#defenderPlayers").append("<div class='col-lg-3 col-md-3 col-sm-3 col-xs-3'></div>");
			$("#defenderPlayers").find(".col-lg-3").last().append($(gameDefenders[j]));
		}
		//defender selection

		//repeat onclick function above, assign defenderCharacter class

		//
	});
};


// function attack () {
	// on click run attack function
	// 	for this a, get data attribute (should add to HTML code, in order to call on it in functions)
		//
	$("body").on("click", "button", function (event) {
	// $("#attackBtn").click(function () {
		// event.stopPropagation();
		//get the correct ap
		console.log(this);
		console.log(gameHeroes);
		myCharacterAP = $(gameHeroes[0]).attr("data-ap");
		myCharacterHP = $(gameHeroes[0]).attr("data-hp");
		myCharacterName = $(gameHeroes[0]).attr("data-name");
		defenderHP = $(gameDefenders[0]).attr("data-hp");
		defenderAP = $(gameDefenders[0]).attr("data-ap");
		defenderName = $(gameDefenders[0]).attr("data-name");
		// $("#attackBtn").after("<h3> Your hero is: " + myCharacterName + ". AP: " + myCharacterAP + ". HP: " + myCharacterHP + ".</h3>");
		// $("#attackBtn").after("<h3> Your enemy is: " + defenderName + ". AP: " + defenderAP + ". HP: " + defenderHP + ".</h3>");

		//create an ID that replaces hero ID for HP in div
		//create an ID that replaces enemy ID for HP in div



		//assign hero HP to function

		var tempArr = gameHeroes[0].split(".")
		var temp = tempArr.shift();
		console.log(tempArr);
		for (var i = 0; i < gamePlayersClass.length; i++) {
			if ($(gamePlayersClass[i]).hasClass(tempArr[0])) {
				myCharacterHP = $(gamePlayersClass[i]).attr("data-hp");

			}
		}
		//assign enemy HP to function



		// $(gameHeroes[0]).attr("data-hp")
		//each click needs to do this:
		defenderHP-=myCharacterAP;
		// myCharacterAP+=myCharacterAP;
		myCharacterHP-=defenderAP;

		// var crystalValue = ($(this).attr("data-crystalvalue"));
				//click will pull data attributes of myCharacter
		//get correct character name
		// assign that AP to text on screen
		//.after adds new lines each time you click the button. need text to show once
		// $("#attackBtn").after("<h3> Your hero is: " + myCharacterName + ". AP: " + myCharacterAP + ". HP: " + myCharacterHP + ".</h3>");
		// $("#attackBtn").after("<h3> Your enemy is: " + defenderName + ". AP: " + defenderAP + ". HP: " + defenderHP + ".</h3>");


		//run an if statement that checks if the HP is above 0
		//if yes, it takes the current HP and subtracts the opponent HP
		//the new score displays to HTML, and does not reset

			//decrement enemy HP by hero AP
				//hero AP stored in global variable
				//when attack pressed again myCharacterAP counter += hero AP

			//decrement hero HP by enemy AP
			//enemy AP does not reset
	});
	//when attack button pressed:
	//decrement enemy HP by hero AP
		//hero AP stored in global variable
	//when attack pressed again myCharacterAP counter += hero AP

	//decrement hero HP by enemy AP
	//enemy AP does not reset
// }

function roundChecker () {
		//click will pull data attributes of myCharacter
		//get correct character name
		// assign that AP to text on screen
		//.after adds new lines each time you click the button. need text to show once
		$("#attackBtn").after("<h3> Your hero is: " + myCharacterName + ". AP: " + myCharacterAP + ". HP: " + myCharacterHP + ".</h3>");
		$("#attackBtn").after("<h3> Your enemy is: " + defenderName + ". AP: " + defenderAP + ". HP: " + defenderHP + ".</h3>");

	//when hero HP < 1
		//you lose! 
		//restart button, if clicked, start game

	// when enemy HP < 1
		//if defender array.length <1
		//you win

		//else run defenderSelection function again
}








//functions needed

//on anchor click, assign class and attribute for myCharacter and enemies
	//on click assign enemies to div below myCharacter
	//display text: choose your first opponent

//on enemy click, assign defender class and attribute
	//assign defenders to div below enemies
	//display on click attach button below enemies
	//dispay on click restart button below defender

//attack points
	//my character attack points equal var of selected character
	//enemy attack points equal var of defender
	//on attack button click subtract var AP enemy from var HP myCharacter once
		//on next click, enemy AP resets, so that it adds only 1 unit. 
	//also on attack button click, subtract var AP myCharacter from enemy HP once
		//on next click, AP = AP + AP
		//on next click, Ap = AP + AP + AP...
		//for each attack click, myCharacter AP increases by 1 AP 
		//add 1 myCharacter AP to the current AP for each turn

//how to win game
	//if myCharacter HP > 0 && defender HP < 1 
		//hide defender thumbnail
		//show text - you won this round. select another enemy
		//run enemy click function. and restart the loop that assigns attack points
			//HP does not reset
			//enemy HP does reset, and AP is the new character
	//if defender count = 0, 
		//show gif, set timeout
		//you won! play again
		//start game

//

//how to start the game
	//first div configuration shows
	//text "choose a character" displays in div (store as variable?)
	// class attribute assigned myCharacter for all characters 



/*4 characters

your character life points 


your character attack power counter

defender attack power 

defender life points*/



/*function to select your character

function to move enemies to 'enemies available to attach area'

function to move enemies to defender area

function attack (button)- assigns attack power points against character points

function to remove defeated players from game

function to pick new character (may be same as intial function). only one selection possible

function restart (button)*/


//notes - just use the correct bootstrap class name to append a new div img, etc when you write the code 
