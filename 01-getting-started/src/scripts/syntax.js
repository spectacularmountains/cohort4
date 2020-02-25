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
                
        updateValues: (newValue) => {
                var arr = ["Chinamans Peak", "East End of Rundle", "Grotto Mountain", "Mount Lady McDonald"];
                arr[0] = newValue;
                return arr;
        }, 
        
        // LOOPS
        loopFor: (letters) => {
                var verbs = ["start", "continue", "finish"]
                for (let i = 0; i < verbs.length; i++) {
                        verbs[i].concat(letters);
                }
                return verbs;
        }, 
}

export default functions;