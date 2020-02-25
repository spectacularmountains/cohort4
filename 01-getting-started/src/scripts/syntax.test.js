import functions from './syntax'

test('What is the type of input?', () => {
    expect(functions.defineType(1)).toBe("number"); 
    expect(functions.defineType(true)).toBe("boolean"); 
    expect(functions.defineType("Hello")).toBe("string"); 
    expect(functions.defineType({1: "House"})).toBe("object");  
    expect(functions.defineType(undefined)).toBe("undefined");  
    expect(functions.defineArray([1, 2, 3])).toBe(true); 
});

test('Is number negative or positive?', () => {
    expect(functions.isNegative(-1)).toBe(true); 
});

test('Add two numbers', () => {
    expect(functions.addTwoNumbers(1, 1)).toBe(2); 
});

test('Add letter to the front', () => {
    expect(functions.addToFront(1)).toEqual([1, 2, 3]); 
});

test('Add letter to the end', () => {
    expect(functions.addToEnd(4)).toEqual([1, 2, 3, 4]); 
});

test('Update the second mountain name in the arrayu', () => {
    expect(functions.updateValues("Ha Ling Peak")).toEqual(["Ha Ling Peak", "East End of Rundle", "Grotto Mountain", "Mount Lady McDonald"]); 
});