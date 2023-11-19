let taps = [];
let lastTapTime = 0;
let tapsCount = 0;

const tapButton = document.getElementById("tapButton");
const result = document.getElementById("result");

tapButton.addEventListener("click", () => {
  const now = Date.now();
  if (lastTapTime !== 0) {
    const timeElapsed = now - lastTapTime;
    taps.push(timeElapsed);
    tapsCount++;
    if (tapsCount >= 4) {
      const bpm = calculateBPM();
      result.textContent = `BPM: ${bpm.toFixed(2)}`;
    }
  }
  lastTapTime = now;
});

function calculateBPM() {
  const averageTime =
    taps.reduce((acc, tap) => acc + tap, 0) / taps.length || 1;
  const averageTimeInSeconds = averageTime / 1000; // Convertion to seconds
  const bpm = 60 / averageTimeInSeconds; // Calculation of BPM
  return bpm;
}
