const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const ballRef = document.getElementById("ball");
const points1 = document.getElementById("pointsPlayer1");
const points2 = document.getElementById("pointsPlayer2");
let p1Top = 0;
let ball = {
    top: window.innerHeight / 2,
    left: window.innerWidth / 2,
    dx: 1,
    dy: 1,
}
let player1Location = {
    top: window.innerHeight / 2 - 50,
}

let player2Location = {
    top: window.innerHeight / 2 - 50,
}

const step = 20;

window.onload = () => {
    // move ball
    ball.dx = (Math.random() + 3);
    ball.dy = Math.random() + 2;
    drawBall();
    animate();


    let keyPressed = {};
    window.addEventListener("keyup", (e) => {
        keyPressed[e.keyCode] = e.type == 'keydown';

    })
    window.addEventListener("keydown", (e) => {
        keyPressed[e.keyCode] = e.type == 'keydown';
        console.log(keyPressed);


        if (keyPressed[38]) {
            player2Location.top -= step;
            player2.style.top = player2Location.top + 'px';
        } else if (keyPressed[40]) {
            player2Location.top += step;
            player2.style.top = player2Location.top + 'px';
        }


        if (keyPressed[87]) {
            player1Location.top -= step;
            player1.style.top = player1Location.top + 'px';
        } else if (keyPressed[83]) {
            player1Location.top += step;
            player1.style.top = player1Location.top + 'px';
        }
    })
}

function animate() {
    moveBall();
    drawBall();
    requestAnimationFrame(animate);
}

function drawBall() {

    ballRef.style.left = ball.left + 'px';
    ballRef.style.top = ball.top + 'px';
}

function moveBall() {
    ball.top += ball.dy;
    ball.left += ball.dx;


    if (ball.left + 50 > window.innerWidth - 30 && (ball.top + 50 > player2Location.top && ball.top < player2Location.top + 100)) {
        ball.dx = - Math.abs(ball.dx);
        ballChangeColor();
    }



    if (ball.left < 0 + 30 && (ball.top + 50 > player1Location.top && ball.top < player1Location.top + 100)) {
        ball.dx = Math.abs(ball.dx);

        ballChangeColor();
    }


    if (ball.left <= 0) {
        ball.dx = -ball.dx;
        ballChangeColor();
        points2.innerHTML = parseInt(points2.innerHTML) + 1;
    } else if (ball.left + 50 >= window.innerWidth) {
        ball.dx = -ball.dx;
        points1.innerHTML = parseInt(points1.innerHTML) + 1;
        ballChangeColor();
    }

    if (ball.top <= 0 || ball.top + 50 >= window.innerHeight) {
        ball.dy = -ball.dy;
        ballChangeColor();
    }

}

function ballChangeColor() {
    const colors = [
        "blue",
        "red",
        "green",
        "purple",
        "orange",
        "pink",
        "lightblue",
        "darkgreen",
        "gray",
    ];

    ballRef.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
}