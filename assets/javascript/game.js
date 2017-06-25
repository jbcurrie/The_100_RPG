//$("body").style.backgroundImage=("url(assets/images/Wiki_background.jpg)");
// $( "body" )
// after HTML and CSS setup
//variables needed

//If we reassign the HP  to a new variable, it would go to zero, and it would be unnecesary to reassign the hero HP if we can just run a function off whatever HP
// var myCharacterHP = 0;
// var defenderHP = 0;
var myCharacterAP = 0;
var defenderAP = 0;
var clarkeHP = 108;
var clarkeAP = 12;
var bellamyHP = 135;
var bellamyAP = 9;
var danteHP = 180;
var danteAP = 6;
var alieHP = 297;
var alieAP = 3;

var gamePlayers = $("a");
var gameDefenders = [];
var gameEnemies = [];
//+$(this).data(data attribute) converts the data value to a number
//you can pass a number or string to the .text() method
//.closest() (find class of closest parent), .find() (find class of closest child)
//if you need to add css attributes, add them in css and $(this).css({'background-color':'#fffff', 'border-color :1px solid'});
//use $(this).find('class').show(); to show hidden elements
$(document).ready(function() {
	var bellamy = $("<h4>HP : " + bellamyHP + "</h4>");
	$("#bellamy").append(bellamy);
	// $("#bellamy").append()
	// $("#alie").append()
	var alie = $("<h4>HP : " + alieHP + "</h4>");
	$("#alie").append(alie);
	var clarke = $("<h4>HP : " + clarkeHP + "</h4>");
	$("#clarke").append(clarke);
	// $("#dante").append()
	var dante = $("<h4>HP : " + danteHP + "</h4>");
	$("#dante").append(dante);
	$("a").addClass("myCharacter");
	//could also add data attributes here for AP
});	

	//var myCharacter = $("myCharacter");
	//var enemyCharacter = $("enemyCharacter");
	var heroCheck = false;

//use this to apply function to this 'a'
$("a").on('click',function(event){
	$("a").removeClass("myCharacter");
	//$(this).addClass("myCharacter");
		$(this).addClass("myCharacter");
		var hero = $(this);
		debugger;
		var heroCheck = true;
		console.log(this);
		for (var i = 0; i < gamePlayers.length; i++) {
			console.log(i);
			if (hero.index() !== gamePlayers[indexOf(i)]) {
				$("a").addClass("enemyCharacter");
			}
		}
	//add a class/variable/value indicating this is your character so that you can run a function to push enemies to the next div
	//click should only work for a in startPlayers div
	
	//could assign enemy class to all non-selected; and then run action that way
	//if 'hero' class is not assigned, assign enemy class, and append to enemy player div
	//remove myCharacter and add enemyCharacter
	//append below the col div of enemy players

});

function defenderSelection () {
	//defender selection

	//repeat onclick function above, assign defenderCharacter class

	//

}


function attack () {
	//when attack button pressed:
	//decrement enemy HP by hero AP
		//hero AP stored in global variable
	//when attack pressed again myCharacterAP counter += hero AP

	//decrement hero HP by enemy AP
	//enemy AP does not reset
}

function roundChecker () {
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
