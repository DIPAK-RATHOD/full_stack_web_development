const unitDefinitions = {
  length: {
    meter: 1,
    kilometer: 1000,
    centimeter: 0.01,
    millimeter: 0.001,
    mile: 1609.34,
    yard: 0.9144,
    foot: 0.3048,
    inch: 0.0254
  },
  weight: {
    kilogram: 1,
    gram: 0.001,
    milligram: 0.000001,
    pound: 0.453592,
    ounce: 0.0283495,
    ton: 1000
  },
  volume: {
    liter: 1,
    milliliter: 0.001,
    "cubic meter": 1000,
    "cubic centimeter": 0.001,
    gallon: 3.78541,
    quart: 0.946353,
    pint: 0.473176
  }
};

function populateUnits(category) {
  const fromSelect = document.getElementById('fromUnit');
  const toSelect = document.getElementById('toUnit');
  fromSelect.innerHTML = '';
  toSelect.innerHTML = '';
  const list = unitDefinitions[category];
  for (const key in list) {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = key;
    fromSelect.appendChild(option.cloneNode(true));
    toSelect.appendChild(option.cloneNode(true));
  }
}

document.getElementById('category').addEventListener('change', function() {
  populateUnits(this.value);
  document.getElementById('result').textContent = '';
});

// initialize
populateUnits(document.getElementById('category').value);

document.getElementById('convertBtn').addEventListener('click', function() {
  const input = parseFloat(document.getElementById('inputValue').value);
  const from = document.getElementById('fromUnit').value;
  const to = document.getElementById('toUnit').value;
  const category = document.getElementById('category').value;
  if (isNaN(input)) {
    document.getElementById('result').textContent = 'Please enter a number.';
    return;
  }
  if (from === to) {
    document.getElementById('result').textContent = `${input} ${from} = ${input} ${to}`;
    return;
  }
  const baseValue = input * unitDefinitions[category][from];
  const output = baseValue / unitDefinitions[category][to];
  document.getElementById('result').textContent = `${input} ${from} = ${output.toFixed(4)} ${to}`;
});
