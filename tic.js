console.log("connected");
var xTurn = true;
var box = document.querySelectorAll(".one");
var available = box;
var noWinner = true; //variable used to determine if winner
var player = document.getElementById("player");
var comp = document.getElementById("comp");

xBoxes = [];
oBoxes = [];
winSeq = [[1,2,3],[1,4,7],[1,5,9],[2,5,8],[3,5,7],[3,6,9],[4,5,6],[7,8,9]] //represents winning sequences where numbers are IDs of boxes

player.addEventListener('click',start);

//adds click event listener to activate playerBoxes()
function start(){
	box.forEach(function(element){
		element.addEventListener('click',playerBoxes)
	});
}

function playerBoxes(){
	if (this.textContent === ''){ //if clicked box textContent ===''
		if (xTurn){
			this.textContent = "X";		
			xTurn = false;
			xBoxes.push(Number(this.id));
			if (xBoxes.length > 2){
				checkWinner(xBoxes);
			}
		} else {
			this.textContent = "O";
			xTurn = true;
			oBoxes.push(Number(this.id));
			if (oBoxes.length > 2){
				checkWinner(oBoxes);
			}
		}
	console.log(this.id)
	}
}

//compares current player sequence (xBoxes array / oBoxes array) against winning sequences (winSeq array)
	//if there's a match, winner is alerted and click event listners are removed
function checkWinner(player){
	winSeq.forEach(function(element){
		x = 0;
		y = 0;
		player.forEach(function(check){
			if(element.includes(check)){
			x++;
			if (x===3){
				alert("Winner is " + document.getElementById(player[0]).textContent);
				noWinner = false;
				//removes click event listener from boxes to prevent further play
				box.forEach(function(element){
					element.removeEventListener('click',playerBoxes)
					});
				}
			}
		})
	x = 0;
	})
}

function findBestPlay(){

}

//To do
//create computer logic
//findBestPlay function for computer
//separate playerBoxes() function to use findBestPlay rather than 2nd human player
//implement start() or startComputer() --not yet made-- based on certain events (could use boolean for this?)