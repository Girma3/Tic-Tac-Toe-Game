//create a board using module pattern
 const GameBoard = (function(){
  let board = [];
  const getBoard = () => board
  return{getBoard}
})();


//module too display the cells and player mark
const displayControl = (function(){
  //render the board  with cell(buttons)
 const myBoard = GameBoard.getBoard();
 const grids = document.querySelector('.board');
  
  function display(){
  
    
    for(let j=0;j<9;j++){
     
      let cellButton = document.createElement('button');
      cellButton.classList.add('cell')
      cellButton.className = "cell"
      cellButton.dataset.index = j
      //cellbutton text would be the player mark stored in array (myboard)
      cellButton.textContent = myBoard[j]
      
      grids.appendChild(cellButton)
    }
    
  }
  
  return{display}
})();
const players = (playerName,playerMark)=>{
  return{playerName,playerMark}
}
let p1 = players('gg',"x")
 let p2 = players('ai','5')

//factory function to make players name and mark
function GameController(){

  //call the board and players factory
  //store the player moves in array
 
  let playersMoves = GameBoard.getBoard()
 
  const players = [
    
      // name:playerOneName,
      // playerMark:"x"
      p1
    
    ,
    //   name:playerTwoName,
    // playerMark: "b"
    p2
  
  ];
  
    
   
   
   let activePlayer = players[0];
   const swithTurn = ()=>{
     
     activePlayer = activePlayer === players[0] ? players[1] : players[0];
    
     
     
    }
    const getActivePlayer = ()=>activePlayer
    
    
    // function to aaccept free cell or square 
    const playRound = (freeCell)=>{
      freeCell.textContent = getActivePlayer().playerMark
      //update the array or store the marks to display it using display module
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
       //grab allthe board or buttons 
      let gameState = document.querySelectorAll('.cell')
     //loop through the winningconditon array
      for (let i = 0; i <= 7; i++) {
        
        //grab the inner array or  winingcombo[0,1,2] etc..
        //and a,b and c represent the 0,1,2 respectively depend on the inner array
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]].textContent;
        let b = gameState[winCondition[1]].textContent;
        let c = gameState[winCondition[2]].textContent;
        
        if (a === b && b === c && c != "") {
            console.log(winCondition)
            let haa = document.querySelector('h2')
           haa.textContent = `${getActivePlayer().playerMark}`
            break
          }
       }
    }
      checkwins()
      
      swithTurn()
    
      
     
    }
    
    
    return{playRound,getActivePlayer}
   
}
  
  
  function ScreenControll(){
    const game = GameController()
    //render the board
    displayControl.display()
    let playerturn = document.querySelector('h1');
    const boardDiv = document.querySelector('.board')

  const updateScreen =()=>{
      let activeplayer = game.getActivePlayer();
      console.log(activeplayer)
      playerturn.textContent = `${activeplayer.playerMark}'s turn`
    }

   function handleClick(e){
    
    let cellClicked = e.target.dataset.index
    const cell =  document.querySelector(`[data-index='${e.target.dataset.index}']`)
     if(cell.textContent != "" || !cellClicked)return
     
    //if we play with ai caheck playname is "ai" active computer move else play by click
     else if(game.getActivePlayer().playerName !== 'ai'){
      
      game.playRound(cell)
     

     
      updateScreen()
      if(game.getActivePlayer().playerName == 'ai'){
        game.playRound(computerMoves())
          updateScreen()
      }
     
     
      
      
      

     }
    
    
 
    //  
      
 
     
    
    
      
      // updateScreen()
      
  }
   boardDiv.addEventListener("click",handleClick)
    updateScreen()
}
ScreenControll()

function computerMoves(){
  const cells = document.querySelectorAll('.cell')
  let texts;
  
  //for(let i = 0;i <= cells;i++){
 
    let computerMoves =  Math.floor(Math.random() * 9)
   
    let mark = cells[computerMoves]
   
   
  for(let i=0;i<=cells.length;i++){
      computerMoves =Math.floor(Math.random() * 9)
      mark = cells[computerMoves]
      if(mark.textContent == ""){
        texts = mark
       
        return texts
        console.log(texts)
        
      }
      
    
    
   }
   
  //}
    
  return mark
//console.log(computerMoves)
   
}
computerMoves()
 
  
 
  

  
   
   
   

  
    
  
  

 
  
  
 





