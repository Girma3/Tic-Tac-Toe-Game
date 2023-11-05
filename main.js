//create a board using module pattern
 const GameBoard = (function(){
  let board = ["","","","","","","","",""];
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
let p1 = players('gg',"o")
 let p2 = players('ai','x')

//factory function to make players name and mark
function GameController(){

  //call the board and players factory
  //store the player moves in array
 
 
 
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
      
      if(freeCell.textContent == ""){
      freeCell.textContent = getActivePlayer().playerMark
      let board = GameBoard.getBoard()
      //using splice method store clicked item and update the array or store the marks to display it using display module
      
      
      board.splice(freeCell.dataset.index,1,getActivePlayer().playerMark)
      
      
      }
    //check winner by accepting the board and creent player
    let board = GameBoard.getBoard()
    let player = getActivePlayer().playerMark
  
   function checkwins(board,mark){
       
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
     
     //loop through the winningconditon array
      for (let i = 0; i <= 7; i++) {
        
        //grab the inner array or  winingcombo[0,1,2] etc..
        //and a,b and c represent the 0,1,2 respectively depend on the inner array
        const winCondition = winningConditions[i];
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];
        
        if (a == b && b == c && c == mark) {
            console.log(winCondition)
            console.log(mark)
            let haa = document.querySelector('h2')
           haa.textContent = `${getActivePlayer().playerMark}`
            break
          }
       }
    }
    let newState = GameBoard.getBoard()
    let currentPlay = getActivePlayer().playerMark
    console.log(newState)
      checkwins(newState,currentPlay)
      
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
    
      playerturn.textContent = `${activeplayer.playerMark}'s turn`
    }
    //function to loop through the board and find empty cell using random index number 
function computerMoves(boards){
  
  for(let i = 0;i < boards.length;i++){
                       
    let random = Math.floor(Math.random()*9)
    let spot = boards[random]
    if(spot == ""){
        
    return random

      }

    }


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
        let currentBoard = GameBoard.getBoard();
        let freeCell  = document.querySelector(`[data-index='${computerMoves(currentBoard)}']`);
       
       //when only one cell left and if we click computermove function run
       // and we don't have free cell left to stop that use if statment 
       if(freeCell == undefined)return
       
        game.playRound(freeCell);
      
      
          updateScreen()
      }
     
     
      
      
    }
    
  }
   boardDiv.addEventListener("click",handleClick)
    updateScreen()
}
ScreenControll()
 
 
  
  //Ai for the hard level module to return index
  //function that accept board and player object(currentPlayer)
function aiMove(){
  let player = { man:"o",computer:"x"}

  function minimax(boardState, currentPlayer){
    let freeSpot = getEmptySpaces(boardState);
    
    //array of empty space that  doesn't  have marked yet 
// BASE (to stop the recursion)
if(checkWinner(boardState, player.computer) ) return { evaluation : +10 };
if( checkWinner(boardState, player.man)      ) return { evaluation : -10 };
if( freeSpot.length == 0                   ) return { evaluation : 0 };



// save the index there evaluation or the result u would get if you move in that space
let moves = [];

// loop over the empty space and get evaluation or the result
for( let i = 0; i < freeSpot.length; i++){
    // index of empty space
    let index = freeSpot[i];
   
console.log(boardState[6])
    // find that empty space to mark it
    let backup = boardState[index];

    // mark the spot using that index with the player mark
    boardState[index] = currentPlayer;

    // save the index and it's evaluation
    let move = {};
    move.index = index;
    // evaluation for the move using that index using minimax function recursion occur
    if( currentPlayer == player.computer){
        move.evaluation = minimax(boardState, player.man).evaluation;
     
    }else{
        move.evaluation = minimax(boardState, player.computer).evaluation;
    }

    // restore the space or the board to it's unmarked state
    boardState[index] = backup;
  

    // save the move which holds index and evaluation sing minimax in array( moves)
    moves.push(move);
    console.log(moves)
   
}

// choose the bestmove using minimax algorithm
/* maximizer which is the ai on it's turn should aim to highst score
     when human turn choose lowest score
    which limit human to win  to do that
     loop through moves which had evaluation and choose from it
    */
let bestMove;

    if(currentPlayer == player.computer){
        
        //maximizer
        let bestEvaluation = -Infinity;
        for(let i = 0; i < moves.length; i++){
            if( moves[i].evaluation > bestEvaluation ){
                bestEvaluation = moves[i].evaluation;
                bestMove = moves[i];
            }
        }
    }
    else{
        // minimizer the opposite of maximizer choose lowest evaluation
        let bestEvaluation = +Infinity;
        for(let i = 0; i < moves.length; i++){
            if( moves[i].evaluation < bestEvaluation ){
                bestEvaluation = moves[i].evaluation;
                bestMove = moves[i];
            }
        }
    }

return bestMove;

  
}


//function that accept board  loop over it
//and put the index of that free space in the array and return that array
function getEmptySpaces(board){
        let indeices = []
        for(let i = 0;i  < board.length;i++){
            if(board[i] == ""){
              indeices.push(i)
            }
        }
     return indeices;
}
const bestMoves = () => minimax()
return{bestMoves}
}
let player = { man:"o",computer:"x"}
let gameData = ["x","o","x",
"x","o","x",
"","","o"]
//onsole.log(aiMove.bestMov(gameData,player))

  
   
   
   

  
    
  
  

 
  
  
 





