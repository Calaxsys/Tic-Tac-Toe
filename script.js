const displayController = (() => {
  const renderMessage = (message) => {
    document.querySelector("#results-display").innerHTML = message;
  }
  return {
    renderMessage
  }
})();

const Gameboard = (() => {
  let gameboard = ["", "", "", "", "", "", "", "", ""];

  const render = () => {
    let boardDisplay = "";
    gameboard.forEach((square, index) => {
      boardDisplay += `<div class="square" id="square-${index}">${square}</div>`
    })
    document.querySelector("#gameboard").innerHTML = boardDisplay;
    const squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
      square.addEventListener("click", Game.handleClick);
    })
  } 
  
  const update = (index, value) => {
    gameboard[index] = value;
    render();
  }

  const getGameboard = () => gameboard

  return {
    render,
    update,
    getGameboard
  }
})();

//mark represents the players X or O
const createPlayer = (name, mark) => {
  return {
    name, 
    mark
  }
}

const Game = (() => {
  let players = [];
  let currentPlayerIndex;
  let gameOver;

  const start = () => {
    players = [
      createPlayer(document.querySelector("#player1").value, "X"),
      createPlayer(document.querySelector("#player2").value, "O")
    ]
    currentPlayerIndex = 0;
    gameOver = false;
    Gameboard.render();
  }

  const handleClick = (event) => {
    if (gameOver) {
      return;
    }
    let index = parseInt(event.target.id.split("-")[1]);
    if (Gameboard.getGameboard()[index] !== "")
      return;

    Gameboard.update(index, players[currentPlayerIndex].mark);

    if (checkWinner(Gameboard.getGameboard(), players[currentPlayerIndex].mark)) {
      gameOver = true;
      displayController.renderMessage(`${players[currentPlayerIndex].name} won the game!`);
    } else if (checkForTie(Gameboard.getGameboard())) {
      gameOver = true;
      displayController.renderMessage(`It is a tie!`)
    }

    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
  }

  const restart = () => {
    for (let i = 0; i < 9; i++) {
      Gameboard.update(i, "");
    }
    Gameboard.render();
    gameOver = false;
    document.querySelector("#results-display").innerHTML = "";
  }

  return {
    start,
    handleClick,
    restart
  }
})();

const startButton = document.querySelector("#start-game");
startButton.addEventListener("click", () => {
  Game.start();
});

const restartButton = document.querySelector("#restart-game");
restartButton.addEventListener("click", () => {
  Game.restart();
});

function checkWinner(board) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5], 
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
  }
  return false;
}

function checkForTie(board) {
  return board.every(cell => cell !== "")
}