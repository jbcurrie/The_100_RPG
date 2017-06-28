
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
var clonePlayers = $("#startPlayers").clone(true);
var cloneMessage = $("#getStarted").clone();
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
	$(gamePlayersID[0]).append(bellamy);
	var alie = $("<h4>HP : " + $(gamePlayersClass[1]).data("hp") + "</h4>");
	$(gamePlayersID[1]).append(alie);
	var clarke = $("<h4>HP : " + $(gamePlayersClass[2]).data("hp") + "</h4>");
	$(gamePlayersID[2]).append(clarke);
	var dante = $("<h4>HP : " + $(gamePlayersClass[3]).data("hp") + "</h4>");
	$(gamePlayersID[3]).append(dante);
	pickHero();
	defenderSelection();
	$("body").on("click.attack", "button", function (event) {
	// event.stopPropagation();
		if (gameDefenders.length > 0) {
			//debugger;
			attack();
		}
		roundChecker();
	});

	$("div").on("click", "button", function (event) {
		if ($("div").hasClass("restart")) {
			// debugger;
			// if this button pressed, reload the game
			restart();
		}
	});
	// $("a").addClass("myCharacter");
	// // $("body",".jumbotron").attr("<img src=../images/Wiki_background.jpg>")
	// // document.getElementById("jumbotron").style.backgroundImage="url(assets/images/Wiki_background.jpg)";
	// document.querySelector("body").style.backgroundImage="url(assets/images/Wiki_background.jpg)";
	// pickHero();
	// defenderSelection();
	//  // do {
 //    $("body").on("click.attack", "button", function (event) {
	// // event.stopPropagation();
	// 	if (gameDefenders.length > 0) {
	// 		//debugger;
	// 		attack();
	// 	}
	// 	roundChecker();
	// });
}
// });	


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
					// var placeHolder = $(gamePlayersClass[i]).closest("a").detach();
					gameEnemies.push(gamePlayersClass[i]);
					//$(gamePlayersClass[i]).closest(".col-lg-3").parent().detach();
					//to do: .remove() /.detach() the ".col" where the "a"'s' were reassigned
				}
			}
			$("#getStarted").empty().append("<h2>Select your first enemy to begin the battle!</h2>");
			//for each game defenders, append to new class
			// $("#enemyPlayers").append();

			//use placeholder variable instead of below code
			for (j in gameEnemies) {
				$("#enemyPlayers").append("<div class='col-lg-3 col-md-3 col-sm-3 col-xs-3'></div>");
				$("#enemyPlayers").find(".col-lg-3").last().append($(gameEnemies[j]));		
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
	$("#enemyPlayers").one("click", "a", function (event) {
		event.stopPropagation();
		// console.log(this);
		for (var i = 0; i < gamePlayers.length; i++) {
		// console.log(i);
			if (this.closest("a") === gamePlayers.get(i)) {
				$(gamePlayersClass[i]).closest("a").addClass("defenderCharacter");
				gameDefenders.push(gamePlayersClass[i]);
				//gameEnemies.pop() acts as an enemy counter. not import that the array value doesn't match the character
				for (var j = 0; j < gameEnemies.length; j++) {
					debugger;
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
		$("#getStarted").empty().append("<h2>Attack when you're ready!</h2>");
		// $("#enemyPlayers").after("<div class='row' id='attackButton'></div>");
		// $("#attackButton").append("<div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'></div>");
		//.find(".col-lg-12").append
		//TO FIX
		// debugger;
		if(($("div").hasClass("attackButton") === false)) {
			var html = "<div class='row text-center attackButton'>" + 
							"<div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'>" + 
									"<button type='button' class='btn btn-success' id='attackBtn'>Attack!</button>" +
							"</div>" +
						"</div>"
			$("#enemyPlayers").after(html);
		};
		// $("#attackButton").append("<div class='col-lg-12 col-md-12 col-sm-12 col-xs-12' id'attackbuttoncol'></div>");
		// //doesn't work
		// $("#attackbuttoncol").append("<button type='button' class='btn btn-success' id='attackBtn'>Attack!</button>");
		
		for (j in gameDefenders) {
			$("#defenderPlayers").append("<div class='col-lg-3 col-md-3 col-sm-3 col-xs-3'></div>");
			$("#defenderPlayers").find(".col-lg-3").last().append($(gameDefenders[j]));
		}
		//defender selection

		//repeat onclick function above, assign defenderCharacter class

		//
	});
};


function attack () {
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
			// $(gamePlayersID[i]).find("h4:last").replaceWith($("<h4>HP : " + myCharacterHP + "</h4>"));
			$(gamePlayersClass[i]).data("hp",myCharacterHP);
			console.log(myCharacterHP);
			$(gamePlayersID[i]).find("h4:last").replaceWith($("<h4>HP : " + myCharacterHP + "</h4>"));
			//add attack statement below button (once)
		}
	}
	var tempArrE = gameDefenders[0].split(".");
	var tempE = tempArrE.shift();

	for (var j = 0; j < gamePlayersClass.length; j++) {
		if ($(gamePlayersClass[j]).hasClass(tempArrE[0])) {
			myCharacterApAmp += $(gameHeroes[0]).data("ap");
			defenderHP = $(gamePlayersClass[j]).data("hp") - myCharacterApAmp;
			$(gamePlayersClass[j]).data("hp",defenderHP);
			// console.log(defenderHP);
			$(gamePlayersID[j]).find("h4:last").replaceWith($("<h4>HP : " + defenderHP + "</h4>"));	

			console.log(myCharacterApAmp);
			console.log(defenderHP);
		}		
	}
}

function roundChecker () {
	// either keep in round checker or add to attack (so that you can kill it when attack conditions are met)
	if ($("body #attackBtn").on("click.attack") && ($("div").hasClass("attackMessage") === false)) {
		var attackMessage = "<div class='row text-center attackMessage'>" + 
								"<div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'>" + 
									"<h3>" + defenderName + " attacked you for " + defenderAP + " damage!</h3>" +
									"<h3>You attacked " + defenderName + " for " + myCharacterApAmp + " damage!</h3>" +
								"</div>" +
							"</div>";
		$("#attackBtn").after(attackMessage);
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

	if (defenderHP <= 0) {
		$("#getStarted").empty().append("<h2>Choose another Enemy.</h2>");
		$(".attackMessage").html("<div class='row text-center attackMessage'>" + 
						"<div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'>" + 
							"<h3> You've defeated " + defenderName + " </h3>" +
							"</div>" + 
						"</div>");
		$("a.defenderCharacter").remove();
		// $(gameDefenders[0]).removeClass("defenderCharacter");
		gameDefenders.pop();
		//run a for loop, search through gameEnemies for the index that matches the value of the game defender, and splice it
		// gameEnemies.splice($("a.defenderCharacter").index(0),1);
		// removeA(gameEnemies, gameEnemies.closest("a"));
		// gameEnemies.pop();
		defenderSelection();
	}
	// debugger;
	//requires you to press attack again and displays NaN
	if (gameDefenders.length === 0 && gameEnemies.length === 0 && ($("a").hasClass("enemyCharacter") === false)) {
		$("#getStarted").empty().append("<h1>You Win!</h1>");
		$(".attackMessage").remove();
		$("div.attackButton").remove();
		//add an if statement so that button doesn't repeatedly appear.
		if(($("div").hasClass("restart") === false))
			var html = "<div class='row text-center restart'>" + 
								"<div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'>" + 
										"<button type='button' class='btn btn-success' id='restartBtn'>Play Again</button>" +
								"</div>" +
							"</div>"
				$("#getStarted").after(html);

	}

	//restart function (on click event)

	//if enemy array.length = 0, you win. ***pop up (modal) mycharacter gif. 
	//if hero array.length = 0 OR if hero hp <=0 you lose ***pop up (modal) defender gif.


}

function restart () {
	//empty the start players
	$("#startPlayers").empty();
	$("#enemyPlayers").empty();
	$("#defenderPlayers").empty();
	$("div.restart").remove();
	//add back start players
	$("#startPlayers").replaceWith(clonePlayers);
	//remove the end of game text
	$("#getStarted").empty();
		//add back the start of game text
	$("#getStarted").replaceWith(cloneMessage);
	//reset the game arrays
	gamePlayersClass = [".bellamy",".alie",".dante",".clarke"];
	gamePlayersID = ["#bellamy","#alie","#dante","#clarke"];
	gameDefenders = [];
	gameEnemies = [];
	gameHeroes = [];
	gamePlayers = $("a");
		//include all game functions
	start();

}

$(document).ready(function() {
	start();
	// $("body",".jumbotron").attr("<img src=../images/Wiki_background.jpg>")
	// document.getElementById("jumbotron").style.backgroundImage="url(assets/images/Wiki_background.jpg)";
	document.querySelector("body").style.backgroundImage="url(assets/images/Wiki_background.jpg)";
});

//notes - just use the correct bootstrap class name to append a new div img, etc when you write the code 
