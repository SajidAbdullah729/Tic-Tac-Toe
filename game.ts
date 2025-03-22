class TicTacToe {   // A class of Tic-Tac Toe which has multiple values
  board: string[];
  currentPlayer: string;
  gameStatus: string;

  constructor() {
    this.board = [];
    for (let i = 0; i < 9; i++) {
      this.board.push('');
    }
    this.currentPlayer = 'X';
    this.gameStatus = 'Game On';
  }

  handleCellClick(index: number): void {
    if (this.board[index] === '' && this.gameStatus === 'Game On') {
      this.board[index] = this.currentPlayer;
      this.updateBoard();

      if (this.checkWinner()) {
        this.gameStatus = `${this.currentPlayer} Wins!`;
        this.updateStatus();
        return;
      }

      if (this.board.every(cell => cell !== '')) {
        this.gameStatus = 'Draw!';
        this.updateStatus();
        return;
      }

      this.switchPlayer();
    }
  }

  switchPlayer(): void {
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    this.updateStatus();
  }

  updateStatus(): void {
    const statusElement = document.getElementById('status');
    if (statusElement) {
      statusElement.textContent = this.gameStatus;
    }
  }

  updateBoard(): void {
    const cells = document.querySelectorAll('.cell');
    this.board.forEach((cell, index) => {
      (cells[index] as HTMLElement).textContent = cell;
    });
  }

  checkWinner(): boolean {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],  // rows win position
      [0, 3, 6], [1, 4, 7], [2, 5, 8],  // columns win position
      [0, 4, 8], [2, 4, 6]              // diagonals win position
    ];
    return winPatterns.some(pattern => {
      const [a, b, c] = pattern;
      return this.board[a] === this.board[b] && this.board[b] === this.board[c] && this.board[a] !== '';
    });
  }

  resetGame(): void {
    this.board = [];
    for (let i = 0; i < 9; i++) {
      this.board.push('');
    }
    this.currentPlayer = 'X';
    this.gameStatus = 'Game On';
    this.updateBoard();
    this.updateStatus();
  }
}

document.addEventListener('DOMContentLoaded', () => { // All dom content loaded
  const game = new TicTacToe();

  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell, index) => {
    cell.setAttribute('data-index', index.toString()); // Ensure data-index is set
    cell.addEventListener('click', () => {
      game.handleCellClick(index);
    });
  });

  const resetButton = document.getElementById('reset');
  if (resetButton) {
    resetButton.addEventListener('click', () => {
      game.resetGame();
    });
  }

  game.updateStatus();
  game.updateBoard();
});
