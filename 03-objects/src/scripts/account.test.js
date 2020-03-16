import {Account, AccountController} from './account.js'

// MOCK DOM 
document.body.innerHTML =
		'<div id="mock1">' +
				'<div class="mock2">' +
						'<h2 id="idMessage">Card 1</h2>' +
						'<button class="addBefore">Add Before</button>' + 
						'<button class="addAfter">Add After</button>' + '<br>' +
						'<button class="del">Delete</button>' +
				'</div>' +
		'</div>';


// TESTING THE ACCOUNT CLASS FUNCTIONS 

test('Does the balance method work?', () => {
	let cheqAcc = new Account("Chequings Account", 0);
	expect(cheqAcc.balance()).toBe(0);	
	cheqAcc = new Account("Chequings Account", 25);
	expect(cheqAcc.balance()).toBe(25);
});

const cheqAcc = new Account("Chequings Account", 25);

test('Does the deposit method work?', () => {
	expect(cheqAcc.deposit(10)).toBe(35);	
});

test('Check if balance is up-to-date?', () => {
	expect(cheqAcc.balance()).toBe(35);	
});

test('Does the withrdraw method work?', () => {
	expect(cheqAcc.withdraw(30)).toBe(5);	
});

test('Check if balance is up-to-date?', () => {
	expect(cheqAcc.balance()).toBe(5);	
});


// TESTING THE ACCOUNT CONTROLLER CLASS FUNCTIONS 

const accController = new AccountController(["Chequings Account"], 25, 25, 25);

test('Does the "create new" method work?', () => {
	expect(accController.createNewAccount()).toBe(0);
});
