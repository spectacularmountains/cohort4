import functions from './daily'


test('Convert to Fahrenheit', () => {
    expect(functions.convertToFahrenheit(100)).toBe(212); 
    expect(functions.convertToFahrenheit(0)).toBe(32); 
    expect(functions.convertToFahrenheit(-10)).toBe(14);     
});
