import functions from './functions'

document.body.innerHTML =
		'<div class="mainBox" id="mainDiv">' +
		'<input id="input" size="20" value="Something">' + 
				'<ol class="orderedList" id="list">' +
						'<li>Item 1</li>' +
						'<li>Item 2</li>' +
						'<li>Item 3</li>' +
				'</ol>' +
		'</div>';



test('Test the DOM', () => {
    expect(document.querySelector("ol").textContent).toBe("Item 1Item 2Item 3"); 
    expect(document.querySelector("li").textContent).toBe("Item 1"); 
    expect(document.getElementsByClassName("mainBox").length).toEqual(1); 
});


test('Find children from ol (ordered list)', () => {
	expect(functions.showChildren()).toBe("Item 1 Item 2 Item 3 "); 
	expect(functions.showChildren()).toBeTruthy; 
});

