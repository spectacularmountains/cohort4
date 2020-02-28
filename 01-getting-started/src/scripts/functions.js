
const functions = {
    
    size: (num) => {
        if (num < 10) return "small";
        if (num < 20) return "medium";
        if (num < 100) return "large";
        return "extra large";
    },

    add: (num1, num2) => {
        return num1 + num2;
    },

    subtract: (num1, num2) => {
        return num1 - num2;
    },

    isEven: (num) => {
        if (num % 2 === 0) {return true};
        return false;
    }, 

    addFunction: () => {
        let number1 = Number(document.getElementById("number1").value);
        let number2 = Number(document.getElementById("number2").value);
        let final = number1 + number2;
        return Number(final);
     },
     
    subtractFunction: () => {
        let number1 = Number(document.getElementById("number1").value);
        let number2 = Number(document.getElementById("number2").value);
        let final = number1 - number2;
        return Number(final);
     },
     
    multiplyFunction: () => {
        let number1 = Number(document.getElementById("number1").value);
        let number2 = Number(document.getElementById("number2").value);
        let final = number1 * number2;
        return Number(final);
     },
     
    divideFunction: () => {
        let number1 = Number(document.getElementById("number1").value);
        let number2 = Number(document.getElementById("number2").value);
        let final = number1 / number2;
        return Number(final);
     },

    calculateTax: (income) => {
        const l1 = 48535; const mr1 = 0.15;
        const l2 = 97069; const mr2 = 0.205;
        const l3 = 150473; const mr3 = 0.26;
        const l4 = 214368; const mr4 = 0.29; 
        const mr5 = 0.33;

        if (isNaN(income)) {
            tax.innerHTML = "";
            margin.innerHTML = "";
            howFar.innerHTML = "";
        } else if (income < l1+0.01) {
            return [(income * mr1), mr1*100, l1-income] 
        } else if (income < l2+0.01) {
            return [((l1 * mr1) + ((income - l1) * mr2)), mr2*100, l2-income]
        } else if (income < l3+0.01) {
            return [(17229.72 + ((income - l2) * mr3)), mr3*100, l3-income]
        } else if (income < l4+0.01) {
            return [(35759.27 + ((income - l3) * mr4)), mr4*10*10, l4-income]
        } else {
            return [(54288.82 + ((income - 214368) * mr5)), mr5*100, 0]
        }
    }

    
};

export default functions;
