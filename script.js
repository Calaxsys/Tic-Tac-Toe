const Gameboard = (() => {
  let gameboard = ["", "", "", "", "", "", "", "", ""];

  const render = () => {
    let boardDisplay = "";
    gameboard.forEach((square, index) => {
      boardDisplay += `<div class="square" id="square-${index}">${square}</div>`
    })
    document.querySelector("#gameboard").innerHTML = boardDisplay;
  }
  

  return {
    render
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

  return {
    start
  }
})();

const startButton = document.querySelector("#start-game");
startButton.addEventListener("click", () => {
  Game.start();
})
