import functions from './functions.js';

// **********
//
// Event listener for SIZE app

idNumber.addEventListener('change', (() => {
    idNumberSize.textContent = functions.size(idNumber.value);
}));



// Event listeners for simple CALCULATOR app 
//      The toFixed() method rounds the input by the number of decimals specified (variable dec). Only works with text input. 

plus.addEventListener("click", (() => {
    let dec = Number(document.getElementById("dec").value);
    result.innerHTML = (functions.addFunction()).toFixed(dec)
}));

minus.addEventListener("click", (() => {
    let dec = Number(document.getElementById("dec").value);
    result.innerHTML = (functions.subtractFunction()).toFixed(dec)
}));

multiply.addEventListener("click", (() => {
    let dec = Number(document.getElementById("dec").value);
    result.innerHTML = (functions.multiplyFunction()).toFixed(dec)
}));

divide.addEventListener("click", (() => {
    let dec = Number(document.getElementById("dec").value);
    result.innerHTML = (functions.divideFunction()).toFixed(dec)
}));



// Event listener for FEDERAL TAXES app 

income.addEventListener('change', (() => {
    const calculateTaxResult = functions.calculateTax(income.value); 
    tax.textContent = calculateTaxResult[0];
    margin.textContent = calculateTaxResult[1];
    howFar.textContent = calculateTaxResult[2];
}));