const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const scoreDisplay = document.getElementById("score"); // Hisobni ko'rsatish elementi
let isJumping = false;
let score = 0; // Hisob uchun o'zgaruvchi

document.addEventListener("keydown", function(event) {
    if (event.code === "Space" && !isJumping) {
        jump();
    }
});

function jump() {
    isJumping = true;
    let position = 0;
    let upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval);
            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 6;
                    dino.style.bottom = position + "px";
                }
            }, 20);
        } else {
            position += 6;
            dino.style.bottom = position + "px";
        }
    }, 20);
}

function checkCollision() {
    const dinoRect = dino.getBoundingClientRect();
    const cactusRect = cactus.getBoundingClientRect();

    if (
        dinoRect.left < cactusRect.right &&
        dinoRect.right > cactusRect.left &&
        dinoRect.bottom > cactusRect.top
    ) {
        alert("Game Over!");
        window.location.reload();
    } else if (cactusRect.right < dinoRect.left) { // Kaktus o'yinchidan o'tib ketganda
        score++; // Hisobga 1 qo'shamiz
        scoreDisplay.textContent = "Score: " + score; // Hisobni yangilaymiz
        cactus.style.animation = ""; // Kaktusni qayta boshlaymiz
        setTimeout(() => cactus.style.animation = "moveCactus 2s linear infinite", 10);
    }
}

setInterval(checkCollision, 10);
