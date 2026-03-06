const closed = document.getElementById("envelopeClosed");
const open = document.getElementById("envelopeOpen");
const cardBox = document.getElementById("cardBox");
const message = document.getElementById("message");
const finalLove = document.getElementById("finalLove");
const player = document.getElementById("musicPlayer");

const text = "Happy birthday my love... I love you so so much and you are so deserving of every bit of joy, I hope this brings you some of that. I cannot wait to spend time with you and I hope you have a wonderful day ♥ ♥ ";

const sceneFade = document.createElement("div");
sceneFade.className = "scene-fade";
document.body.appendChild(sceneFade);

const bgBlur = document.createElement("div");
bgBlur.className = "bg-blur";
document.body.appendChild(bgBlur);

function playMusic() {
    player.src = player.src.replace("mute=1", "mute=0");
}

function handleOpen() {
    closed.style.display = "none";
    open.style.display = "block";

    setTimeout(() => open.classList.add("show"), 20);

    setTimeout(() => {
        sceneFade.classList.add("show");
        playMusic();
    }, 200);

    setTimeout(() => bgBlur.classList.add("show"), 600);

    setTimeout(() => {
        cardBox.style.display = "block";
        setTimeout(() => {
            cardBox.classList.add("show");
            typeWriter(text, 0, () => finalLove.classList.add("show"));
        }, 50);
    }, 700);

    setTimeout(() => balloonBurst(), 900);

    setTimeout(() => {
        const left = document.querySelector(".collage.left");
        const right = document.querySelector(".collage.right");
        if (left) left.classList.add("show");
        setTimeout(() => { if (right) right.classList.add("show"); }, 300);
    }, 1100);
}

closed.addEventListener("click", handleOpen);
closed.addEventListener("touchstart", handleOpen, { passive: true });

function typeWriter(text, i, onComplete) {
    if (i < text.length) {
        message.innerHTML += text.charAt(i);
        setTimeout(() => typeWriter(text, i + 1, onComplete), 40);
    } else if (onComplete) onComplete();
}

function balloonBurst() {
    const count = 18;
    for (let i = 0; i < count; i++) {
        const balloon = document.createElement("div");
        balloon.className = "balloon";

        const angle = (Math.PI * 2 * i) / count;
        const distance = 120 + Math.random() * 60;
        const dx = Math.cos(angle) * distance;
        const dy = -Math.abs(Math.sin(angle) * distance);

        balloon.style.setProperty("--dx", dx + "px");
        balloon.style.setProperty("--dy", dy + "px");

        document.body.appendChild(balloon);

        requestAnimationFrame(() => balloon.classList.add("animate"));

        setTimeout(() => balloon.remove(), 2600);
    }
}
