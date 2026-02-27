document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const keys = document.querySelector('.keys');

    keys.addEventListener('click', e => {
        const target = e.target;
        if (!target.matches('button')) return;

        const value = target.dataset.value;
        const action = target.dataset.action;

        if (value) {
            if (value === '=' ) {
                calculate();
            } else {
                display.value += value;
            }
        } else if (action) {
            if (action === 'clear') {
                display.value = '';
            } else if (action === 'delete') {
                display.value = display.value.slice(0, -1);
            }
        }
    });

    function calculate() {
        try {
            const result = eval(display.value);
            display.value = result;
        } catch (err) {
            alert('Invalid calculation');
        }
    }
});
