
alert("Hi");

const taxFunctions = {
    calculateTax: (income) => {
        if (income < 48535.01) {
            return income * 0.15 
        } else if (income < 97069.01) {
            return 7280.25 + ((income - 48535) * 0.205) 
        } else if (income < 150473.01) {
            return 17229.72 + ((income - 97069) * 0.26) 
        } else if (income < 214368.01) {
            return 35759.27 + ((income - 150473) * 0.29) 
        } else {
            return 54288.82 + ((income - 214368) * 0.33)
        }
    }
}

let result = calculateTax();

document.getElementById("tax").innerHTML = "asdf";

// export default taxFunctions;