import functions from './functions'

test('Test the DOM', () => {
    document.body.innerHTML =
    '<div class="mainBox" id="mainDiv">' +
        '<ol class="orderedList" id="list">' +
            '<li>Item 1</li>' +
            '<li>Item 2</li>' +
            '<li>Item 3</li>' +
        '</ol>'
    expect(document.querySelector("ol").textContent).toBe("Item 1Item 2Item 3"); 
    expect(document.querySelector("li").textContent).toBe("Item 1"); 
    expect(document.getElementsByClassName("mainBox").length).toEqual(1); 

});

test('Find children from ol (ordered list)', () => {
    document.body.innerHTML =
    '<div class="mainBox" id="mainDiv">' +
        '<ol class="orderedList" id="list">' +
            '<li>Item 1</li>' +
            '<li>Item 2</li>' +
            '<li>Item 3</li>' +
        '</ol>'
    expect(document.querySelector("ol").textContent).toBe("Item 1Item 2Item 3"); 
    expect(document.querySelector("li").textContent).toBe("Item 1"); 
    expect(document.getElementsByClassName("mainBox").length).toEqual(1); 

});