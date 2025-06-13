let totalSeconds = 2 * 60 * 60; // 2시간
let interval;

function startTimer() {
  clearInterval(interval);

  const sound1min = document.getElementById('sound1min');
  const sound30min = document.getElementById('sound30min');
  const sound2hour = document.getElementById('sound2hour');

  let current = totalSeconds;

  updateDisplay(current);

  interval = setInterval(() => {
    current--;

    if (current < 0) {
      clearInterval(interval);
      sound2hour.play();
      alert("2시간이 종료되었습니다!");
      return;
    }

    updateDisplay(current);

    if (current % 60 === 0) sound1min.play();       // 1분마다
    if (current % (30 * 60) === 0) sound30min.play(); // 30분마다
  }, 1000);
}

function updateDisplay(seconds) {
  const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  document.getElementById('timer').textContent = `${hrs}:${mins}:${secs}`;
}