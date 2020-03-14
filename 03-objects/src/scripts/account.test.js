import Account from './account.js'


test('Does the balance method work?', () => {
	let cheqAcc = new Account("Chequings Account", 0);
	expect(cheqAcc.balance()).toBe(0);	
	cheqAcc = new Account("Chequings Account", 25);
	expect(cheqAcc.balance()).toBe(25);
});

test('Does the deposit method work?', () => {
	let cheqAcc = new Account("Chequings Account", 25);
	expect(cheqAcc.deposit(10)).toBe(35);	
	cheqAcc = new Account("Chequings Account", 25);
	expect(cheqAcc.deposit(5)).toBe(30);	
});
