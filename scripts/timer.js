let timerInterval, startTime;

export const startTimer = (timerElement) => {
  startTime = Date.now();
  timerInterval = setInterval(() => {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    timerElement.innerHTML = `Time: ${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, 1000);
};

export const resetTimer = (timerElement) => {
  if (timerInterval) clearInterval(timerInterval);
  timerElement.innerHTML = "Time: 0:00";
};
