import Account from './account.js'



test('Does the balance function work?', () => {
	let cheqAcc = new Account("Chequings Account", 0);
	expect(cheqAcc.balance()).toBe(0);	
	cheqAcc = new Account("Chequings Account", 25);
	expect(cheqAcc.balance()).toBe(25);
});
