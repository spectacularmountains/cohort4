import functions from './functions.js';

// **********
//
// Event listener for SIZE app

idNumber.addEventListener('change', (() => {
    idNumberSize.textContent = functions.size(idNumber.value);
}));


// Event listener for FEDERAL TAXES app 

income.addEventListener('change', (() => {
    tax.textContent = (functions.calculateTax(income.value)).toFixed(2);
}));