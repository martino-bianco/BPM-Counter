let taps = [];
let lastTapTime = 0;
let tapsCount = 0;
let resetTimer;

const tapButton = document.getElementById("tapButton");
const result = document.getElementById("result");
const resetButton = document.getElementById("resetButton");

tapButton.addEventListener("click", () => {
  clearInterval(resetTimer); // Clear the reset timer on button click
  resetTimer = resetCounter(); // Reset timer starts again on click

  const now = Date.now();
  if (lastTapTime !== 0) {
    const timeElapsed = now - lastTapTime;
    taps.push(timeElapsed);
    tapsCount++;
    if (tapsCount >= 2) {
      const bpm = calculateBPM();
      result.textContent = `${bpm.toFixed(2)}`;
    }
  }
  lastTapTime = now;

  changeBackgroundColor();
});

resetButton.addEventListener("click", () => {
  clearInterval(resetTimer);
  taps = [];
  tapsCount = 0;
  result.textContent = "";
});

function calculateBPM() {
  const averageTime =
    taps.reduce((acc, tap) => acc + tap, 0) / taps.length || 1;
  const averageTimeInSeconds = averageTime / 1000;
  const bpm = 60 / averageTimeInSeconds;
  return bpm;
}

function changeBackgroundColor() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  document.body.style.backgroundColor = `rgb(${red},${green},${blue})`;
}

function resetCounter() {
  return setTimeout(() => {
    taps = [];
    tapsCount = 0;
    result.textContent = "";
  }, 2000);
}
