/*View: Board
Action: Click
Rules 3:
Win Draw Lose 
0 1 2, 3 4 5, 6 7 8
0 3 6, 1 4 7, 2 5 8
0 4 8, 2 4 6
Game 2: Continue and End
Players 2: X and O*/


// Set up variables to track the game state
let currentPlayer = "X";
let gameOver = false;

// Select all of the squares on the grid
const squares = document.querySelectorAll(".square");

// Add a click event listener to each square
squares.forEach(square => {
  square.addEventListener("click", function(event) {    
    // If the game is already over, do nothing
    
    if (gameOver) return;

    // If the square is empty, place the current player's symbol in it
    
    if (event.target.textContent === "") {         
    event.target.textContent = currentPlayer;
    
    winner = checkWin();     
    if (winner) {
      gameOver = true;
      alert(`Player ${currentPlayer} wins!`);
      } else if (checkDraw()){
        gameOver = true;
        alert("It's a draw!");
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";        
      }
    
    }
  });
});


// Check for a win
function checkWin() {
// Check rows
if (squares[0].textContent === currentPlayer && squares[1].textContent === currentPlayer && squares[2].textContent === currentPlayer) {
  gameOver = true;
  return currentPlayer;
}

if (squares[3].textContent === currentPlayer && squares[4].textContent === currentPlayer && squares[5].textContent === currentPlayer) return currentPlayer;
if (squares[6].textContent === currentPlayer && squares[7].textContent === currentPlayer && squares[8].textContent === currentPlayer) return currentPlayer;

// Check columns
if (squares[0].textContent === currentPlayer && squares[3].textContent === currentPlayer && squares[6].textContent === currentPlayer) return currentPlayer;
if (squares[1].textContent === currentPlayer && squares[4].textContent === currentPlayer && squares[7].textContent === currentPlayer) return currentPlayer;
if (squares[2].textContent === currentPlayer && squares[5].textContent === currentPlayer && squares[8].textContent === currentPlayer) return currentPlayer;

// Check diagonals
if (squares[0].textContent === currentPlayer && squares[4].textContent === currentPlayer && squares[8].textContent === currentPlayer) return currentPlayer;
if (squares[2].textContent === currentPlayer && squares[4].textContent === currentPlayer && squares[6].textContent === currentPlayer) return currentPlayer;

return null;
}

// Check for a draw
function checkDraw() {
  for (const square of squares) {
    if (square.textContent === "") {
      return false;
    }
  }
  return true;
}