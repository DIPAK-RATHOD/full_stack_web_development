let startStopBtn = document.getElementById('startStop');
let lapBtn = document.getElementById('lap');
let resetBtn = document.getElementById('reset');
let display = document.getElementById('display');
let lapsList = document.getElementById('laps');

let startTime = null;
let elapsed = 0; // milliseconds
let timerInterval = null;
let running = false;

function formatTime(ms) {
    let totalSeconds = Math.floor(ms / 1000);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    let fraction = Math.floor((ms % 1000) / 10); // hundredths
    return (
        String(minutes).padStart(2, '0') + ':' +
        String(seconds).padStart(2, '0') + '.' +
        String(fraction).padStart(2, '0')
    );
}

function updateDisplay() {
    display.textContent = formatTime(elapsed + (running ? Date.now() - startTime : 0));
}

function startStop() {
    if (!running) {
        // start the timer
        running = true;
        startTime = Date.now();
        timerInterval = setInterval(updateDisplay, 33); // about 30fps
        startStopBtn.textContent = 'Stop';
        lapBtn.disabled = false;
        resetBtn.disabled = false;
    } else {
        // stop the timer
        running = false;
        elapsed += Date.now() - startTime;
        clearInterval(timerInterval);
        startStopBtn.textContent = 'Start';
    }
}

function reset() {
    running = false;
    elapsed = 0;
    clearInterval(timerInterval);
    display.textContent = '00:00.00';
    startStopBtn.textContent = 'Start';
    lapBtn.disabled = true;
    resetBtn.disabled = true;
    lapsList.innerHTML = '';
}

function recordLap() {
    let time = formatTime(elapsed + (running ? Date.now() - startTime : 0));
    let li = document.createElement('li');
    li.textContent = time;
    lapsList.appendChild(li);
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);
