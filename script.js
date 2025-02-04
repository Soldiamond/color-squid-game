document.addEventListener("DOMContentLoaded", () => {
    const colors = ["red", "blue", "green", "yellow", "purple", "orange"];
    const colorBox = document.querySelector('[data-testid="colorBox"]');
    const colorOption = document.querySelectorAll('[data-color]');
    const gameStatus = document.querySelector('[data-testid="gameStatus"]');
    const scoreElement = document.querySelector('[data-testid="score"]');
    const newGameButton = document.querySelector('[data-testid="newGameButton"]');
    const targetColorDisplay = document.querySelector('[data-testid="targetColorDisplay"]');


    let targetColor;
    let score = 0;
    let wrongAttempts = 0;

    function initGame() {
        targetColor = colors[Math.floor(Math.random() * colors.length)];
        targetColorDisplay.style.backgroundColor = "transparent";
        targetColorDisplay.style.width = "100px";
        targetColorDisplay.style.height = "40px";
        targetColorDisplay.style.margin = "10px auto";
        targetColorDisplay.style.borderRadius = "5px";

        gameStatus.textContent = "";
        scoreElement.textContent = `Score: ${score}`;
        wrongAttempts = 0;

        colorOption.forEach((color) => {
            color.style.backgroundColor = color.dataset.color;
            color.style.opacity = "1";
            color.style.pointerEvents = "auto";
        });

        colorBox.style.transition = "none";
        colorBox.style.backgroundColor = "#fff";
    }

    function handleGuess(event) {
        const selectedColor = event.target.dataset.color;

        if (selectedColor === targetColor) {
            gameStatus.textContent = "Correct!";
            gameStatus.style.color = "#32cd32";
            score++;
            scoreElement.textContent = `Score: ${score}`;
            targetColorDisplay.style.backgroundColor = targetColor;

        } else {
            wrongAttempts++;

            if (wrongAttempts < 2) {
                gameStatus.textContent = `Wrong! ${2 - wrongAttempts} attempt left.`;
                gameStatus.style.color = "#ff6347";
                event.target.style.opacity = "0.5";
                event.target.style.pointerEvents = "none";
            } else {
                gameStatus.textContent = "Wrong!";
                gameStatus.style.color = "#ff6347";
                targetColorDisplay.style.backgroundColor = targetColor;

                setTimeout(() => {
                    score = 0;
                    initGame();
                }, 1500);
            }
        }
    }

    colorOption.forEach((color) => {
        color.addEventListener("click", handleGuess);
    });

    newGameButton.addEventListener("click", () => {
        score = 0; 
        initGame();
    });

    initGame(); 
});