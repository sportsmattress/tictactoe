
const playGame = (() => {
    let boxes = document.querySelectorAll(".box")
    let message = document.querySelector("#message")
    let restartBtn = document.querySelector('#restartBtn')
    let playerXScore = document.querySelector('#player-1-score');
    let playerOScore = document.querySelector('#player-2-score');
    let x = 1;
    let o = 1;
    let gameOver = false;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8], 
        [0, 4, 8],
        [2, 4, 6],
    ]

    let currentPlayer = 0;

    document.querySelector('#startBtn').addEventListener('click', () => {
    message.innerHTML = "Game started! Player X's turn."
    boxes.forEach((box) => {
        if(gameOver) {
            return;
        }
        box.addEventListener('click', () => {
            if(box.innerHTML === "") {
                if(currentPlayer === 0) {
                    box.innerHTML = "X";
                    currentPlayer = 1;
                    message.innerHTML = "Player O's Turn!";
                    checkForWinner();
                } else {
                    box.innerHTML = "O";
                    currentPlayer = 0;
                    message.innerHTML = "Player X's Turn!"
                    checkForWinner();
                }

            }
        })
    })
})

    function checkForWinner() {
        for (let index of winningConditions) {
            let val1 = boxes[index[0]].textContent
            let val2 = boxes[index[1]].textContent
            let val3 = boxes[index[2]].textContent
            if(val1 !== "" && val2 !== "" && val3 !== ""){
                if(val1 && val1 === val2 && val1 === val3) {
                    message.innerHTML = `Player ${val1} wins this round! Loser's turn!`
                    boxes.forEach((box) => {
                        box.innerHTML = "";
                    })
                    if(currentPlayer === 0){
                        playerOScore.textContent = `Player O:  ${o++}` 
                    } else {
                        playerXScore.textContent = `Player X:  ${x++}`
                    }
                }
            }
            let draw = true;
            boxes.forEach((box) => {
                if(box.textContent == "") {
                draw = false;
                }
            })
            if(draw) {
                message.innerHTML = "It's A Draw!";
                boxes.forEach((box) => {
                    box.textContent = "";
                })
            } 
            if(x === 6) {
                message.innerHTML= "GAME OVER! Player X wins!";
                gameOver = true;
            } else if(o === 6) {
                message.innerHTML = "GAME OVER! Player O wins!";
                gameOver = true;
            }
        }
    }

    restartBtn.addEventListener('click', () => {
        boxes.forEach((box) => {
            box.innerHTML = "";
        })
        message.innerHTML = "Player X Starts The Game!";
        playerOScore.textContent = `Player O: `;
        playerXScore.textContent = `Player X: `;
        x = 1;
        o = 1;
        currentPlayer = 0;
    })

})();

