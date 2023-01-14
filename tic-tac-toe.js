// Set up variables to track the game state

let currentPlayer = "X";
let currentMove = 0;
let gameOver = false;
let movesHistoryUndo = []
let movesHistoryRedo = []
let movesHistoryRedoPlayer = []

function valuesUpdated(){
  console.log("Recorded Moves For Undo",movesHistoryUndo)
  console.log("Recorded Moves For Redo",movesHistoryRedo)
  console.log("Number of Moves (Currently)",currentMove)
  console.log("Next Player", movesHistoryRedoPlayer)
}


// Select all of the SQUARES on the grid
const SQUARES = document.querySelectorAll(".square");
const ANNOUNCER = document.querySelector(".announcer")
const PLAYAGAIN = document.querySelector(".playagain")
const UNDOBUTTON = document.querySelector(".undo")
const UPDATEBUTTON = document.querySelector(".update")
const REDOBUTTON = document.querySelector(".redo")
const HISTORIES = document.querySelectorAll(".history")



for (let i = 0; i < SQUARES.length; i++) {
  SQUARES[i].setAttribute("name", `${i}`);
  HISTORIES[i].addEventListener("mouseover",()=>{
    HISTORIES[i].style.backgroundColor = "rgb(255, 80, 80)"
    movesHistoryUndo[i].style.backgroundColor ="rgb(255, 80, 80)"
  })

  HISTORIES[i].addEventListener("mouseout",()=>{
    HISTORIES[i].style.backgroundColor = "rgb(190, 190, 190)"
    movesHistoryUndo[i].style.backgroundColor ="rgb(255, 230, 190)"
  })
}



function recordingGameHistory(){
  HISTORIES[currentMove].textContent = `${currentMove+1} Moves, Player ${currentPlayer} Over Cell Number ${movesHistoryUndo[currentMove].getAttribute("name")}`;
}

function deleteGameHistory(){
  HISTORIES[currentMove].textContent = ""
}




UPDATEBUTTON.addEventListener("click",()=>{
  valuesUpdated()
})

UNDOBUTTON.addEventListener("click", ()=>{
  if (currentMove > 0){
    gameOver = false;
    if (movesHistoryUndo.length !== 0){
    PLAYAGAIN.textContent = "";    
    currentMove -= 1;
    deleteGameHistory()
    movesHistoryUndo[currentMove].textContent = ""    
    let toRedo = movesHistoryUndo.pop()
    movesHistoryRedo.unshift(toRedo)    

    updateCurrentPlayer();
    movesHistoryRedoPlayer.unshift(currentPlayer)    
    ANNOUNCER.textContent = `Player ${currentPlayer}'s Turn`
    }
    
  }  
  console.log("UNDONE") 
})

REDOBUTTON.addEventListener("click", ()=>{
  if (currentMove < 9){
    if (movesHistoryRedo.length !== 0){
    movesHistoryRedo[0].textContent = movesHistoryRedoPlayer[0]
    
    const winner = checkWin();
    

    checkCondition(winner)
    movesHistoryRedoPlayer.shift()
    movesHistoryUndo.push(movesHistoryRedo[0])
    movesHistoryRedo.shift()
    recordingGameHistory();
    currentMove += 1

    updateCurrentPlayer();
    ANNOUNCER.textContent = `Player ${currentPlayer}'s Turn`
    checkCondition(winner);     
    }
  }
  console.log("REDONE")
})

function recordGameHistory(){  
  if(!event.target.textContent){
  movesHistoryUndo.push(event.target)
  recordingGameHistory();
  currentMove += 1;  
  }
}


// Add a click event listener to each square
SQUARES.forEach(square => {
  square.addEventListener("click", function(event) {
    if (gameOver) {return};
    console.log("CLICKED")
    recordGameHistory();
    movesHistoryRedo = [];
    movesHistoryRedoPlayer = []
    announcer();

    if (event.target.textContent === ""){
      event.target.textContent = currentPlayer;
      const winner = checkWin();
      checkCondition(winner)
      // Check for a win or draw
      
    }
  });  
});

function checkCondition(winner){
  if (winner) {
    gameOver = true;        
    playAgain()
     
  } else if (checkDraw()) {
    gameOver = true;        
    playDraw()

  } else {
    updateCurrentPlayer();
  }      
}



function updateCurrentPlayer(){
  currentPlayer = currentPlayer === "X" ? "O" : "X"
  return currentPlayer
}

function playAgain() {  
  ANNOUNCER.textContent = `Player ${currentPlayer} Wins!!`
  PLAYAGAIN.textContent="Do you want to play again?";
  currentPlayer = "O"
  createButtons();  
}

function playDraw() {  
  ANNOUNCER.textContent = `DRAW !!!`
  PLAYAGAIN.textContent="Do you want to play again?";
  currentPlayer = "O" 
  createButtons();
}

function createButtons() {
  yesButton = document.createElement("button");
  noButton = document.createElement("button")
  yesButton.textContent = "Yes"
  noButton.textContent = "No"
  PLAYAGAIN.append(yesButton)
  PLAYAGAIN.append(noButton)

  yesButton.addEventListener("click",()=>{
    for (let i = 0; i < SQUARES.length; i++){
      SQUARES[i].textContent = ""
      HISTORIES[i].textContent = ""
    }
    currentPlayer = "X";   
    gameOver = false;
    PLAYAGAIN.textContent = "";
    ANNOUNCER.textContent = "Player X's Turn"
    currentMove = 0;
    
    movesHistoryUndo = []
    movesHistoryRedo = []
    movesHistoryRedoPlayer = []
  })

  noButton.addEventListener("click",()=>{
    ANNOUNCER.textContent = "GAME OVER!!!"
    PLAYAGAIN.textContent = "";
  })  
}

function announcer(){
  if (event.target.textContent === ""){  
  ANNOUNCER.textContent = currentPlayer === "X" ? "Player O's Turn" : "Player X's Turn"
  }
}

// Check for a win
function checkWin() {
// Check rows
if (SQUARES[0].textContent === currentPlayer && SQUARES[1].textContent === currentPlayer && SQUARES[2].textContent === currentPlayer) return currentPlayer;
if (SQUARES[3].textContent === currentPlayer && SQUARES[4].textContent === currentPlayer && SQUARES[5].textContent === currentPlayer) return currentPlayer;
if (SQUARES[6].textContent === currentPlayer && SQUARES[7].textContent === currentPlayer && SQUARES[8].textContent === currentPlayer) return currentPlayer;

// Check columns
if (SQUARES[0].textContent === currentPlayer && SQUARES[3].textContent === currentPlayer && SQUARES[6].textContent === currentPlayer) return currentPlayer;
if (SQUARES[1].textContent === currentPlayer && SQUARES[4].textContent === currentPlayer && SQUARES[7].textContent === currentPlayer) return currentPlayer;
if (SQUARES[2].textContent === currentPlayer && SQUARES[5].textContent === currentPlayer && SQUARES[8].textContent === currentPlayer) return currentPlayer;

// Check diagonals
if (SQUARES[0].textContent === currentPlayer && SQUARES[4].textContent === currentPlayer && SQUARES[8].textContent === currentPlayer) return currentPlayer;
if (SQUARES[2].textContent === currentPlayer && SQUARES[4].textContent === currentPlayer && SQUARES[6].textContent === currentPlayer) return currentPlayer;

return null;
}

// Check for a draw
function checkDraw() {
  for (const square of SQUARES) {
    if (square.textContent === "") {
      return false;
    }
  }
  return true;
}