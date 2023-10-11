//create a board using module pattern
const GameBoard = (function (){
  let board = []
  let row = 3;
  let column = 3;

//first for loop create empty row crate  array the second for loop add column and fill those array
  for(let i = 0; i < 3;i++){
    board[i] = []
    for(let j= 0; j < 3;j++){
       board[i][j] = j
    }
  }
  return{board}
})();
