const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startBtn = document.getElementById("startBtn");
const scoreDisplay = document.getElementById("score");

const box = 30;
let score = 0;
let snake;
let food;
let direction;
let nextDirection;
let game;

function initGame() {
  score = 0;
  snake = [{ x: 9 * box, y: 10 * box }];
  direction = "RIGHT";
  nextDirection = direction;
  scoreDisplay.textContent = "Skor: 0";

  do {
    food = {
      x: Math.floor(Math.random() * (canvas.width / box)) * box,
      y: Math.floor(Math.random() * (canvas.height / box)) * box
    };
  } while (snake.some(segment => segment.x === food.x && segment.y === food.y));
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") nextDirection = "LEFT";
  else if (e.key === "ArrowUp") nextDirection = "UP";
  else if (e.key === "ArrowRight") nextDirection = "RIGHT";
  else if (e.key === "ArrowDown") nextDirection = "DOWN";
});

function draw() {
  direction = nextDirection;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Yılanı çiz
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = (i === 0) ? "green" : "lightgreen";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  // Yem
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  // Yeni baş
  let head = { x: snake[0].x, y: snake[0].y };

  if (direction === "LEFT") head.x -= box;
  else if (direction === "UP") head.y -= box;
  else if (direction === "RIGHT") head.x += box;
  else if (direction === "DOWN") head.y += box;

  // Çarpma kontrolü
  if (
    head.x < 0 || head.x >= canvas.width ||
    head.y < 0 || head.y >= canvas.height ||
    snake.some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    clearInterval(game);
    alert("Oyun Bitti! Skor: " + score);
    startBtn.style.display = "inline-block";
    canvas.style.display = "none";
    scoreDisplay.style.display = "none";
    document.removeEventListener("keydown", changeDirection);
    return;
  }

  // Yem yendi mi
  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreDisplay.textContent = "Skor: " + score;
    do {
      food = {
        x: Math.floor(Math.random() * (canvas.width / box)) * box,
        y: Math.floor(Math.random() * (canvas.height / box)) * box
      };
    } while (snake.some(segment => segment.x === food.x && segment.y === food.y));
  } else {
    snake.pop();
  }

  snake.unshift(head);
}

startBtn.addEventListener("click", () => {
  initGame();
  startBtn.style.display = "none";
  canvas.style.display = "block";
  scoreDisplay.style.display = "block";
  document.addEventListener("keydown", changeDirection);
  game = setInterval(draw, 100);
});

// Yön değiştirme fonksiyonu:
function changeDirection(e) {
  if (e.key === "ArrowLeft") nextDirection = "LEFT";
  else if (e.key === "ArrowUp") nextDirection = "UP";
  else if (e.key === "ArrowRight") nextDirection = "RIGHT";
  else if (e.key === "ArrowDown") nextDirection = "DOWN";
}
