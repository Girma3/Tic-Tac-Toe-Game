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
  let playerArray = []
   
   let  player = players("girma","o")
   let playerSecond = players("enken","x")
  
   let activePlayer  = player;
   
   //function to mark specific cell with player token
  function grabmark(itemToMark){
    
    //check all 9 cell are empty and player mark in array is less than 9 moves
    if(itemToMark.textContent == "" && playersMoves.length < 9){
      
      
      //store the moves (activeplayer mark in array called (get))
      playersMoves.push(swithTurn())

      itemToMark.textContent = activePlayer.playerMark
      //console.log(playersMoves)
      //console.log(playerArray)
     
    
     
      
      
    } 

  }
   //function to return active player mark 
   
   function swithTurn(){
    
    activePlayer = activePlayer === player ? playerSecond : player;
    //console.log(activePlayer)
    
   
    //return activePlayer
   }

   function checkwins(){
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
  ];
  let gameState = document.querySelectorAll('button')
  console.log(gameState)
  for (let i = 0; i <= 7; i++) {
    //grap the inner array from winingcombo[0,1,2]
    const winCondition = winningConditions[i];
    let a = gameState[winCondition[0]].textContent;
    let b = gameState[winCondition[1]].textContent;
    let c = gameState[winCondition[2]].textContent;
    // if (a === '' || b === '' || c === '') {
    //     continue;
    // }
    if(a == "") return
    else if (a === b && b === c) {
        console.log(winCondition)

       let winnwr = document.querySelector('.who-won')
       winnwr.textContent = activePlayer.playerName
        // console.log(a == "o")
        
        
        
        break
    }
  }
  }
    
  
  
  
  
   
   
   
   
   
   
   
   
  
  
 
 
      
  function addMark(e){
    //grab the data atribute value of the clicked item and call grabmark function to mark it
   
    let item = document.querySelector(`[data-index='${e.target.dataset.index}']`)
    
    let index = e.target.dataset.index
    
    playerArray.push(Number(index))
    

    
    grabmark(item)
    checkwins()
    
    
    
  }
 
  let cells = document.querySelectorAll('.cell')
  console.log(cells)
  cells.forEach(btn=>{
    btn.addEventListener("click",addMark)
  })
  
 

})();
GameController



