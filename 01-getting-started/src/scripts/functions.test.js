import functions from './functions'

document.body.innerHTML = '<input id="number1" value="6">' + '<input id="number2" value="2">';


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

test('Does that subtract function work?', () => {
    expect(functions.subtract(1,2)).toBe(-1);
    expect(functions.subtract(202,202)).toBe(0);
});

test('Does that multiply function work?', () => {
	expect(functions.multiply(1,2)).toBe(2);
	expect(functions.multiply(101,1)).toBe(101);
});

test('Does that divide function work?', () => {
	expect(functions.divide(2,1)).toBe(2);
	expect(functions.divide(100,20)).toBe(5);
});

test("Is number even or odd", () => {
    expect(functions.isEven(2)).toBe(true);
    expect(functions.isEven(1)).toBe(false);
});

test("Check the addFunction", () => {
	expect(functions.addFunction()).toBeTruthy();
	expect(functions.addFunction()).toBe(8);
});

test("Check the subtractFunction", () => {
	expect(functions.subtractFunction()).toBeTruthy();
	expect(functions.subtractFunction()).toBe(4);
});

test("Check the multiplyFunction", () => {
	expect(functions.multiplyFunction()).toBeTruthy();
	expect(functions.multiplyFunction()).toBe(12);
});

test("Check the divideFunction", () => {
	expect(functions.divideFunction()).toBeTruthy();
	expect(functions.divideFunction()).toBe(3);
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

test('Lookup province', () => {
    expect(functions.lookupProvince("ab")).toEqual("Alberta");
    expect(functions.lookupProvince("bc")).toBe("British Columbia");
    expect(functions.lookupProvince("sdfd")).toBe("Sorry this province does not exist");
});