import functions from './functions.js';
import functions from './dommy.js';

// **********
//
// Event listener for hashchange - if user clicks on NavBar, anchor will be offset upwards to reveal section heading. 

window.addEventListener("hashchange", function () {
    window.scrollTo(window.scrollX, window.scrollY - 200);
});



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



// Event listener for WORKING WITH ARRAYS app 
let resultArray = [];
let total = 0;

addArr.addEventListener("click", (() => {
    if (isNaN(inputArray.value) || inputArray.value == "") {
        return message.innerHTML = "Input is not a valid number!"
    } else {
    functions.addToArray(inputArray.value, resultArray);
    message.innerHTML = "Array has been added!"
}
}));

showArr.addEventListener("click", (() => {
    message.innerHTML = resultArray;
}));

totalArr.addEventListener("click", (() => {
    const result = functions.totalInArray(resultArray, total);
    message.innerHTML = "The total is: " + result;
}));

clearArr.addEventListener("click", (() => {
    resultArray = []; 
    message.innerHTML = "Array cleared!"; 
    document.getElementById("inputArray").value = "";
}));


// Event listener for WORKING WITH DICTIONARIES app 

lookup.addEventListener("click", (() => {
    provinceMessage.innerHTML = functions.lookupProvince(inputProvince.value);
}));