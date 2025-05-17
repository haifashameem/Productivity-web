let timer;
let timeLeft = 25 * 60; // Focus time in seconds
let currentMode = 'focus'; // Current timer mode

function startTimer(duration) {
    resetTimer();
    timeLeft = duration;
    updateTimerDisplay();

    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert(currentMode === 'focus' 
                ? "Focus time's up!" 
                : currentMode === 'shortBreak' 
                    ? "Short break's over!" 
                    : "Long break's over!"
            );
            if (currentMode === 'shortBreak' || currentMode === 'longBreak') {
                document.getElementById("skipBreakButton").style.display = 'block'; // Show skip button
            }
            resetTimer(); // Reset timer to initial focus time
            return;
        }
        timeLeft--;
        updateTimerDisplay();
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById("currentTimer").innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 25 * 60; // Reset to default focus time
    currentMode = 'focus';
    document.getElementById("skipBreakButton").style.display = 'none'; // Hide skip button
    updateTimerDisplay();
}

document.getElementById("focusButton").addEventListener("click", () => {
    currentMode = 'focus';
    timeLeft = 25 * 60; // Set time to 25 minutes
    updateTimerDisplay();
});

document.getElementById("shortBreakButton").addEventListener("click", () => {
    currentMode = 'shortBreak';
    timeLeft = 5 * 60; // Set time to 5 minutes
    updateTimerDisplay();
});

document.getElementById("longBreakButton").addEventListener("click", () => {
    currentMode = 'longBreak';
    timeLeft = 10 * 60; // Set time to 10 minutes
    updateTimerDisplay();
});

document.getElementById("startButton").addEventListener("click", () => {
    if (currentMode === 'focus') {
        startTimer(25 * 60);
    } else if (currentMode === 'shortBreak') {
        startTimer(5 * 60);
    } else if (currentMode === 'longBreak') {
        startTimer(10 * 60);
    }
});

document.getElementById("resetButton").addEventListener("click", resetTimer);

document.getElementById("skipBreakButton").addEventListener("click", () => {
    currentMode = 'focus'; // Go back to focus
    resetTimer();
});
