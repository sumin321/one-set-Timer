let startTime = null;
let timerInterval = null;
let alertedMinutes = new Set(); // 중복 알림 방지

const oneMinSound = new Audio('1min.mp3');
const thirtyMinSound = new Audio('30min.mp3');
const twoHourSound = new Audio('2hour.mp3');

function startTimer() {
  startTime = Date.now();
  alertedMinutes.clear();

  timerInterval = setInterval(() => {
    const now = Date.now();
    const elapsedMs = now - startTime;
    const elapsedMin = Math.floor(elapsedMs / 60000); // ms → 분
    const elapsedSec = Math.floor((elapsedMs % 60000) / 1000); // 초

    document.getElementById('timeDisplay').textContent = 
      `${String(Math.floor(elapsedMin / 60)).padStart(2, '0')}:${String(elapsedMin % 60).padStart(2, '0')}:${String(elapsedSec).padStart(2, '0')}`;

    // 알림 조건
    if (!alertedMinutes.has(elapsedMin)) {
      if (elapsedMin === 120) {
        twoHourSound.play();
      } else if (elapsedMin % 30 === 0 && elapsedMin !== 0) {
        thirtyMinSound.play();
      } else if (elapsedMin > 0) {
        oneMinSound.play();
      }
      alertedMinutes.add(elapsedMin);
    }
  }, 1000);
}
