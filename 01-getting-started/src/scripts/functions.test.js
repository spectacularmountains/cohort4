import functions from './functions'

test('Check the sizes', () => {
    expect(functions.size(-1)).toBe("small"); // Consider the edge cases
    expect(functions.size(0)).toBe("small");
    expect(functions.size(10)).toBe("medium");
    expect(functions.size(15)).toBe("medium");
    expect(functions.size(20)).toBe("large");
    expect(functions.size(30)).toBe("large");
    expect(functions.size(101)).toBe("extra large");
    expect(functions.size(2000000)).toBe("extra large");
});

test('Does that add function work?', () => {
    expect(functions.add(1,2)).toBe(3);
    expect(functions.add(101,202)).toBe(303);
});

test("Is number even or odd", () => {
    expect(functions.isEven(2)).toBe(true);
    expect(functions.isEven(1)).toBe(false);
});

test('What is your income tax', () => {
    expect(functions.calculateTax(1)).toEqual([0.15, 15, 48534]); 
    expect(functions.calculateTax(48535)).toEqual([7280.25, 15, 0]); 
    expect(functions.calculateTax(50000)).toEqual([7580.575, 20.5, 47069]); 
    expect(functions.calculateTax(100000)).toEqual([17991.780000000002, 26, 50473]); 
    expect(functions.calculateTax(150473)).toEqual([31114.760000000002, 26, 0]); 
    expect(functions.calculateTax(150474)).toEqual([35759.56, 29, 63894]); 
    expect(functions.calculateTax(214368)).toEqual([54288.81999999999, 29, 0]); 
    expect(functions.calculateTax(300000)).toEqual([82547.38, 33, 0]); 

});
