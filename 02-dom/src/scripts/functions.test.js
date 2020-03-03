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
    expect(functions.calculateTax(1)).toEqual([0, 15, 48534]); 
    expect(functions.calculateTax(48535)).toEqual([7280, 15, 0]); 
    expect(functions.calculateTax(50000)).toEqual([7581, 20.5, 47069]); 
    expect(functions.calculateTax(100000)).toEqual([17992, 26, 50473]); 
    expect(functions.calculateTax(150473)).toEqual([31115, 26, 0]); 
    expect(functions.calculateTax(150474)).toEqual([31115, 29, 63894]); 
    expect(functions.calculateTax(214368)).toEqual([49644, 29, 0]); 
    expect(functions.calculateTax(300000)).toEqual([77903, 33, 0]); 

});

test('Add to an array', () => {
    expect(functions.addToArray(2, [3])).toEqual([3, 2]);
    expect(functions.addToArray(5, [6, 8])).toEqual([6, 8, 5]);
});

test('Total all numbers in array', () => {
    expect(functions.totalInArray([3, 2], 0)).toEqual(5);
    expect(functions.totalInArray([5, 8, 23], 0)).toEqual(36);
});

test('Clear array', () => {
    expect(functions.clearArray([3, 2])).toEqual([]);
    expect(functions.clearArray([56, 23, 456, 45, 6])).toEqual([]);
});

test('Lookup province', () => {
    expect(functions.lookupProvince("ab")).toEqual("Alberta");
    expect(functions.lookupProvince("bc")).toBe("British Columbia");
    expect(functions.lookupProvince("sdfd")).toBe("Sorry this province does not exist");
});