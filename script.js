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
        console.log("Game is over!");
        return;
      }
      const mark = currentPlayer.getMark();
      const success = Gameboard.placeMark(index, mark);

      if (success) {
        const winner = checkWinner();
        if (winner !== null) {
          gameOver = true;
          console.log(winner + " wins!");
        } else {
          const board = Gameboard.getBoard();

          if (board.every((spot) => spot !== null)) {
            console.log("It's a tie!");
            gameOver = true;
          } else {
            if (currentPlayer === playerOne) {
              currentPlayer = playerTwo;
            } else {
              currentPlayer = playerOne;
            }
          }
        }
      } else {
        console.log("Spot already taken!");
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


