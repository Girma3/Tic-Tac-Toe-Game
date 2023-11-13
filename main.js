//create a board using module pattern and this board will hold players mark
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
  
    
    for(let j = 0;j < 9;j++){
     
      let cellButton = document.createElement('button');
      cellButton.classList.add('cell')
      cellButton.className = "cell"
      cellButton.dataset.index = j
      //cellbutton text would be the player mark stored in array 
      cellButton.textContent = myBoard[j]
      grids.appendChild(cellButton)
    }
    
  }
  
  return{display}
})();

//factory function to make players name and mark
const players = (playerName,playerMark)=>{
  return{playerName,playerMark}
}
//factory function for swith turn.mark the cell using player mark and check the winner
function GameController(){
  let score_x = 0
  let score_o = 0
  //call the board and players factory 
   const players = [playerOne,playerTwo]
    
  let activePlayer = players[0];

  //function to swith turn bn players
   const swithTurn = ()=>{
      activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = ()=>activePlayer
    const checkWinner = ((board,mark)=>{
       
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
     //loop through the winningconditon array
    for (let i = 0; i <= 7; i++) {
      
      //grab the inner array or  winingcombo[0,1,2] etc..
      //and a,b and c represent the 0,1,2 respectively depend on the inner array
      const winCondition = winningConditions[i];
      let a = board[winCondition[0]];
      let b = board[winCondition[1]];
      let c = board[winCondition[2]];
      
      if (a == b && b == c && c == mark) {
         // console.log("winerrrrrr")
          let haa = document.querySelector('h2')
         haa.textContent = `${getActivePlayer().playerMark}`
          return true
        }
       
     }
  });
    
   
    // function to accept free cell and mark it with player mark
    const playRound = (freeCell)=>{
     
     if(freeCell == null) return
      else if(freeCell.textContent == ""){
  
      freeCell.textContent = getActivePlayer().playerMark
      //using splice method store clicked item and update the array or store the marks 
      //later to  display it using display module
      let board = GameBoard.getBoard()
          board.splice(freeCell.dataset.index,1,getActivePlayer().playerMark)
         }

    //check winner by accepting the board and  player mark
    let currentboardState = GameBoard.getBoard()
    let CurrentplayerMark = getActivePlayer().playerMark
    
    
    function winnerMsg(){
     
      
      //function to check the array is full or the board
      let fullBoard = (value)=>value != ""
      const winnerMsg = document.querySelector('.winner');
      const result = document.querySelector('.result-msg');
      let xScore = document.querySelector('.player-x-score');
      let oScore = document.querySelector('.player-o-score');
      if(checkWinner(currentboardState,CurrentplayerMark)== true){
      
        result.textContent = `Congratulation  ${CurrentplayerMark} you won 🎉`;
        winnerMsg.style.display = 'block';
        //make the cell not to be clicked
        boards.style.pointerEvents = 'none'
        function scoreboard(){
              if(CurrentplayerMark == 'x'){
                score_x++
                  xScore.textContent = `score: ${score_x}`
              }
            else{
              score_o++
                oScore.textContent =` score: ${ score_o}`
             }
            }
    //update the score
   scoreboard()
      }
     
     else if(currentboardState.every(fullBoard) == true){
      console.log(currentboardState.every(fullBoard) == true && checkWinner(currentboardState,CurrentplayerMark) == false)
        result.textContent = "It's a tie 🤝🏾"
         winnerMsg.style.display = 'block'
         boards.style.pointerEvents = 'none'
      }
    }
     winnerMsg()
     //function to reset the board
  function playAgain(){
    const winnerMsg = document.querySelector('.winner');
    
    boards.style.pointerEvents = 'auto'
        boards.textContent = "";
    //remove the array that contain the board and player mark
    for(let i = 0;i < 9;i++){
      GameBoard.getBoard().splice(i,1,"")
      
    }
    boards.textContent = ""
    //call new game or board
    ScreenControll()
    winnerMsg.style.display = 'none';
}
const play_btn = document.querySelector('.play-again')
     play_btn.addEventListener('click',()=>{
     playAgain()
    })
    swithTurn()
   }
     return{playRound,getActivePlayer,checkWinner}
  }

  
  //function too control game flow
  function ScreenControll(){
    const game = GameController()
     //render the board
    displayControl.display()
    const playerTurn = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board')

  const updateScreen =()=>{
      let activeplayer = game.getActivePlayer();
      playerTurn.textContent = `${activeplayer.playerMark}'s turn`
    }
   
 //minimax
 function minimax(boardState, currentMark){
  let freeSpot = getEmptySpaces(boardState);
 
  
      //array of empty space that  doesn't  have marked yet 
     // BASE (to stop the recursion)
    
    if(game.checkWinner(boardState, aiMark) ) return { evaluation : +10 };
    if( game.checkWinner(boardState,humanMark)      ) return { evaluation : -10 };
    if( freeSpot.length == 0                   ) return { evaluation : 0 };



  // save the index there evaluation or the result u would get if you move in that space
  let moves = [];

  // loop over the empty space and get evaluation or the result
  for( let i = 0; i < freeSpot.length; i++){
    // index of empty space
    let index = freeSpot[i];
  
    // find that empty space to mark it
    let backup = boardState[index];

    // mark the spot using that index with the player mark
    boardState[index] = currentMark;

    // save the index and it's evaluation
    let move = {};
    move.index = index;

    // evaluation for the move using that index using minimax function recursion occur
      if( currentMark == aiMark){
          move.evaluation = minimax(boardState, humanMark).evaluation;
      
      }else{
          move.evaluation = minimax(boardState,aiMark).evaluation;
      }

      // restore the space or the board to it's unmarked state
      boardState[index] = backup;
      // save the move which holds index and evaluation uing minimax in array( moves)
      moves.push(move);
  }


      /* 
      choose the bestmove using minimax algorithm
      maximizer which is the ai on it's turn should aim to highst score
      when human turn choose lowest score
      which limit human to win  to do that
      loop through moves which had evaluation and choose from it
    */
let bestMove;

  if(currentMark == aiMark){
      
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


//function that accept board(array)  loop over it return the free spot indices as an array

function getEmptySpaces(board){
      let indeices = []
      for(let i = 0;i  < board.length;i++){
          if(board[i] == ""){
            indeices.push(i)
          }
      }
   return indeices;
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
     
            aiMark = "o"
            humanMark = "x"
            let best = minimax(currentBoard,aiMark).index
          
           let freeCell  = document.querySelector(`[data-index='${best}']`);
           game.playRound(freeCell);
                updateScreen()
       }
    }
     
  }
   boardDiv.addEventListener("click",handleClick)
    updateScreen()
}
//Dom elements
let playerOne;
let playerTwo ;
let humanVshuman = document.querySelector('.human-game');
 let aiVshuman = document.querySelector(".ai-game");
 let modalDiv = document.querySelector('.players')
 let modal = document.querySelector('dialog')
 let mainDiv  =document.querySelector('main')
 let intro = document.querySelector(".intro-page")
 let playerOneMark = document.querySelector('#mark-x')
 let playerMarkOption = document.querySelector('#mark-o')
 let mark;
 let markTwo;
 let aiMark;
 let humanMark;
 let playerOneName = document.querySelector('#player-one')
 let playerTwoName = document.querySelector('#player-two')
 let player_left = document.querySelector('.player-one-name')
 let player_right = document.querySelector('.player-two')
 let boards = document.querySelector('.board');


 //play human vs human show form to get names
 let playHuman = document.querySelector('.play-btn')
 humanVshuman.addEventListener('click',()=>{
      intro.style.display = "none"
      mainDiv.style.display = 'flex'
      modalDiv.style.display = 'block'
      modal.showModal()
 })
 

 //play human vs human game
 playHuman.addEventListener('click',(event)=>{
  event.preventDefault()
 
  player_left.textContent = ` ${ playerOneName.value}` 
  player_right.textContent =`${ playerTwoName.value }` 

//check the form
  if(playerOneName.value == '' || playerTwoName.value == ""  || playerOneMark.checked == false && playerMarkOption.checked == false ) return 
//swith marks according to the form clicked radio btn
  else if(playerOneMark.checked == true){
    
    mark = "x"
    markTwo = 'o'
    playerOne = players(playerOneName,mark)
    playerTwo = players(playerTwoName,markTwo)
    ScreenControll()
  }
  else if(playerMarkOption.checked == true){
    mark = "o"
    markTwo = "x"
    playerOne = players(playerOneName,mark)
    playerTwo = players(playerTwoName,markTwo)
    ScreenControll()

}
 
 mainDiv.style.display = 'flex'
  modal.close()
 }) 

 //play Ai vs human 
 aiVshuman.addEventListener('click',()=>{
    playerOneName = 'you'
    playerTwoName = "ai"
    mark = "x"
    markTwo = 'o'
    player_left.textContent = `${playerOneName}`
    player_right.textContent = `${playerTwoName}`
    intro.style.display = 'none'
    mainDiv.style.display = 'flex'
    playerOne = players(playerOneName,mark)
    playerTwo = players(playerTwoName,markTwo)
    ScreenControll()
  
 }) 
  
   







  
   
   
   

  
    
  
  

 
  
  
 





