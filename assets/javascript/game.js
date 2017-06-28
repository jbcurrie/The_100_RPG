
var myCharacterAP = 0;
var myCharacterApAmp = 0;
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
//start() will reassign the handlers anyway, so remove true
var clonePlayers = $(".startPlayers").clone();
var cloneMessage = $(".getStarted").clone();
//HOLDS ATTRIBUTES AND CONTROLS CLICK FUNCTION
var gamePlayersClass = [".bellamy",".alie",".dante",".clarke"];
//SHOWS HP
var gamePlayersHP = [".bellamyHP",".alieHP",".danteHP",".clarkeHP"];
var gameDefenders = [];
var gameEnemies = [];
var gameHeroes = [];
//+$(this).data(data attribute) converts the data value to a number
//you can pass a number or string to the .text() method
//.closest() (find class of closest parent), .find() (find class of closest child)
//if you need to add css attributes, add them in css and $(this).css({'background-color':'#fffff', 'border-color :1px solid'});
//use $(this).find('class').show(); to show hidden elements
// $(document).ready(function() {
function start() {
	$("a").addClass("myCharacter");
	myCharacterAP = 0;
	myCharacterApAmp = 0;
	myCharacterHP = 0;
	myCharacterName = "";
	defenderAP = 0;
	defenderHP = 0;
	defenderName = "";
	//need to replace this with data attribute
	var bellamy = $("<h4>HP : " + $(gamePlayersClass[0]).data("hp") + "</h4>");
	$(gamePlayersHP[0]).append(bellamy);
	var alie = $("<h4>HP : " + $(gamePlayersClass[1]).data("hp") + "</h4>");
	$(gamePlayersHP[1]).append(alie);
	var clarke = $("<h4>HP : " + $(gamePlayersClass[2]).data("hp") + "</h4>");
	$(gamePlayersHP[2]).append(clarke);
	var dante = $("<h4>HP : " + $(gamePlayersClass[3]).data("hp") + "</h4>");
	$(gamePlayersHP[3]).append(dante);
	clonePlayers;
	cloneMessage;
	pickHero();

	$(".enemyPlayers").on("click", "a", defenderSelection);// defenderSelection()
	$("div").on("click", "button", attack);
	$("div").on("click", "button",restart);
  	// $("button").click(function(event){
   //      $(this).trigger("click.restart");
   //     });
	// roundchecker triggered by attack button
	

	//event.stopPropogation won't stop the click from bubbling up the DOM if the trigger is the body. 
	// $("button.attackBtn").click(function (event) {
	// 	alert("ive been clicked");
	// 	// debugger	;
	//  // event.stopPropagation();
	// 	if (gameDefenders.length > 0) {
	// 		// debugger;
		// attack();
	// 	}
	// });

	// $("button.restartBtn").click( function (event) {
	// 	// debugger	;
	// 	// event.stopPropagation();
	// 	if ($("div").hasClass("restart")) {
	// 		// debugger;
	// 		// if this button pressed, reload the game
			// restart();
		// }
	// });
}



function pickHero () {
	$("body").one("click", "a", function (event) {
		// debugger	;
		// event.stopPropagation();
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
					// var placeHolder = $(gamePlayersClass[i]).closest("a").detach();
					gameEnemies.push(gamePlayersClass[i]);
					//$(gamePlayersClass[i]).closest(".col-lg-3").parent().detach();
					//to do: .remove() /.detach() the ".col" where the "a"'s' were reassigned
				}
			}
			$(".getStarted").empty().append("<h2>Select your first enemy to begin the battle!</h2>");
			//for each game defenders, append to new class
			// $(".enemyPlayers").append();

			//use placeholder variable instead of below code
			for (j in gameEnemies) {
				$(".enemyPlayers").append("<div class='col-lg-3 col-md-3 col-sm-3 col-xs-3'></div>");
				$(".enemyPlayers").find(".col-lg-3").last().append($(gameEnemies[j]));		
				// $("#startPlayers").find('col-lg-3').find("a :not(.myCharacter)").remove();
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
	// debugger;
	// $(".enemyPlayers").on("click", "a", function (event) {
		// debugger	;
		// event.stopPropagation();
		// console.log(this);
	if  (gameDefenders.length === 0) {
		for (var i = 0; i < gamePlayers.length; i++) {
		// console.log(i);
			if (this.closest("a") === gamePlayers.get(i)) {
				$(gamePlayersClass[i]).closest("a").addClass("defenderCharacter");
				//will push defender 2x on second round
				gameDefenders.push(gamePlayersClass[i]);
				//gameEnemies.pop() acts as an enemy counter. not import that the array value doesn't match the character
				for (var j = 0; j < gameEnemies.length; j++) {
					// debugger;
					if ($("a.enemyCharacter").get(j) === $("a.defenderCharacter").get(0)) {
						gameEnemies.splice(j,1);
					}
				}
			}
			//  else {
			// 	//no one will have this class yet if they don't satisfy the if condition above. so remove it. 
			// 	$(gamePlayersClass[i]).closest("a").removeClass("defenderCharacter");
			// }
		}
		$(".getStarted").empty().append("<h2>Attack when you're ready!</h2>");
		// $(".enemyPlayers").after("<div class='row' id='attackButton'></div>");
		// $("#attackButton").append("<div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'></div>");
		//.find(".col-lg-12").append
		//TO FIX
		// debugger;
		if(($("div").hasClass("attackButton") === false)) {
			var html = "<div class='row text-center attackButton'>" + 
							"<div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'>" + 
									"<button type='button' class='btn btn-success attackBtn'>Attack!</button>" +
							"</div>" +
						"</div>";
			$(".enemyPlayers").after(html);
		} else {
			$(".attackButton").html("<div class='row text-center attackButton'>" + 
							"<div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'>" + 
									"<button type='button' class='btn btn-success attackBtn'>Attack!</button>" +
							"</div>" +
						"</div>");
		};
		// $("#attackButton").append("<div class='col-lg-12 col-md-12 col-sm-12 col-xs-12' id'attackbuttoncol'></div>");
		// //doesn't work
		// $("#attackbuttoncol").append("<button type='button' class='btn btn-success' id='attackBtn'>Attack!</button>");
		
		for (j in gameDefenders) {
			$(".defenderPlayers").append("<div class='col-lg-3 col-md-3 col-sm-3 col-xs-3'></div>");
			$(".defenderPlayers").find(".col-lg-3").last().append($(gameDefenders[j]));
		}
		//defender selection
		// debugger;
	}; 

	// There aren't any defenders currently.

	// $("a").click(function(){
 //        $(".enemyPlayers").off("click", defenderSelection);
 //    });
		//repeat onclick function above, assign defenderCharacter class

};


function attack () {
	// debugger;
	event.stopPropagation();
	// $("body").on("click", "button",function (event) {
		if (gameDefenders.length > 0 && gameHeroes.length > 0 && $(this).hasClass("attackBtn")) {
			// on click run attack function
			myCharacterName = $(gameHeroes[0]).data("name");
			// defenderHP = $(gameDefenders[0]).data("hp");
			defenderAP = $(gameDefenders[0]).data("ap");
			defenderName = $(gameDefenders[0]).data("name");
			var tempArr = gameHeroes[0].split(".");
			var temp = tempArr.shift();
			// console.log(tempArr);
			for (var i = 0; i < gamePlayersClass.length; i++) {
				if ($(gamePlayersClass[i]).hasClass(tempArr[0])) {
					// debugger;
					myCharacterHP = $(gamePlayersClass[i]).data("hp") - defenderAP;
					// $(gamePlayersHP[i]).find("h4:last").replaceWith($("<h4>HP : " + myCharacterHP + "</h4>"));
					$(gamePlayersClass[i]).data("hp",myCharacterHP);
					console.log("my character's HP is: " + myCharacterHP);
					$(gamePlayersHP[i]).find("h4:last").replaceWith($("<h4>HP : " + myCharacterHP + "</h4>"));
					//add attack statement below button (once)
				}
			}
			var tempArrE = gameDefenders[0].split(".");
			var tempE = tempArrE.shift();
			//returns NaN to hero HP if game Defender AP can't be returned. need a workaround
			for (var j = 0; j < gamePlayersClass.length; j++) {
				if ($(gamePlayersClass[j]).hasClass(tempArrE[0])) {
					myCharacterApAmp += $(gameHeroes[0]).data("ap");
					defenderHP = $(gamePlayersClass[j]).data("hp") - myCharacterApAmp;
					$(gamePlayersClass[j]).data("hp",defenderHP);
					console.log("my character's AP is: " + myCharacterApAmp);
					console.log("Defender's AP is: " + defenderAP);
					console.log("defender's HP is: " + defenderHP);
					$(gamePlayersHP[j]).find("h4:last").replaceWith($("<h4>HP : " + defenderHP + "</h4>"));	
				}		
			}
		}


	// function roundChecker () {
		// either keep in round checker or add to attack (so that you can kill it when attack conditions are met)
		
		
		if ($("button.attackBtn").on("click") && ($("div").hasClass("attackMessage") === false)) {
			var attackMessage = "<div class='row text-center attackMessage'>" + 
									"<div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'>" + 
										"<h3>" + defenderName + " attacked you for " + defenderAP + " damage!</h3>" +
										"<h3>You attacked " + defenderName + " for " + myCharacterApAmp + " damage!</h3>" +
									"</div>" +
								"</div>";
			$(".attackBtn").after(attackMessage);
		} 
		else if ($("div").hasClass("attackMessage")) {
			 // debugger;
				$(".attackMessage").html("<div class='row text-center attackMessage'>" + 
									"<div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'>" + 
										"<h3>" + defenderName + " attacked you for " + defenderAP + " damage!</h3>" +
										"<h3>You attacked " + defenderName + " for " + myCharacterApAmp + " damage!</h3>" +
									"</div>" +
								"</div>");
		}
		
		// debugger;

		if (defenderHP < myCharacterHP  && defenderHP < 0 && $("a.enemyCharacter").length !== 0) {
			$(".getStarted").empty().append("<h2>Choose another Enemy.</h2>");
			$(".attackMessage").html("<div class='row text-center attackMessage'>" + 
							"<div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'>" + 
								"<h3> You've defeated " + defenderName + " </h3>" +
								"</div>" + 
							"</div>");
			$("a.defenderCharacter").remove();
			
			gameDefenders.pop();
		} else if (myCharacterHP <= 0 && defenderHP > myCharacterHP && $("a.enemyCharacter").length !== 0) {
			$(".getStarted").empty().append("<h2> You lost! " + defenderName + " Wins! </h2>");
			// $(".attackMessage").remove();	
			// $("div.attackButton").removeClass("attackButton");
			// $("div.attackButton").empty().html(reset)
			gameHeroes.pop();

		}

		var reset = "<div class='row text-center restart'>" + 
								"<div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'>" + 
										"<button type='button' class='btn btn-success restartBtn'>Play Again</button>" +
								"</div>" +
							"</div>"
		// debugger;
		//requires you to press attack again and displays NaN
		if (gameDefenders.length === 0 && gameEnemies.length === 0 && ($("a").hasClass("enemyCharacter") === false && $("a").length<=1)) {
			$(".getStarted").empty().append("<h1>You Win!</h1>");
			$(".attackMessage").remove();
			$("div.attackButton").empty().html(reset)
			$("div.attackButton").removeClass("attackButton");
		}

		if ((gameHeroes.length === 0)) {
			if ($("div.restart").hasClass("restart") === false) {
					$(".attackButton").empty().html(reset);
					$("div.attackButton").removeClass("attackButton");
			}

			//add an if statement so that button doesn't repeatedly appear.
		}
		if (($("a.enemyCharacter").length === 0) && ($("a.defenderCharacter").length === 0) && ($("a").length<=1)) {
			// debugger;
			if ($("div.restart").hasClass("restart") === false) {
					$(".attackButton").empty().html(reset);
					$("div.attackButton").removeClass("attackButton");
			}
		}

		

		//restart function (on click event)

		//if enemy array.length = 0, you win. ***pop up (modal) mycharacter gif. 
		//if hero array.length = 0 OR if hero hp <=0 you lose ***pop up (modal) defender gif.


	// }


}

function restart () {
	// debugger;
	// $("div").on("click.restart", "button", function (event) {
		// debugger	;
		// event.stopPropagation();
		if ($(this).hasClass("restartBtn")) {
			//clone doesn't work for 2nd round. nothing is cloned. console.log(clone) shows no inner HTML.
			//empty the start players
			$(".startPlayers").empty();
			$(".enemyPlayers").empty();
			$(".defenderPlayers").empty();
			//consider removing restart row
			$("div.restart").empty();
			//add back start players
			$(".startPlayers").replaceWith(clonePlayers);
			//remove the end of game text
			$(".getStarted").empty();
			$(".attackMessage").empty();
				//add back the start of game text
			$(".getStarted").replaceWith(cloneMessage);
			//reset the game arrays
			gamePlayers = $("a");
			gamePlayersClass = [".bellamy",".alie",".dante",".clarke"];
			gamePlayersHP = [".bellamyHP",".alieHP",".danteHP",".clarkeHP"];
			gameDefenders = [];
			gameEnemies = [];
			gameHeroes = [];
				//include all game functions
			start();
		}
		//  else if ($(this).hasClass("attackBtn")) {
		// 	$(this).addClass("restartBtn");
		// 	restart();
		// }
	// });

}

$(document).ready(function() {
	start();
	// $("body",".jumbotron").attr("<img src=../images/Wiki_background.jpg>")
	// document.getElementById("jumbotron").style.backgroundImage="url(assets/images/Wiki_background.jpg)";
	document.querySelector("body").style.backgroundImage="url(assets/images/Wiki_background.jpg)";
});

//notes - just use the correct bootstrap class name to append a new div img, etc when you write the code 
