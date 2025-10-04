// converter.js

function isValidInput(num, system) {
  system = system.toLowerCase();
  const patterns = {
    binary: /^[01]+$/,
    decimal: /^[0-9]+$/,
    hexadecimal: /^[0-9a-fA-F]+$/,
    octal: /^[0-7]+$/,
    bcd: /^[01]+$/, // BCD is binary but groups of 4 bits per digit; validation simplified here
  };
  return patterns[system].test(num);
}

function bcdToDecimal(bcd) {
  let decimal = '';
  for(let i = 0; i < bcd.length; i += 4) {
    const nibble = bcd.substring(i, i+4);
    let digit = parseInt(nibble, 2);
    if(isNaN(digit) || digit > 9) return null;
    decimal += digit.toString();
  }
  return decimal;
}

function decimalToBCD(decimal) {
  let bcd = '';
  for(let i=0; i<decimal.length; i++) {
    let bin = parseInt(decimal[i]).toString(2).padStart(4,'0');
    bcd += bin;
  }
  return bcd;
}

function convertNumber(num, fromSys, toSys) {
  fromSys = fromSys.toLowerCase();
  toSys = toSys.toLowerCase();

  if (!isValidInput(num, fromSys)) return 'Invalid input for ' + fromSys;

  if (fromSys === 'bcd') {
    // Convert BCD to decimal first
    let dec = bcdToDecimal(num);
    if (dec === null) return 'Invalid BCD input';
    if (toSys === 'decimal') return dec;
    // Else convert decimal to target
    num = dec;
    fromSys = 'decimal';
  }

  if (toSys === 'bcd') {
    // Convert input -> decimal -> BCD
    let decVal = parseInt(num, fromSys);
    if(isNaN(decVal)) return 'Invalid number';
    return decimalToBCD(decVal.toString());
  }

  // Normal conversion
  let decimalValue = parseInt(num, fromSys);
  if (isNaN(decimalValue)) return 'Conversion error';

  if (toSys === 'decimal') return decimalValue.toString();

  return decimalValue.toString(toSys);
}

document.getElementById('convertBtn').addEventListener('click', () => {
  const inputNum = document.getElementById('inputNumber').value.trim();
  const inputSys = document.getElementById('inputSystem').value;
  const outputSys = document.getElementById('outputSystem').value;

  const resultDiv = document.getElementById('result');
  const result = convertNumber(inputNum, inputSys, outputSys);
  resultDiv.textContent = 'Result: ' + result;
});
