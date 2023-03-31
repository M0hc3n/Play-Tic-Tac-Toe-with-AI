document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', mousePressed));


let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

let ai = "X";
let human = "O";
let currentPlayer = human;

function setup() {
  bestMove();
}

function equals3(a, b, c) {
  return a == b && b == c && a != "";
}

function checkWinner() {
  let winner = null;

  for (let i = 0; i < board.length; i++) {
    if (equals3(board[i][0], board[i][1], board[i][2])) {
      winner = board[i][0];
    }
  }

  for (let i = 0; i < board.length; i++) {
    if (equals3(board[0][i], board[1][i], board[2][i])) {
      winner = board[0][i];
    }
  }

  // Diagonal
  if (equals3(board[0][0], board[1][1], board[2][2])) {
    winner = board[0][0];
  }
  if (equals3(board[2][0], board[1][1], board[0][2])) {
    winner = board[2][0];
  }

  let openSlots = 0;

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
        if(board[i][j] == ''){
            openSlots++;
        }        
    }
  }

  if(winner == null && openSlots == 0){
    return 'tie';
  } else{
    return winner;
  }
}

function mousePressed(clickedCellEvent) {
    
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    let i = floor(clickedCellIndex / 3);
    let j = clickedCellIndex % 3;

    if(board[i][j] == ''){
      board[i][j] = human;
      clickedCell.innerHTML = human;
      currentPlayer = ai;
      bestMove();
    }

}

function handleRestartGame(){
  
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      board[i][j] = '';
    }    
  }
    
  currentPlayer = human;
  setup();
}

function draw() {

    let result = checkWinner();
  if (result != null) {
    noLoop();
    let resultP = createP("");
    resultP.style("font-size", "32pt");
    resultP.style("text-align", "center");
    resultP.style("margin-top", "-50px");
    resultP.style("font-family", "'Permanent Marker', cursive");

    if (result == "tie") {
      resultP.html("Tie!");
    } else {
      resultP.html(`${result} wins!`);
    }
  }
}
