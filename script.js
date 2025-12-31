const Gameboard = (function () {
  const board = [null, null, null, null, null, null, null, null, null];

  return {
    printBoard: function () {
      console.log(board);
    },
    placeMark: function (index, mark) {
      if (board[index] === null) {
        board[index] = mark;
        return true;
      } else {
        return false;
      }
    },
    getBoard: () => board,
    resetBoard: function () {
      board.fill(null);
    },
  };
})();

const Player = (name, mark) => {
  let playerName = name;
  let playerMark = mark;
  return {
    getName: () => playerName,
    getMark: () => playerMark,
  };
};

const GameController = (function () {
  const playerOne = Player("Player 1", "X");
  const playerTwo = Player("Player 2", "O");
  let currentPlayer = playerOne;
  let gameOver = false;

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = function () {
    const board = Gameboard.getBoard();
    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      const spotA = board[a];
      const spotB = board[b];
      const spotC = board[c];

      if (spotA !== null && spotA === spotB && spotB === spotC) {
        return spotA;
      }
    }
    return null;
  };

  return {
    getCurrentPlayerName: () => currentPlayer.getName(),
    getCurrentPlayerMark: () => currentPlayer.getMark(),
    playTurn: function (index) {
      if (gameOver) {
        DisplayBoard.updateOutput("Game is over!");
        return;
      }
      const mark = currentPlayer.getMark();
      const success = Gameboard.placeMark(index, mark);

      if (success) {
        const winner = checkWinner();
        if (winner !== null) {
          gameOver = true;
          DisplayBoard.updateOutput(winner + " wins!");
        } else {
          const board = Gameboard.getBoard();

          if (board.every((spot) => spot !== null)) {
            DisplayBoard.updateOutput("It's a tie!");
            gameOver = true;
          } else {
            if (currentPlayer === playerOne) {
              currentPlayer = playerTwo;
            } else {
              currentPlayer = playerOne;
            }
            DisplayBoard.updatePlayerDisplay();
            DisplayBoard.updateOutput("");
          }
        }
      } else {
        DisplayBoard.updateOutput("Spot already taken!");
      }
    },
    getWinner: () => checkWinner(),
    startNewGame: () => {
      Gameboard.resetBoard();
      currentPlayer = playerOne;
      gameOver = false;
    },
  };
})();

const DisplayBoard = (function () {
  const boardContainer = document.querySelector("#board-container");
  const updatePlayer = document.querySelector("#update-player");
  const updateElement = document.querySelector(".round-output");
  const resetBtn = document.querySelector(".reset-btn");

  return {
    renderBoard: function () {
      boardContainer.innerHTML = "";
      for (let i = 0; i < 9; i++) {
        const square = document.createElement("button");
        square.classList.add("square");
        square.dataset.index = i;
        square.textContent = "";
        boardContainer.appendChild(square);
        square.addEventListener("click", function () {
          const index = Number(square.dataset.index);
          const board = Gameboard.getBoard();
          GameController.playTurn(index);
          square.textContent = board[index];
        });
      }
    },
    updatePlayerDisplay: function () {
      const name = GameController.getCurrentPlayerName();
      updatePlayer.textContent = name;
    },
    updateOutput: function (message) {
      updateElement.textContent = message;
    },
    resetButton: function () {
      resetBtn.addEventListener("click", function () {
        GameController.startNewGame();
        DisplayBoard.renderBoard();
        DisplayBoard.updatePlayerDisplay();
        DisplayBoard.updateOutput("Start Game!");
      });
    },
  };
})();

DisplayBoard.renderBoard();
DisplayBoard.updatePlayerDisplay();
DisplayBoard.updateOutput("Start Game!");
DisplayBoard.resetButton();
