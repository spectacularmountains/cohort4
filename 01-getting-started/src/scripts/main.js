import functions from './functions.js';

// **********
//
// Event listener for SIZE app

idNumber.addEventListener('change', (() => {
    idNumberSize.textContent = functions.size(idNumber.value);
}));


// Event listener for FEDERAL TAXES app 
//      toFixed(2) method rounds the number down to 2 decimals and returns a string 

income.addEventListener('change', (() => {
    const calculateTaxResult = functions.calculateTax(income.value); 
    tax.textContent = calculateTaxResult[0].toFixed(2);
    margin.textContent = calculateTaxResult[1];
    howFar.textContent = calculateTaxResult[2];
}));