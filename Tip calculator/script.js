document.addEventListener('DOMContentLoaded', () => {
    const billInput = document.getElementById('bill-amount');
    const tipInput = document.getElementById('tip-percentage');
    const calculateBtn = document.getElementById('calculate');
    const resultsDiv = document.getElementById('results');
    const tipAmountSpan = document.getElementById('tip-amount');
    const totalAmountSpan = document.getElementById('total-amount');

    function calculateTip() {
        const bill = parseFloat(billInput.value);
        const tipPercent = parseFloat(tipInput.value);

        if (isNaN(bill) || isNaN(tipPercent)) {
            return;
        }

        const tip = bill * (tipPercent / 100);
        const total = bill + tip;

        tipAmountSpan.textContent = `$${tip.toFixed(2)}`;
        totalAmountSpan.textContent = `$${total.toFixed(2)}`;

        resultsDiv.classList.remove('hidden');
    }

    calculateBtn.addEventListener('click', calculateTip);
    // allow pressing Enter inside inputs to calculate
    [billInput, tipInput].forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                calculateTip();
            }
        });
    });
});
