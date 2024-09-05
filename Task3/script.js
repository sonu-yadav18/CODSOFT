const buttons = document.querySelectorAll('.btn');
const display = document.getElementById('display');
const calculator = document.querySelector('.calculator');
const brand = document.getElementById('brand');

let currentInput = '0';
let operator = '';
let firstOperand = null;
let isOn = true; // Track if the calculator is on or off

// Toggle power state
brand.addEventListener('click', () => {
    isOn = !isOn;
    if (isOn) {
        calculator.classList.remove('off');
        display.textContent = currentInput || '0';
    } else {
        calculator.classList.add('off');
        display.textContent = 'OFF';
        currentInput = '';
        operator = '';
        firstOperand = null;
    }
});

// Handle button clicks
buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (!isOn) return; // Do nothing if the calculator is off

        const value = button.getAttribute('data-value');

        if (value === 'C') {
            currentInput = '0';
            operator = '';
            firstOperand = null;
            updateDisplay();
            return;
        }

        if (value === '=') {
            if (operator && firstOperand !== null) {
                currentInput = calculate(firstOperand, currentInput, operator);
                operator = '';
                firstOperand = null;
                updateDisplay();
            }
            return;
        }

        if (['+', '-', '*', '/', 'sqrt', 'sq', '%'].includes(value)) {
            if (operator && firstOperand !== null) {
                currentInput = calculate(firstOperand, currentInput, operator);
                updateDisplay();
            }
            operator = value;
            firstOperand = currentInput;
            currentInput = '0';
            return;
        }

        if (currentInput === '0' && value !== '.') {
            currentInput = value;
        } else {
            currentInput += value;
        }
        updateDisplay();
    });
});

function updateDisplay() {
    display.textContent = currentInput;
}

function calculate(operand1, operand2, operator) {
    const num1 = parseFloat(operand1);
    const num2 = parseFloat(operand2);

    if (isNaN(num1) || isNaN(num2)) return 'Error';

    switch (operator) {
        case '+':
            return (num1 + num2).toString();
        case '-':
            return (num1 - num2).toString();
        case '*':
            return (num1 * num2).toString();
        case '/':
            return (num1 / num2).toString();
        case 'sqrt':
            return (Math.sqrt(num1)).toString();
        case 'sq':
            return (Math.pow(num1, 2)).toString();
        case '%':
            return ((num1 / 100) * num2).toString();
        default:
            return 'Error';
    }
}
