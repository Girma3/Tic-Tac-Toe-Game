//create a board using module pattern
 const GameBoard = (function(){
  let board = [];
  const getBoard = () => board
  
  
 
  return{getBoard}
})();
//factory function to make players name and mark

//module too display the cells and player mark
const displayControl = (function(){
  //render the board  with cell(buttons)
 const myBoard = GameBoard.getBoard();
 
  
  const grid = document.querySelector('.board');
  
  function display(){
  const grid = document.querySelector('.board')
  console.log(grid)
    
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
  
  

return{display}
})();


function GameController(playerOneName = 'player one',playerTwoName='player two'){

  //call the board and players factory
  //store the player moves in array
 
  let playersMoves = GameBoard.getBoard()
 
  const players = [
    {
      name:playerOneName,
      playerMark:"x"
    },
    {
      name:playerTwoName,
    playerMark:"o"}
  ];
  
    
   
   
   let activePlayer = players[0];
   const swithTurn = ()=>{
     
     activePlayer = activePlayer === players[0] ? players[1] : players[0];
     
     
    }
    const getActivePlayer = ()=>activePlayer
    const printBoard =()=>{
      //displayControl.display()
      let msgTurn = getActivePlayer().name
      return msgTurn

    }
    const playRound = (freeCell)=>{
      freeCell.textContent = getActivePlayer().playerMark
      GameBoard.getBoard().push(getActivePlayer().playerMark)
    
      
      
      
      //check winner
     
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
        
      let gameState = document.querySelectorAll('.cell')
     
      
      for (let i = 0; i <= 7; i++) {
        //console.log(gameState)
        //grap the inner array from winingcombo[0,1,2]
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]].textContent;
        let b = gameState[winCondition[1]].textContent;
        let c = gameState[winCondition[2]].textContent;
        
        // if (a === '' || b === '' || c === '') {
        //     continue;
        // }
        // console.log(a == "")
        
        
         if (a === b && b === c && c != "") {
            console.log(winCondition)
            
    
           let winnwr = document.querySelector('.who-won')
           let haa = document.querySelector('h1')
           haa.textContent = getActivePlayer().name
             console.log(a)
            //break
        }
      
      }
      
    
      }
      checkwins()
      
      swithTurn()
      
     
    }
    //intial turn
    printBoard()
    return{playRound,getActivePlayer}
   
}
  // function dropMark(itemToMark){
    
  //   //check all 9 cell are empty and player mark in array is less than 9 moves
  //   if(itemToMark.textContent == "" && playersMoves.length < 9){
      
      
  //     //store the moves (activeplayer mark in array called (get))
  //     playersMoves.push(swithTurn())

  //     itemToMark.textContent = activePlayer.playerMark
  //     //console.log(playersMoves)
  //     //console.log(playerArray)
     
    //   } 
  
  function ScreenControll(){
    const game = GameController()
    displayControl.display()
    
    let playerturn = document.querySelector('h1');
    // let cell = document.querySelector('.cell');
    const boardDiv = document.querySelector('.board')
    
   // playerturn.textContent = game.printBoard()
   const updateScreen =()=>{
   
   
    
    
   
    let activeplayer = game.getActivePlayer();
    let newBoard = GameBoard.getBoard()
    console.log(newBoard)
   
    

    
    playerturn.textContent = `${activeplayer.name}'s turn`
    
   
    
   }
   function handleClick(e){
    
    let cellClicked = e.target.dataset.index
    const cell =  document.querySelector(`[data-index='${e.target.dataset.index}']`)
    
     if(cell.textContent != "" || !cellClicked)return
    else{
     
      game.playRound(cell)
     
     // console.log(GameBoard.getBoard())
      updateScreen()
     
    }

   


   }
   
   
    boardDiv.addEventListener("click",handleClick)
    

    //console.log(boardDiv)
  
updateScreen()


  
}
ScreenControll()


   
  
  
 
  

  
   
   
   

  
    
  
  
  
  // function addMark(e){
  //   //grab the data atribute value of the clicked item and call grabmark function to mark it
   
  //   let item = document.querySelector(`[data-index='${e.target.dataset.index}']`)
    
  //   let index = e.target.dataset.index
    
  //   playerArray.push(Number(index))
  //   grabmark(item)
  //   checkwins()
    
  //   }
 
  
  
 





