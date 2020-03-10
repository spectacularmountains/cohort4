import functions from './functions-cards.js'

document.body.innerHTML =
		'<div id="cardsList">' +
				'<div class="card">' +
						'<h2>Card 1</h2>' +
						'<button class="addBefore">Add Before</button>' + 
						'<button class="addAfter">Add After</button>' + '<br>' +
						'<button class="del">Delete</button>' +
				'</div>' +
				'<div class="card">' +
						'<h2>Card 2</h2>' +
						'<button class="addBefore">Add Before</button>' + '<button class="addAfter">Add After</button>' + '<br>' +
						'<button class="del">Delete</button>' +
				'</div>' +
				'<div class="card">' +
						'<h2>Card 3</h2>' +
						'<button class="addBefore">Add Before</button>' + '<button class="addAfter">Add After</button>' + '<br>' +
						'<button class="del">Delete</button>' +
				'</div>' +
		'</div>';

const x = document.querySelector("button");
console.log(x)

test('Test the delete and add card functions', () => {
	expect(functions.addCard(x)).toBeFalsy; 
	functions.deleteCard(x)
	console.log(document.getElementsByClassName("card")[1].nodeName)
	expect(document.getElementsByClassName("card")[0].children.length).toEqual(5);
	expect(document.getElementsByClassName("card")[1].nodeName).toBe("DIV");

     
});
