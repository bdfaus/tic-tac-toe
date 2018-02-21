console.log("connected");
var xTurn = true;
box = document.querySelectorAll(".one");
var noWinner = true;

xBoxes = [];
oBoxes = [];
winSeq = [[1,2,3],[1,4,7],[1,5,9],[2,5,8],[3,5,7],[3,6,9],[4,5,6],[7,8,9]]

start();

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