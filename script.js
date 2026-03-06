const overlay = document.getElementById("overlay");
const popup = document.getElementById("popup");
const cells = document.querySelectorAll(".cell");
const message = document.getElementById("message");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameOver = false;
let gameCount = 0;
let humanHasWon = false;

const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

function isForcedWinGame() {
    return gameCount === 3 && !humanHasWon;
}

function handleMove(cell) {
    if (gameOver || cell.innerHTML !== "") return;

    if (isForcedWinGame()) {
        cell.innerHTML = `<img src="images/dory.png">`;
        board[cell.dataset.index] = "X";
        playerWins();
        return;
    }

    cell.innerHTML = `<img src="images/dory.png">`;
    board[cell.dataset.index] = "X";

    if (checkWin("X")) {
        playerWins();
        return;
    }

    if (board.every(c => c !== "")) {
        showDraw();
        return;
    }

    currentPlayer = "O";
    setTimeout(aiMove, 800);
}

cells.forEach(cell => {
    cell.addEventListener("click", () => handleMove(cell));
    cell.addEventListener("touchstart", () => handleMove(cell), { passive: true });
});

function aiMove() {
    if (gameOver) return;

    if (isForcedWinGame()) return;

    let empty = board.map((v, i) => v === "" ? i : null).filter(v => v !== null);

    if (gameCount === 0) {
        if (board[4] === "X") {
            const corners = [0, 2, 6, 8].filter(i => board[i] === "");
            if (corners.length > 0) return makeMove(corners[0]);
        }

        const humanCorners = [0, 2, 6, 8];
        if (humanCorners.some(i => board[i] === "X")) {
            if (board[4] === "") return makeMove(4);
        }
    }

    for (let [a, b, c] of winPatterns) {
        if (board[a] === "O" && board[b] === "O" && board[c] === "") return makeMove(c);
        if (board[a] === "O" && board[b] === "" && board[c] === "O") return makeMove(b);
        if (board[a] === "" && board[b] === "O" && board[c] === "O") return makeMove(a);
    }

    for (let [a, b, c] of winPatterns) {
        if (board[a] === "X" && board[b] === "X" && board[c] === "") return makeMove(c);
        if (board[a] === "X" && board[b] === "" && board[c] === "X") return makeMove(b);
        if (board[a] === "" && board[b] === "X" && board[c] === "X") return makeMove(a);
    }

    let move = empty[Math.floor(Math.random() * empty.length)];
    makeMove(move);
}

function makeMove(move) {
    board[move] = "O";
    cells[move].innerHTML = `<img src="images/sonic.png">`;

    if (checkWin("O")) {
        playerLoses();
        return;
    }

    currentPlayer = "X";
}

function checkWin(player) {
    return winPatterns.some(pattern =>
        pattern.every(i => board[i] === player)
    );
}

function playerWins() {
    gameOver = true;
    humanHasWon = true;

    confetti({
        particleCount: 200,
        spread: 90,
        startVelocity: 40,
        scalar: 1.8
    });

    popup.innerHTML = `
        <img src="images/win1.gif">
        <h2>🎉 Congrats, you win! Happy birthday my love! 🎉</h2>
        <button onclick="goToCard()">Continue</button>
    `;

    overlay.style.display = "flex";
    gameCount++;
}

function playerLoses() {
    gameOver = true;

    popup.innerHTML = `
        <img src="images/lose.gif">
        <h2>Try again, your surprise awaits!</h2>
        <button onclick="nextGame()">Try Again</button>
    `;

    overlay.style.display = "flex";
    gameCount++;
}

function showDraw() {
    gameOver = true;

    popup.innerHTML = `
        <img src="images/draw.gif">
        <h2>It's a draw! Try again (your surprise awaits)</h2>
        <button onclick="nextGame()">Try Again</button>
    `;

    overlay.style.display = "flex";
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(c => c.innerHTML = "");
    message.textContent = "";
    gameOver = false;
    currentPlayer = "X";
}

function nextGame() {
    resetGame();
    overlay.style.display = "none";
}

function goToCard() {
    window.location.href = "card.html";
}
