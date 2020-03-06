import functions from './functions'

test('Find children from ol (ordered list)', () => {
    document.body.innerHTML =
    '<div class="mainBox" id="mainDiv">' +
        '<ol class="orderedList" id="list">' +
            '<li>Item 1</li>' +
            '<li>Item 2</li>' +
            '<li>Item 3</li>' +
        '</ol>'
    console.log(list.children.value)
    // expect(functions.showChildren(document.getElementById("list").children)).toBe("Item1Item2Item3"); 
 
});