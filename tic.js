var xTurn = true;
box = document.querySelectorAll(".one");

//puts an X in a grid box if clicked
function addX(){
box.forEach(function(element){
  element.addEventListener('click',function(){
  this.textContent = "x"
  }
    )
});
}

//logic for game
//x or o turn
	//determine using xTurn boolean
//