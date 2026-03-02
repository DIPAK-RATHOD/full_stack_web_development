let timerId = null;
const targetInput = document.getElementById('target');
const eventInput = document.getElementById('event');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');
const display = document.getElementById('display');
const message = document.getElementById('message');

function formatTime(ms){
  const totalSec = Math.floor(ms/1000);
  const days = Math.floor(totalSec / 86400);
  const hours = Math.floor((totalSec % 86400) / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;
  return { days, hours, minutes, seconds };
}

function pad(n){ return n.toString().padStart(2,'0'); }

function updateDisplay(when){
  const now = new Date();
  const diff = when - now;
  if (diff <= 0){
    display.textContent = '00d 00:00:00';
    message.textContent = (eventInput.value || 'Event') + ' reached!';
    stopTicker();
    return;
  }
  const t = formatTime(diff);
  display.textContent = `${t.days}d ${pad(t.hours)}:${pad(t.minutes)}:${pad(t.seconds)}`;
}

function startTicker(){
  const val = targetInput.value;
  if (!val){ message.textContent = 'Please choose a target date & time.'; return; }
  const when = new Date(val);
  if (isNaN(when)) { message.textContent = 'Invalid date/time.'; return; }
  if (when <= new Date()) { message.textContent = 'Target must be in the future.'; return; }

  message.textContent = '';
  startBtn.disabled = true;
  stopBtn.disabled = false;
  targetInput.disabled = true;

  updateDisplay(when);
  timerId = setInterval(()=> updateDisplay(when), 1000);
}

function stopTicker(){
  if (timerId) clearInterval(timerId);
  timerId = null;
  startBtn.disabled = false;
  stopBtn.disabled = true;
  targetInput.disabled = false;
}

function resetAll(){
  stopTicker();
  display.textContent = 'No countdown set';
  message.textContent = '';
  targetInput.value = '';
  eventInput.value = '';
}

startBtn.addEventListener('click', startTicker);
stopBtn.addEventListener('click', stopTicker);
resetBtn.addEventListener('click', resetAll);
