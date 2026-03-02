const birthInput = document.getElementById('birthdate');
const btn = document.getElementById('calc');
const out = document.getElementById('output');
const err = document.getElementById('error');

function calculateAge(birthDate, now = new Date()){
  // make sure we use local dates without time offsets
  const b = new Date(birthDate.getFullYear(), birthDate.getMonth(), birthDate.getDate());
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  if (b > today) return null;

  let years = today.getFullYear() - b.getFullYear();
  let months = today.getMonth() - b.getMonth();
  let days = today.getDate() - b.getDate();

  if (days < 0) {
    // borrow days from previous month
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
    months -= 1;
  }

  if (months < 0) {
    months += 12;
    years -= 1;
  }

  return { years, months, days };
}

function showResult(obj){
  out.hidden = false;
  out.textContent = `${obj.years} year${obj.years!==1?'s':''}, ${obj.months} month${obj.months!==1?'s':''}, ${obj.days} day${obj.days!==1?'s':''}`;
}

function validateAndCompute(){
  err.textContent = '';
  out.hidden = true;

  const val = birthInput.value;
  if (!val){ err.textContent = 'Please select a birthdate.'; return; }

  const birth = new Date(val + 'T00:00:00');
  const age = calculateAge(birth);
  if (!age){ err.textContent = 'Birthdate is in the future. Please enter a valid past date.'; return; }

  showResult(age);
}

btn.addEventListener('click', validateAndCompute);
birthInput.addEventListener('keydown', (e)=>{ if (e.key === 'Enter') validateAndCompute(); });
