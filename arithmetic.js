// arithmetic.js

function isValidInput(num, system) {
  const patterns = {
    binary: /^[01]+$/,
    decimal: /^[0-9]+$/,
    hexadecimal: /^[0-9a-fA-F]+$/,
    octal: /^[0-7]+$/,
  };
  system = system.toLowerCase();
  return patterns[system].test(num);
}

function calcOperation(num1, num2, system, operation) {
  if(!isValidInput(num1, system) || !isValidInput(num2, system)) {
    return 'Invalid input for ' + system;
  }

  let base = {
    binary: 2,
    decimal: 10,
    hexadecimal: 16,
    octal: 8,
  }[system];

  let a = parseInt(num1, base);
  let b = parseInt(num2, base);
  let result;

  switch(operation) {
    case 'add': result = a + b; break;
    case 'subtract': result = a - b; break;
    case 'multiply': result = a * b; break;
    case 'divide': 
      if(b === 0) return 'Error: Division by zero';
      result = Math.floor(a / b);
      break;
    default: return 'Invalid operation';
  }

  if(isNaN(result)) return 'Error in calculation';

  // Show result in selected number system
  return result.toString(base).toUpperCase();
}

document.getElementById('calcBtn').addEventListener('click', () => {
  const system = document.getElementById('arithSystem').value;
  const operation = document.getElementById('operation').value;
  const num1 = document.getElementById('num1').value.trim();
  const num2 = document.getElementById('num2').value.trim();
  const resultDiv = document.getElementById('result');

  const result = calcOperation(num1, num2, system, operation);
  resultDiv.textContent = 'Result: ' + result;
});
