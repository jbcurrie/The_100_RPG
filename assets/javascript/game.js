//float hero, defender, attack button and message onto same row
//instead of modal, gif html and set timeout, clear gif function

var myCharacterAP = 0;
var myCharacterApAmp = 0;
var myCharacterHP = 0;
var myCharacterName = "";
var defenderAP = 0;
var defenderHP = 0;
var defenderName = "";
var detachEnemies = [];
var detachCharacters = [];
var detachDefenders = [];


var gamePlayers = $("a");
var clonePlayers;
var cloneMessage;
//HOLDS ATTRIBUTES AND CONTROLS CLICK FUNCTION
var gamePlayersClass = [".bellamy",".alie",".dante",".clarke"];
//SHOWS HP
var gamePlayersHP = [".bellamyHP",".alieHP",".danteHP",".clarkeHP"];
var gameDefenders = [];
var gameEnemies = [];
var gameHeroes = [];
//placed in global so its' not copied again on restart
var bellamy = $("<h4>HP : " + $(gamePlayersClass[0]).data("hp") + "</h4>");
$(gamePlayersHP[0]).append(bellamy);
var alie = $("<h4>HP : " + $(gamePlayersClass[1]).data("hp") + "</h4>");
$(gamePlayersHP[1]).append(alie);
var clarke = $("<h4>HP : " + $(gamePlayersClass[2]).data("hp") + "</h4>");
$(gamePlayersHP[2]).append(clarke);
var dante = $("<h4>HP : " + $(gamePlayersClass[3]).data("hp") + "</h4>");
$(gamePlayersHP[3]).append(dante);

function start() {
	$("a").addClass("myCharacter");
	myCharacterAP = 0;
	myCharacterApAmp = 0;
	myCharacterHP = 0;
	myCharacterName = "";
	defenderAP = 0;
	defenderHP = 0;
	defenderName = "";
	//runs the function to clone the game html that gets removed during restart
	clonePlayers = $(".startPlayers").clone();
	cloneMessage = $(".getStarted").clone();
	//selects hero, assigns enemies
	pickHero();
	// assigns defender
	defenderSelection();
	//sets HP AP attack parameters and conditions for win/loss
	attack();
	//resets the game, reloads the HTML code
	restart();
}


function pickHero () {
	$(".startPlayers").one("click", "a", function (event) {

		$("a").removeClass("myCharacter");
		
			for (var i = 0; i < gamePlayers.length; i++) {
			
				if (this.closest("a") === gamePlayers.get(i)) {
					$(gamePlayersClass[i]).closest("a").addClass("myCharacter");
					$(gamePlayersClass[i]).parent().addClass("hero-col");
					gameHeroes.push(gamePlayersClass[i]);
				
				} else {
					//push class to enemy array
					//remove from the current div
					//append to the enemy div
					$(gamePlayersClass[i]).closest("a").addClass("enemyCharacter");
				

					gameEnemies.push(gamePlayersClass[i]);
				
					detachCharacters.push($(gamePlayersClass[i]).closest(".col-lg-3").detach());
			
				}
			}

			$(".getStarted").empty().append("<h2>Select your first enemy to begin the battle!</h2>");
			//for each game defenders, append to new class

				$.each(detachCharacters, function(i,v) {
					$(".enemyPlayers").append(v);
				})	

	});	
};


function defenderSelection () {

	$(".enemyPlayers").on("click", "a", function(event) {
		if  (gameDefenders.length === 0) {

			for (var i = 0; i < gamePlayers.length; i++) {
			
				if (this.closest("a") === gamePlayers.get(i)) {

					$(gamePlayersClass[i]).closest("a").addClass("defenderCharacter");
					$(gamePlayersClass[i]).parent().addClass("defender-col");
					
					for (var j = 0; j < gameEnemies.length; j++) {
				 
						debugger;
						if ($("a.enemyCharacter").get(j) === $("a.defenderCharacter").get(0)) {
							$(gamePlayersClass[j]).closest("a").removeClass("enemyCharacter");
							gameEnemies.splice(j,1);
						}
					}
				 
					gameDefenders.push(gamePlayersClass[i]);
					detachEnemies.push($(gamePlayersClass[i]).closest(".col-lg-3").detach());
					//empty enemy players div
					//add back enemies
				}
		
			}
				$(".getStarted").empty().append("<h2>Attack when you're ready!</h2>");


				
				if(($("div").hasClass("attackButton") === false)) {
					var html = "<div class='row text-center attackButton'>" + 
									"<div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'>" + 
											"<button type='button' class='btn btn-success attackBtn'>Attack!</button>" +
									"</div>" +
								"</div>";
					$(".getStarted").after(html);
				} 

				$.each(detachEnemies, function(k,v) {
					$(".defenderPlayers").append(v);
				});

		
		}; 
	});

};


function attack () {
	
	$("div").on("click", "button", function(event) {
		event.stopPropagation();

			if (gameDefenders.length > 0 && gameHeroes.length > 0 && $(this).hasClass("attackBtn")) {
			
				myCharacterName = $(gameHeroes[0]).data("name");

				defenderAP = $(gameDefenders[0]).data("ap");
				defenderName = $(gameDefenders[0]).data("name");
				var tempArr = gameHeroes[0].split(".");
				var temp = tempArr.shift();
			
				for (var i = 0; i < gamePlayersClass.length; i++) {
					if ($(gamePlayersClass[i]).hasClass(tempArr[0])) {
						
						myCharacterHP = $(gamePlayersClass[i]).data("hp") - defenderAP;

						$(gamePlayersClass[i]).data("hp",myCharacterHP);
						console.log("my character's HP is: " + myCharacterHP);
						$(gamePlayersHP[i]).find("h4:last").replaceWith($("<h4>HP : " + myCharacterHP + "</h4>"));

					}
				}
				var tempArrE = gameDefenders[0].split(".");
				var tempE = tempArrE.shift();

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
				 
					$(".attackMessage").html("<div class='row text-center attackMessage'>" + 
										"<div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'>" + 
											"<h3>" + defenderName + " attacked you for " + defenderAP + " damage!</h3>" +
											"<h3>You attacked " + defenderName + " for " + myCharacterApAmp + " damage!</h3>" +
										"</div>" +
									"</div>");
			}
			
			var reset = "<div class='row text-center restart'>" + 
							"<div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'>" + 
									"<button type='button' class='btn btn-success restartBtn'>Play Again</button>" +
							"</div>" +
						"</div>"

			if (defenderHP < myCharacterHP  && defenderHP < 0 && $("a.enemyCharacter").length !== 0) {
				$(".getStarted").empty().append("<h2>Choose another Enemy.</h2>");
				$(".attackMessage").html("<div class='row text-center attackMessage'>" + 
								"<div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'>" + 
									"<h3> You've defeated " + defenderName + " </h3>" +
									"</div>" + 
								"</div>");

			
				detachDefenders.push($("a.defenderCharacter").closest(".col-lg-3").detach());
				$("a.defenderCharacter").remove();
				detachEnemies.shift();
				gameDefenders.pop();
				
			} else if (defenderHP < myCharacterHP  && defenderHP < 0 && $("a.enemyCharacter").length === 0) {
				$(".getStarted").empty();
				$(".attackMessage").html("<div class='row text-center attackMessage'>" + 
								"<div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'>" + 
									"<h3> You've defeated " + defenderName + " </h3>" +
									"</div>" + 
								"</div>");

			
				detachDefenders.push($("a.defenderCharacter").closest(".col-lg-3").detach());
				$("a.defenderCharacter").remove();
				detachEnemies.shift();
				gameDefenders.pop();
			} else if (myCharacterHP <= 0 && defenderHP > myCharacterHP && $("a.defenderCharacter").length !== 0) {
				$(".getStarted").empty().append("<h2> You lost! " + defenderName + " Wins! </h2>");
				gameHeroes.pop();
				
				if ($("div.restart").hasClass("restart") === false) {
						
						$(".attackButton").empty().remove();
						$(".getStarted").after($(reset));
				}
			}
// var modal = "<div class='modal fade' tabindex='-1' role='dialog'>" + 
// 			  "<div class='modal-dialog' role='document'>" + 
// 			    "<div class='modal-content'>" + 
// 			      "<div class='modal-header'>" + 
// 			        "<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" + 
// 			      + "</div>" + 
// 			      "<div class='modal-body'>" + 
// 			        "<img src='assets/images/alie_gif.gif' alt='winner'>" + 
// 			     "</div>" +
// 			      "<div class='modal-footer'>" +
// 			        "<button type='button' class='btn btn-default' data-dismiss='modal'>Close</button>" + 
// 			      "</div>" + 
// 			    "</div>" + 
// 			  "</div>" +
// 			"</div>";

			// 
			// 
			if (gameDefenders.length === 0 && gameEnemies.length === 0 && ($("a").hasClass("enemyCharacter") === false)) {
				
				$(".getStarted").empty().append("<h1>You Win!</h1>");
			
				$(".attackButton").empty().remove();
				$(".getStarted").after($(reset));
			}

		
	});

}

function restart () {
	// debugger;
	//remove event listeners at reset
	$("div").on("click", "button",function(event) {
		event.stopImmediatePropagation();

		if ($(this).hasClass("restartBtn")) {
			//empty the start players
			$(".enemyPlayers").off("click","a",defenderSelection); 
			$("div").off("click","button",attack); 
			$("div").off("click","button",restart); 
			$(gamePlayersClass).empty();
			gamePlayersClass.splice(0);
			$(".startPlayers").empty();
			$(".startPlayers").splice(0);
			$(".enemyPlayers").empty();
			$(".enemyPlayers").splice(0);
			$(".defenderPlayers").empty();
			$(".defenderPlayers").splice(0);
			$("div.restart").remove();
			//add back start players
			$(gameDefenders).empty();
			gameDefenders.splice(0);
			$(gameEnemies).empty();
			gameEnemies.splice(0);
			$(gameHeroes).empty();
			gameHeroes.splice(0);
			$(detachCharacters).empty();
			detachCharacters.splice(0);
			$(detachEnemies).empty();
			detachEnemies.splice(0);
			$(detachDefenders).empty();
			detachDefenders.splice(0);
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

			//include all game functions
			start();
			clonePlayers;
			cloneMessage;
		}
	});
}

$(document).ready(function() {
	start();
	document.querySelector("body").style.backgroundImage="url(assets/images/Wiki_background.jpg)";
}); 
