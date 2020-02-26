/* define attributes / variables
        number
        string
        boolean
        array
        dictionary / objects
        undefined
sample if / else
functions
        parameters
        returns
arrays
        add to the front
        add to the end
        update values
loops 
        for
        for/in
        while
        do while
        forEach (with array and function)
Objects / Dictionaries
        declare object
        lookup key to retrieve value */

const functions = {

        // DEFINE ATTRIBUTES / VARIABLES  
        defineType: (x) => {
                return typeof(x);
        },

        // Separate test for Array (as arrays are really objects)
        defineArray: (x) => {
                return Array.isArray(x);
        },

        
        // SAMPLE IF / ELSE 
        isNegative: (num) => {
                return (num < 0 ? true : false);
        }, 

        // FUNCTIONS PARAMETERS / RETURNS 
        addTwoNumbers: (num1, num2) => {
                return (num1 + num2);
        }, 

        // ARRAYS
        addToFront: (firstNumber) => {
                var arr = [2, 3];
                arr.unshift(firstNumber);
                return arr;
        }, 

        addToEnd: (lastNumber) => {
                var arr = [1, 2, 3];
                arr.push(lastNumber);
                return arr;
        }, 
                
        updateFirstValue: (arr, newValue) => {
                arr[0] = newValue;
                return arr;
        }, 
        
        // LOOPS

        // Loop add letters to verbs, e.g. changing present to past tense
        loopFor: (verbs, letters) => {
                
                for (let i = 0; i < verbs.length; i++) {
                        verbs[i] = verbs[i].concat(letters);
                }
                return verbs;
        }, 
        
        // Loop counts total number of fruits in basket
        loopForIn: (basket) => {
                let total = 0;
                for (let item in basket) {
                     total += basket[item];
                }
                return total;
        }, 

        // Loop produces an array from MIN number to MAX number
        whileLoop: (min, max) => {
                let i = min; 
                let newArray = [];
                while (i < (max + 1)) {
                        newArray = newArray.concat(i);
                        i++;
                }
                return newArray;
        },
        
        // Loop to add ! to an array of words
        doWhileLoop: (arr) => {
                let i = 0;
                let newArray = [];
                do {
                        newArray[i] = arr[i] + "!";
                        i++;
                }
                while (i < arr.length) {
                        
                }
                return newArray;
        },

        // Loop to transform each word into UPPERCASE
        dummyFunction: (arr) => {
                arr.forEach((item, index) => {
                arr[index] = item.toUpperCase(); 
                }); 
                return arr;
        },
};




export default functions;