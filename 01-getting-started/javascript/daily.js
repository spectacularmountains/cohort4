const functions = {
    convertToFahrenheit: (centigrade) => { 
        let fahrenheit = (centigrade * 9/5) + 32
        return fahrenheit;
    }, 
};

export default functions;
