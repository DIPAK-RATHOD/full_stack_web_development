// Pomodoro Timer (25/5) with separate JS
const WORK_SECONDS = 25 * 60;
const BREAK_SECONDS = 5 * 60;

const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const timerEl = document.getElementById('timer');
const modeEl = document.getElementById('mode');
const cyclesEl = document.getElementById('cycles');

let remaining = WORK_SECONDS;
let mode = 'work'; // 'work' or 'break'
let timerId = null;
let cycles = 0; // completed work sessions

function formatMMSS(sec){
  const m = Math.floor(sec / 60).toString().padStart(2,'0');
  const s = (sec % 60).toString().padStart(2,'0');
  return `${m}:${s}`;
}

function updateUI(){
  timerEl.textContent = formatMMSS(remaining);
  modeEl.textContent = mode === 'work' ? 'Work' : 'Break';
  modeEl.classList.toggle('break', mode === 'break');
  cyclesEl.textContent = `Cycles: ${cycles}`;
}

function switchMode(){
  if (mode === 'work'){
    mode = 'break';
    remaining = BREAK_SECONDS;
  } else {
    mode = 'work';
    remaining = WORK_SECONDS;
  }
  updateUI();
}

function tick(){
  if (remaining <= 0){
    // finished current session
    if (mode === 'work') cycles += 1;
    switchMode();
    return; // next tick will decrement
  }
  remaining -= 1;
  updateUI();
}

function start(){
  if (timerId) return;
  timerId = setInterval(tick, 1000);
  startBtn.disabled = true;
  pauseBtn.disabled = false;
}

function pause(){
  if (!timerId) return;
  clearInterval(timerId);
  timerId = null;
  startBtn.disabled = false;
  pauseBtn.disabled = true;
}

function reset(){
  pause();
  mode = 'work';
  remaining = WORK_SECONDS;
  cycles = 0;
  updateUI();
}

startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);

// initialize UI
updateUI();
