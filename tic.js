console.log("connected");
var xTurn = true;
box = document.querySelectorAll(".one");
var noWinner = true;

xBoxes = [];
oBoxes = [];
winSeq = [[1,2,3],[1,4,7],[1,5,9],[2,5,8],[3,5,7],[3,6,9],[4,5,6],[7,8,9]]

addPlay(xTurn);

//puts an X in a grid box if clicked and the box is empty
		//xTurn variable toggles to change to/from x/o turn
function addPlay(xTurn){
	box.forEach(function(element){
		element.addEventListener('click',function(){
			if (this.textContent === ''){ //if clicked box textContent ===''
				if (xTurn){
					this.textContent = "X";		
					xTurn = false;
					xBoxes.push(this.id);
				} else {
					this.textContent = "O";
					xTurn = true;
					oBoxes.push(this.id);
				}
			console.log(this.id)
			}
		})
	});
}

function checkWinner(){
	for (var i = 0; i < winSeq.length; i++){
		x = 0;
		if(x)

	}
	noWinner = false;
}


// game logic here
function game(){
	while(noWinner){
		addPlay(xTurn);
		checkWinner();
	}
}

//logic for game
//x or o turn
	//determine using xTurn boolean
//