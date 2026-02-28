// simple BMI calculator script

function calculateBMI(heightCm, weightKg) {
    const heightM = heightCm / 100;
    if (heightM <= 0) return null;
    return weightKg / (heightM * heightM);
}

function classifyBMI(bmi) {
    if (bmi === null || isNaN(bmi)) return '';
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal weight';
    if (bmi < 30) return 'Overweight';
    return 'Obesity';
}

document.getElementById('bmi-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const bmi = calculateBMI(height, weight);
    const category = classifyBMI(bmi);
    const resultDiv = document.getElementById('result');
    if (bmi === null || isNaN(bmi) || height <= 0 || weight <= 0) {
        resultDiv.textContent = 'Please enter valid height and weight.';
        return;
    }
    resultDiv.textContent = `Your BMI is ${bmi.toFixed(2)} (${category}).`;
});
