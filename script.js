let taps = [];
let lastTapTime = 0;
let tapsCount = 0;
let resetTimer;

const tapButton = document.getElementById("tapButton");
const result = document.getElementById("result");
const resetButton = document.getElementById("resetButton");
const container = document.querySelector(".container");

tapButton.addEventListener("click", () => {
  clearInterval(resetTimer);
  resetTimer = resetCounter();

  const now = Date.now();
  if (lastTapTime !== 0) {
    const timeElapsed = now - lastTapTime;
    taps.push(timeElapsed);
    tapsCount++;
    if (tapsCount >= 4) {
      const lastFourTaps = taps.slice(-4);
      const bpm = calculateBPM(lastFourTaps);
      result.textContent = `${bpm.toFixed(2)}`;
    }
  }
  lastTapTime = now;

  changeBorderColor();
});

resetButton.addEventListener("click", () => {
  clearInterval(resetTimer);
  taps = [];
  tapsCount = 0;
  result.textContent = "";
});

function calculateBPM(lastFourTaps) {
  const averageTime =
    lastFourTaps.reduce((acc, tap) => acc + tap, 0) / lastFourTaps.length || 1;
  const averageTimeInSeconds = averageTime / 1000;
  const bpm = 60 / averageTimeInSeconds;
  return bpm;
}

function changeBorderColor() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  //   container.style.borderColor = `rgb(${red},${green},${blue})`;
  container.style.boxShadow = `0px 0px 1000px rgba(${red},${green},${blue})`;
}

function resetCounter() {
  return setTimeout(() => {
    taps = [];
    tapsCount = 0;
    result.textContent = "";
  }, 2000);
}
