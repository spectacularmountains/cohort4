import functions from './functions.js';

// **********
//
// Event listener for SIZE app

idNumber.addEventListener('change', (() => {
    idNumberSize.textContent = functions.size(idNumber.value);
}));


// Event listeners for simple CALCULATOR app 

plus.addEventListener("click", (() => {
    let dec = Number(document.getElementById("dec").value);
    result.innerHTML = (functions.addFunction()).toFixed(dec);
}));

minus.addEventListener("click", (() => {
    result.innerHTML = functions.subtractFunction();
}));

multiply.addEventListener("click", (() => {
    result.innerHTML = functions.multiplyFunction();
}));

divide.addEventListener("click", (() => {
    result.innerHTML = functions.divideFunction();
}));


// // MINUS
// document.getElementById("minus").addEventListener("click", minusFunction(){
//     let number1 = Number(document.getElementById("number1").value)
//     let number2 = Number(document.getElementById("number2").value)
//     let final = number1 - number2;
//     if (isNaN(number1) || isNaN(number2)) {
//         result.innerHTML = "Please enter a number!";
//     } else {
//     result.innerHTML = Number(final);
//     };
// });

// // MULTIPLY
// document.getElementById("multiply").addEventListener("click", multiplyFunction(){
//     let number1 = Number(document.getElementById("number1").value)
//     let number2 = Number(document.getElementById("number2").value)
//     let final = number1 * number2;
//     if (isNaN(number1) || isNaN(number2)) {
//         result.innerHTML = "Please enter a number!";
//     } else {
//     result.innerHTML = Number(final);
//     };
// });

// // DIVIDE
// document.getElementById("divide").addEventListener("click", divideFunction(){
//     let number1 = Number(document.getElementById("number1").value)
//     let number2 = Number(document.getElementById("number2").value)
//     let final = number1 / number2;
//     if (isNaN(number1) || isNaN(number2)) {
//         result.innerHTML = "Please enter a number!";
//     } else {
//     result.innerHTML = Number(final);
//     };
// });

// Event listener for FEDERAL TAXES app 
//      toFixed(2) method rounds the number down to 2 decimals and returns a string 

income.addEventListener('change', (() => {
    const calculateTaxResult = functions.calculateTax(income.value); 
    tax.textContent = calculateTaxResult[0].toFixed(2);
    margin.textContent = calculateTaxResult[1];
    howFar.textContent = calculateTaxResult[2];
}));