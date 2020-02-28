import taxFunctions from './tax'

test('What is your income tax', () => {
    expect(taxFunctions.calculateTax(1)).toBe(0.15); 
    expect(taxFunctions.calculateTax(48535)).toBe(7280.25); 
    expect(taxFunctions.calculateTax(50000)).toBe(7580.575); 
    expect(taxFunctions.calculateTax(100000)).toBe(17991.780000000002); 
    expect(taxFunctions.calculateTax(150473)).toBe(31114.760000000002); 
    expect(taxFunctions.calculateTax(150474)).toBe(35759.56); 
    expect(taxFunctions.calculateTax(214368)).toBe(54288.81999999999); 
    expect(taxFunctions.calculateTax(300000)).toBe(82547.38); 

});
