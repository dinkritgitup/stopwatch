const timeDisplay = document.querySelector("#timeDisplay");
const startBtn = document.querySelector("#startBtn");
const lapBtn = document.querySelector("#lapBtn");
const lapContainer = document.querySelector("#lapContainer");
let lapTimes = [];

const pauseBtn = document.querySelector("#pauseBtn");
const resetBtn = document.querySelector("#resetBtn");

let startTime = 0;
let elapsedTime = 0;
let currentTime = 0;
let paused = true;
let intervalId;
let hrs = 0;
let mins = 0;
let secs = 0;

startBtn.addEventListener("click", () => {
  if (paused) {
    paused = false;
    startTime = Date.now() - elapsedTime; // Fixed typo here
    intervalId = setInterval(updateTime, 75);
  }
});

pauseBtn.addEventListener("click", () => {
  if (!paused) {
    paused = true;
    clearInterval(intervalId);
  }
});

lapBtn.addEventListener("click", () => {
  if (!paused) {
    const lapTime = timeDisplay.textContent;
    lapTimes.push(lapTime);
    updateLapDisplay();
  }
});

function updateLapDisplay() {
  lapContainer.innerHTML = "<h3>Lap Times:</h3>";
  lapContainer.innerHTML += "";

  lapTimes.forEach((lap, index) => {
    const lapElement = document.createElement("div");
    lapElement.textContent = `Lap ${index + 1}: ${lap}`;
    lapElement.style.color = "white";
    lapElement.style.fontFamily = "consolas, monospace";
    lapElement.style.margin = "5px 0";

    lapContainer.appendChild(lapElement);
  });
}

resetBtn.addEventListener("click", () => {
  paused = true;
  clearInterval(intervalId);
  elapsedTime = 0;
  timeDisplay.textContent = "0:00:00";
});

function updateTime() {
  elapsedTime = Date.now() - startTime;
  secs = Math.floor((elapsedTime / 1000) % 60);
  mins = Math.floor((elapsedTime / (1000 * 60)) % 60);
  hrs = Math.floor((elapsedTime / (1000 * 60 * 60)) % 60);

  timeDisplay.textContent = `${hrs}:${mins < 10 ? "0" + mins : mins}:${
    secs < 10 ? "0" + secs : secs
  }`;
}
