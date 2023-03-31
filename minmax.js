function bestMove() {

    let bestScore = -Infinity;
    let bestMove;
    
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            
            if(board[i][j] == ''){
                board[i][j] = ai;
                let score = minimax(board, 0 , false);
                board[i][j] = '';

                if(bestScore < score){
                    bestScore = score;                
                    bestMove = { i , j };
                }                
            }
        }        
    }

    board[bestMove.i][bestMove.j] = ai;

    let clickedCellIndex = 3 * bestMove.i + bestMove.j;
    let clickedCell;

    document.querySelectorAll('.cell').forEach(div => {
        if (parseInt(div.getAttribute('data-cell-index')) === clickedCellIndex ) {
            clickedCell = div;
        }
    });

    clickedCell.innerHTML = ai;
    currentPlayer = human;
}

let scores = {
    X: 1,
    O: -1,
    tie: 0
}

function minimax(board, depth, maximizingPlayer) {
    let result = checkWinner();

    if(result != null){
        return scores[result];
    }

    if(maximizingPlayer) {
        let bestScore = -Infinity;

        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                
                if(board[i][j] == '') {
                    board[i][j] = ai;
                    let score = minimax(board, depth + 1, false);
                    board[i][j] = '';
                    bestScore = max(score, bestScore);
                }               
            
            }            
        }
        return bestScore;
    } else {
        
        let bestScore = Infinity;

        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                
                if(board[i][j] == '') {
                    board[i][j] = human;
                    let score = minimax(board, depth + 1, true);
                    board[i][j] = '';
                    bestScore = min(score, bestScore);
                }               
            
            }            
        }

        return bestScore;

    }

}