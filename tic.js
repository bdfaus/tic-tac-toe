console.log("connected");
var reset = document.getElementById("reset")
var box = document.querySelectorAll(".one");
var player = document.getElementById("player");
var comp = document.getElementById("comp");
var humanX = document.getElementById("playX");
var humanO = document.getElementById("playO");
var winAnnounce = document.getElementById("winAnnounce");
var boardContainer = document.getElementById("board");
var optionsContainer = document.getElementById("options");
var playerContainer = document.getElementById("playerSelect");
boardContainer.style.display = "none";
playerContainer.style.display = "none";

//hides options div, shows gameplay div
function goGameDisp(){
	playerContainer.style.display = 'none';
	optionsContainer.style.display = "none";
	boardContainer.style.display = "grid";
}

//changes board to select-player options
function goPlayerDisp(){
	playerContainer.style.display = 'block';
	optionsContainer.style.display = "none";
}

var compPlayerX = false;
var compPlayerO = false;
var xTurn = true;
var potentialWinningCombo;
xBoxes = [];
oBoxes = [];
winSeq = [[1,2,3],[1,4,7],[1,5,9],[2,5,8],[3,5,7],[3,6,9],[4,5,6],[7,8,9]]; //represents winning sequences where numbers are IDs of boxes
firstMoveNotMid = [1,3,7,9]; //if middle spot is taken, pick a corner for first move.

player.addEventListener('click',function(){
	goGameDisp();
	compPlayerO = false;
	compPlayerX = false;
	start();
});

comp.addEventListener('click',function(){
	goPlayerDisp();
});

humanX.addEventListener('click',function(){
	compPlayerO = true; ///integrate this with playerBoxes somehow?
	compBoxes = oBoxes;
	humanBoxes = xBoxes;
	goGameDisp();
	start();
})

humanO.addEventListener('click',function(){
	compPlayerX = true; ///integrate this with playerBoxes somehow?
	compBoxes = xBoxes;
	humanBoxes = oBoxes;
	goGameDisp();
	start();
})

reset.addEventListener('click',function(){
	compPlayerO = false;
	compPlayerX = false;
	resetGame();
	playerContainer.style.display = "none";
	optionsContainer.style.display = "block";
	boardContainer.style.display = "none";
});


//adds click event listener to activate playerBoxes()
function start(){
	box.forEach(function(element){
		element.addEventListener('click',playerBoxes);
	});
	if (compPlayerX){
		findNextPlay();
	}
}

//resets game board but default to game mode that was played in previous game (by not changing compPlayer boolean)
function resetGame(){
	winAnnounce.textContent = "And the winner is ";
	box.forEach(function(el){
		el.textContent = "";
	});
	xTurn = true;
	potentialWinningCombo = [];
	xBoxes = [];
	oBoxes = [];
	if (compPlayerX){
		compBoxes = xBoxes;
		humanBoxes = oBoxes;
	}
	if (compPlayerO){
		compBoxes = oBoxes;
		humanBoxes = xBoxes;
	}
	winSeq = [[1,2,3],[1,4,7],[1,5,9],[2,5,8],[3,5,7],[3,6,9],[4,5,6],[7,8,9]]; //represents winning sequences where numbers are IDs of boxes
	firstMoveNotMid = [1,3,7,9]; //if middle spot is taken, pick a corner for first move.
	start();
}



//REFACTOR THIS TO ENABLE SINGLE FUNCTION FOR X AND SINGLE FOR O, WOULD MAKE DIFFERNTIATING HUMAN VS. COMP
// GAME PLAY A BIT EASIER
function playerBoxes(){
	debugger;
	if (this.textContent === ''){ //if clicked box textContent ===''
		if (xTurn){
			this.textContent = "X";		
			xTurn = false;
			xBoxes.push(Number(this.id));
			if (xBoxes.length > 2){
				checkWinner(xBoxes);
			}
			if (compPlayerO){
				findNextPlay();
			}
			if (winSeq.length === 0  && compPlayerX){
				setTimeout(resetGame,2000);
			}
		} else {
			this.textContent = "O";
			xTurn = true;
			oBoxes.push(Number(this.id));
			if (oBoxes.length > 2){
				checkWinner(oBoxes);
			}
			if (compPlayerX){
				findNextPlay();
			}
		}
	}
}

//compares current player sequence (xBoxes array / oBoxes array) against winning sequences (winSeq array)
	//if there's a match, winner is alerted and click event listners are removed
function checkWinner(boxesOwned){
	var almost = false;
	winSeq.forEach(function(element){
		var x = 0;
		boxesOwned.forEach(function(check){
			if(element.includes(check)){
				x++;
				if (x===2){
					potentialWinningCombo = element;
					almost = true;
				}
				else if (x===3){
					winAnnounce.textContent += document.getElementById(boxesOwned[0]).textContent;
					//removes click event listener from boxes to prevent further play
					winSeq = [];
					box.forEach(function(element){
						element.removeEventListener('click',playerBoxes)
					});
					findNextPlay();
				}
			}
		})
	x = 0;
	})
	if (xBoxes.length + oBoxes.length === 9 && winSeq.length > 0){
		winAnnounce.textContent += "nobody";
		winSeq = [];
	}
	if (almost){
		return true;
	}
}

//returns whether a square is available or not.
function isAvailable(square){
	var check = String(square);
	var specificBox = document.getElementById(check);
	 if (specificBox.textContent === ''){
	 	return true;
	 } else {
	 	return false;
	 }
}

//for the computer, if the middle box is open, take it. Otherwise, randomly choose a corner.
//middle box is best play, and corners are second best (for opening move)
function randomBestPlay(){
	if (isAvailable(5)){
		document.getElementById("5").click();
	} else {
		var i =0;
		while (i===0){
			if (firstMoveNotMid.length > 0){
				var select = Math.floor(Math.random() * firstMoveNotMid.length);
				var play = String(firstMoveNotMid[select]);
				if (isAvailable(play)){
					document.getElementById(play).click();
					i++;
				} else {
					firstMoveNotMid.splice(select,1);
				}
			} else {
				var select = Math.floor(Math.random() * 9);
				var play = box[select].id;
				console.log(play);
				if (isAvailable(play)){
					document.getElementById(play).click();
					i++;
				}
			}
		}
	}
}

//computer finds next play and click is simulated.
function findNextPlay(){
	if (winSeq.length > 0){
		if (compBoxes.length === 0){
			randomBestPlay();
		} else {
			if (checkWinner(compBoxes)){
				playOffense();
				checkWinner(compBoxes);
			} else if (checkWinner(humanBoxes)){
				playDefense();
			} else {
				// checkWinner(oBoxes);
				randomBestPlay();
			}
		}
	} else {
		setTimeout(resetGame,2000);
	}
}

function playDefense(){
	var i = 0;
	potentialWinningCombo.forEach(function(el){
		if (xBoxes.indexOf(el) === -1 && oBoxes.indexOf(el) === -1){
			var toRemove = winSeq.indexOf(potentialWinningCombo);
			//removes potentialWin... from winSeq array
			winSeq.splice(toRemove,1);
			almost = false;
			document.getElementById(el).click();
		} else if (i === 2){
			var toRemove = winSeq.indexOf(potentialWinningCombo);
			//removes potentialWin... from winSeq array
			winSeq.splice(toRemove,1);
			almost = false;
			findNextPlay();
		} else {
			i++;
		}
	})
}


function playOffense(){
	var i = 0;
	potentialWinningCombo.forEach(function(el){
		if (xBoxes.indexOf(el) === -1 && oBoxes.indexOf(el) === -1){
			almost = false;
			document.getElementById(el).click();
		} else if (i === 2){
			//removes potentialWin... from winSeq array
			var toRemove = winSeq.indexOf(potentialWinningCombo);
			winSeq.splice(toRemove,1);
			almost = false;
			findNextPlay();
		} else {
			i++;
		}
	})
	
}

