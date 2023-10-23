//create a board using module pattern
 const GameBoard = (function(){
  let board = [];
  const getBoard = () => board
  
  
 
  return{getBoard}
})();
//factory function to make players name and mark
const players = function(playerName,playerMark){
 return { playerName:playerName,
          playerMark:playerMark}

}
//module too display the cells and player mark

const displayControl = (function(){
  //render the board  with cell(buttons)
 const myBoard = GameBoard.getBoard();
 
  
  const grid = document.querySelector('.board');
  
  function diaplay(){
  
    
    for(let j=0;j<9;j++){
     
      let cellButton = document.createElement('button');
      cellButton.classList.add('cell')
      cellButton.className = "cell"
      cellButton.dataset.index = j
      //cellbutton text would be the player mark stored in array (myboard)
      cellButton.textContent = myBoard[j]
      
      grid.appendChild(cellButton)
    }
    
    
  
  }
  
  

return{diaplay}
})();

 const GameController = (function(){
  //initial empty cells first
  displayControl.diaplay()
  
  //call the board and players factory
  //store the player moves in array
   let playersMoves = GameBoard.getBoard()
   let  player = players("girma","p")
   let playerSecond = players("enken","Q")
   let activePlayer  = player.playerMark;

   //function to mark specific cell with player token
  function grabmark(itemToMark){
    
    //check all 9 cell are empty and player mark in array is less thsn 9 moves
    if(itemToMark.textContent == "" && playersMoves.length < 9){
      //store the moves (activeplayer mark in array called (get))
      playersMoves.push(swithTurn())

      itemToMark.textContent = activePlayer
      }
      
    } 
  
   //funstion to return active player mark 
   
   function swithTurn(){
    
    activePlayer = activePlayer === player.playerMark ? playerSecond.playerMark : player.playerMark;
    console.log(activePlayer)
    return activePlayer
   }
  

   
   
   
   
   
   
   
   
  
  
 
 
  
  function addMark(e){
    //grab the data atribute value of the clicked item and call grabmark function to mark it
   
    let item = document.querySelector(`[data-index='${e.target.dataset.index}']`)
    grabmark(item)
    //let my = document.querySelector('[data-index="6"]')
    console.log(item)
    console.log(playersMoves)
    
    

  }
 
  let cells = document.querySelectorAll('.cell')
  console.log(cells)
  cells.forEach(btn=>{
    btn.addEventListener("click",addMark)
  })
  
 

})();
GameController


 