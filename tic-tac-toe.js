document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    let currentPlayer = 'X';
    let board = Array(9).fill(null);

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return null;
    }

    function checkDraw() {
        return board.every(cell => cell !== null);
    }

    function handleClick(event) {
        const index = event.target.getAttribute('data-index');
        if (board[index] || checkWinner()) return;
        board[index] = currentPlayer;
        event.target.textContent = currentPlayer;

        const winner = checkWinner();
        if (winner) {
            setTimeout(() => alert(`${winner} a câștigat!`), 100);
        } else if (checkDraw()) {
            setTimeout(() => alert(`Este remiză!`), 100);
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }

    function resetGame() {
        board = Array(9).fill(null);
        cells.forEach(cell => {
            cell.textContent = '';
        });
        currentPlayer = 'X';
    }

    cells.forEach(cell => cell.addEventListener('click', handleClick));

    const newGameButton = document.getElementById('new-game-button');
    newGameButton.addEventListener('click', resetGame);
});
