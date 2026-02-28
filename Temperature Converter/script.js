document.getElementById('convertBtn').addEventListener('click', function() {
 const input = parseFloat(document.getElementById('inputTemp').value);
 const from = document.getElementById('fromUnit').value;
 const to = document.getElementById('toUnit').value;
 if (isNaN(input)) {
   document.getElementById('result').textContent = 'Please enter a temperature.';
   return;
 }
 let celsius;
 switch (from) {
   case 'celsius':
     celsius = input;
     break;
   case 'fahrenheit':
     celsius = (input - 32) * 5/9;
     break;
   case 'kelvin':
     celsius = input - 273.15;
     break;
 }
 let output;
 switch (to) {
   case 'celsius':
     output = celsius;
     break;
   case 'fahrenheit':
     output = celsius * 9/5 + 32;
     break;
   case 'kelvin':
     output = celsius + 273.15;
     break;
 }
 document.getElementById('result').textContent = `${input} ${from} = ${output.toFixed(2)} ${to}`;
});
