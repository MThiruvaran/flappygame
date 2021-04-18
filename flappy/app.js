document.addEventListener("DOMContentLoaded", () => {
  const bird = document.querySelector(".bird");
  const gameDisplay = document.querySelector(".game-container");
  const sky = document.querySelector(".sky");
  const groundContainer = document.querySelector(".ground-container");
  const timer = document.querySelector(".timer-text");
  const score = document.querySelector(".score-text");

  const backgroundArray = ["Beach", "Capital", "Krakow", "Lake", "Mountain"];
  const obstacles = [
    "Dragon.gif",
    "Eagle.gif",
    "FootbalPlayer.gif",
    "PolishFlag.png",
    "Shamrock.png",
    "Siren.gif",
  ];

  let birdBottom = 250;
  let birdLeft = 100;
  let isGameOver = false;

  const gravity = 2;
  let time = 60;
  let scoreCount = 0;

  timer.innerHTML = time;
  score.innerHTML = scoreCount;

  const startGame = () => {
    birdBottom -= gravity;
    bird.style.left = birdLeft + "px";
    bird.style.bottom = birdBottom + "px";
  };

  let gameTimerId = setInterval(startGame, 20);

  const jump = () => {
    if (birdBottom < 500) {
      birdBottom += 50;
    }
  };

  const control = (e) => {
    if (e.keyCode === 32) {
      jump();
    }
  };

  const generateObstacle = () => {
    let obstacleLeft = 400;
    let randomHeight = 62 + Math.random() * 380;
    let obstacleBottom = randomHeight;

    const obstacle = document.createElement("div");

    if (!isGameOver) {
      obstacle.classList.add("obstacle");
    }

    let obstacleNumber = Math.floor(Math.random() * 6);

    gameDisplay.appendChild(obstacle);

    obstacle.style.backgroundImage = `url('./obstacle/${obstacles[obstacleNumber]}')`;

    obstacle.style.left = obstacleLeft + "px";

    obstacle.style.bottom = obstacleBottom + "px";

    const moveObstacle = () => {
      obstacleLeft -= 2;
      obstacle.style.left = obstacleLeft + "px";

      if (obstacleLeft === -10) {
        clearInterval(timerId);
        gameDisplay.removeChild(obstacle);
        scoreCount += 10;
        score.innerHTML = scoreCount;
      }

      if (birdBottom === 60 || birdBottom === 470) {
        clearInterval(timerId);
        gameOver();
      }
    };
    let timerId = setInterval(moveObstacle, 20);
    if (!isGameOver) {
      setTimeout(generateObstacle, 1000);
    }
  };

  generateObstacle();

  const ChangeBackground = () => {
    let randomBackground = Math.floor(Math.random() * 4);
    console.log(randomBackground);
    sky.style.backgroundImage = `url('./backgrounds/${backgroundArray[randomBackground]}Static.png')`;
    groundContainer.style.backgroundImage = `url('./backgrounds/${backgroundArray[randomBackground]}Ground.png')`;
  };

  let backgroundChange = setInterval(() => {
    if (!isGameOver) {
      ChangeBackground();
    }
  }, 20000);

  const gameOver = () => {
    clearInterval(gameTimerId);
    clearInterval(backgroundChange);
    isGameOver = true;
    document.removeEventListener("keyup", control);
  };

  document.addEventListener("keyup", control);

  const startTimer = () => {
    let timerCounter = setInterval(() => {
      if (time === 0) {
        gameOver();
        isGameOver = true;
        clearInterval(timerCounter);
      }
      if (!isGameOver) {
        time -= 1;
        timer.innerHTML = time;
      }
    }, 1000);
  };
  startTimer();
});
