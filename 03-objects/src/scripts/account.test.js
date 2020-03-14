import Account from './account.js'


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