const Gameboard = (function(){
    const board = [null, null, null, null, null, null, null, null, null];

    return {
        printBoard: function(){
            console.log(board);
        },
        placeMark: function(index, mark) {
            if (board[index] === null) {
                board[index] = mark;

            } else {
                return false;

            }

        }
    }
})();

const Player = (name, mark) => {
    let playerName = name;
    let playerMark = mark;
    return {
        getName: () => playerName,
        getMark: () => playerMark
    }
}

