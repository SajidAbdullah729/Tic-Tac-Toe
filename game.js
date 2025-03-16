var TicTacToe = /** @class */ (function () {
    function TicTacToe() {
        this.board = [];
        for (var i = 0; i < 9; i++) {
            this.board.push('');
        }
        this.currentPlayer = 'X';
        this.gameStatus = 'Game On';
    }
    TicTacToe.prototype.handleCellClick = function (index) {
        if (this.board[index] === '' && this.gameStatus === 'Game On') {
            this.board[index] = this.currentPlayer;
            this.updateBoard();
            if (this.checkWinner()) {
                this.gameStatus = "".concat(this.currentPlayer, " Wins!");
                this.updateStatus();
                return;
            }
            if (this.board.every(function (cell) { return cell !== ''; })) {
                this.gameStatus = 'Draw!';
                this.updateStatus();
                return;
            }
            this.switchPlayer();
        }
    };
    TicTacToe.prototype.switchPlayer = function () {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.updateStatus();
    };
    TicTacToe.prototype.updateStatus = function () {
        var statusElement = document.getElementById('status');
        if (statusElement) {
            statusElement.textContent = this.gameStatus;
        }
    };
    TicTacToe.prototype.updateBoard = function () {
        var cells = document.querySelectorAll('.cell');
        this.board.forEach(function (cell, index) {
            cells[index].textContent = cell;
        });
    };
    TicTacToe.prototype.checkWinner = function () {
        var _this = this;
        var winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6] // diagonals
        ];
        return winPatterns.some(function (pattern) {
            var a = pattern[0], b = pattern[1], c = pattern[2];
            return _this.board[a] === _this.board[b] && _this.board[b] === _this.board[c] && _this.board[a] !== '';
        });
    };
    TicTacToe.prototype.resetGame = function () {
        this.board = [];
        for (var i = 0; i < 9; i++) {
            this.board.push('');
        }
        this.currentPlayer = 'X';
        this.gameStatus = 'Game On';
        this.updateBoard();
        this.updateStatus();
    };
    return TicTacToe;
}());
document.addEventListener('DOMContentLoaded', function () {
    var game = new TicTacToe();
    var cells = document.querySelectorAll('.cell');
    cells.forEach(function (cell, index) {
        cell.setAttribute('data-index', index.toString()); // Ensure data-index is set
        cell.addEventListener('click', function () {
            game.handleCellClick(index);
        });
    });
    var resetButton = document.getElementById('reset');
    if (resetButton) {
        resetButton.addEventListener('click', function () {
            game.resetGame();
        });
    }
    game.updateStatus();
    game.updateBoard();
});
