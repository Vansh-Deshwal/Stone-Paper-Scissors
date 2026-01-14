const rockElement = document.querySelector(".js-rock-button");
const paperElement = document.querySelector(".js-paper-element");
const scissorsElement = document.querySelector(".js-scissors-element");
const autoPlayButton = document.querySelector(".auto-play-button");
const resetButton = document.querySelector(".reset-btn");
let count = 0;
let score = localStorage.getItem("score");
let scoreCont = document.body.querySelector(".win-loss-tie-container");
let userChoice = "";
let randomNumber = 0;
let compChoice = "";
let gameResult1 = "win";
let gameResult2 = "lose";
let gameResult3 = "tie";

function rockLogicCode() {
  userChoice = "Rock";
  randomNumber = Math.random();
  compChoice = RockPaperSissors(randomNumber);
  let result1 = gameOutput(userChoice, compChoice);
  getGameResult(result1, gameResult1, gameResult2, gameResult3);
  updateScore();
}

function paperLogicCode() {
  userChoice = "Paper";
  randomNumber = Math.random();
  compChoice = RockPaperSissors(randomNumber);
  let result1 = gameOutput(userChoice, compChoice);
  getGameResult(result1, gameResult1, gameResult2, gameResult3);
  updateScore();
}

function scissorsLogicCode() {
  userChoice = "Scissors";
  randomNumber = Math.random();
  compChoice = RockPaperSissors(randomNumber);
  let result3 = gameOutput(userChoice, compChoice);
  getGameResult(result3, gameResult1, gameResult2, gameResult3);
  updateScore();
}

document.body.addEventListener("keydown", (event) => {
  if (event.key === "r" || event.key === "R") {
    rockLogicCode();
  } else if (event.key === "p" || event.key === "P") {
    paperLogicCode();
  } else if (event.key === "s" || event.key === "S") {
    scissorsLogicCode();
  }
});

resetButton.addEventListener("click", () => {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  updateScore();
});

autoPlayButton.addEventListener("click", () => {
  autoPlay();
  if (autoPlayButton.innerHTML === "Stop Auto Play") {
    autoPlayButton.innerHTML = "Auto Play";
  } else {
    autoPlayButton.innerHTML = "Stop Auto Play";
  }
});

rockElement.addEventListener("click", () => {
  rockLogicCode();
});

paperElement.addEventListener("click", () => {
  paperLogicCode();
});

scissorsElement.addEventListener("click", () => {
  scissorsLogicCode();
});

if (score === null) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0,
  };
} else {
  score = JSON.parse(score);
}

function updateScore() {
  localStorage.setItem("score", JSON.stringify(score));
  scoreCont.innerHTML = `Wins: ${score.wins} | Losses: ${score.losses} | Ties: ${score.ties}`;
}

updateScore();

function getGameResult(r, gr1, gr2, gr3) {
  if (r === gr1) {
    score.wins += 1;
  } else if (r === gr2) {
    score.losses += 1;
  } else if (r === gr3) {
    score.ties += 1;
  }
}

function RockPaperSissors(randomNumbe) {
  let rps = "";
  if (randomNumbe >= 0 && randomNumbe <= 1 / 3) {
    rps = "Rock";
  } else if (randomNumbe > 1 / 3 && randomNumbe <= 2 / 3) {
    rps = "Paper";
  } else if (randomNumbe > 2 / 3 && randomNumbe <= 1) {
    rps = "Scissors";
  }
  return rps;
}

function gameOutput(userInp, compInp) {
  const output = document.querySelector(".output");
  const outputContainer2 = document.querySelector(".output2");

  const images = {
    Rock: "stone.png",
    Paper: "paper.png",
    Scissors: "scissors.png",
  };

  if (userInp === "Rock" && compInp === "Scissors") {
    output.innerHTML = `
      You <img src="${images.Rock}" class="game-img">
      <img src="${images.Scissors}" class="game-img"> Computer
    `;
    outputContainer2.innerHTML = `You ${gameResult1}.`;
    return gameResult1;
  } else if (userInp === "Scissors" && compInp === "Paper") {
    output.innerHTML = `
      You <img src="${images.Scissors}" class="game-img">
      <img src="${images.Paper}" class="game-img"> Computer
    `;
    outputContainer2.innerHTML = `You ${gameResult1}.`;
    return gameResult1;
  } else if (userInp === "Paper" && compInp === "Rock") {
    output.innerHTML = `
      You <img src="${images.Paper}" class="game-img">
      <img src="${images.Rock}" class="game-img"> Computer
    `;
    outputContainer2.innerHTML = `You ${gameResult1}.`;
    return gameResult1;
  } else if (userInp === "Rock" && compInp === "Paper") {
    output.innerHTML = `
      You <img src="${images.Rock}" class="game-img">
      <img src="${images.Paper}" class="game-img"> Computer
    `;
    outputContainer2.innerHTML = `You ${gameResult2}.`;
    return gameResult2;
  } else if (userInp === "Scissors" && compInp === "Rock") {
    output.innerHTML = `
      You <img src="${images.Scissors}" class="game-img">
      <img src="${images.Rock}" class="game-img"> Computer
    `;
    outputContainer2.innerHTML = `You ${gameResult2}.`;
    return gameResult2;
  } else if (userInp === "Paper" && compInp === "Scissors") {
    output.innerHTML = `
      You <img src="${images.Paper}" class="game-img">
      <img src="${images.Scissors}" class="game-img"> Computer
    `;
    outputContainer2.innerHTML = `You ${gameResult2}.`;
    return gameResult2;
  } else if (userInp === compInp) {
    output.innerHTML = `
      You <img src="${images[userInp]}" class="game-img">
      <img src="${images[compInp]}" class="game-img"> Computer
    `;
    outputContainer2.innerHTML = `It's a ${gameResult3}.`;
    return gameResult3;
  }
}

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = RockPaperSissors(Math.random());
      const computerMove = RockPaperSissors(Math.random());
      const result = gameOutput(playerMove, computerMove);
      getGameResult(result, gameResult1, gameResult2, gameResult3);
      updateScore();
      isAutoPlaying = true;
    }, 1000);
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}
