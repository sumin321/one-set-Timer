let totalMinutes = 120; // 2시간 = 120분
let timerInterval = null;
let alertedMinutes = new Set();

const oneMinSound = new Audio('1min.mp3');
const thirtyMinSound = new Audio('30min.mp3');
const twoHourSound = new Audio('2hour.mp3');

function startTimer() {
  let endTime = Date.now() + totalMinutes * 60 * 1000;
  alertedMinutes.clear();

  timerInterval = setInterval(() => {
    const now = Date.now();
    let remainingMs = endTime - now;

    if (remainingMs <= 0) {
      document.getElementById('timeDisplay').textContent = "00:00:00";
      twoHourSound.play();
      clearInterval(timerInterval);
      return;
    }

    const remainingMin = Math.floor(remainingMs / 60000);
    const remainingSec = Math.floor((remainingMs % 60000) / 1000);

    const hours = String(Math.floor(remainingMin / 60)).padStart(2, '0');
    const mins = String(remainingMin % 60).padStart(2, '0');
    const secs = String(remainingSec).padStart(2, '0');

    document.getElementById('timeDisplay').textContent = `${hours}:${mins}:${secs}`;

    // 알림
    const elapsed = 120 - remainingMin; // 경과된 분 수
    if (!alertedMinutes.has(elapsed) && remainingSec === 0) {
          if (elapsed === 120) {
        twoHourSound.play();
      } else if (elapsed % 30 === 0 && elapsed !== 0) {
        thirtyMinSound.play();
      } else if (elapsed > 0) {
        oneMinSound.play();
      }
      alertedMinutes.add(elapsed);
    }
  }, 1000);
}
