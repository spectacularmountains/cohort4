import Account from './account.js'

const cheqAcc = new Account("Chequings Account", 25);

idBalance.textContent = (cheqAcc.balance()).toFixed(2);
idAccount.textContent = cheqAcc.accName;


// EVENT LISTENER FOR DEPOSIT BUTTON 

buttonDeposit.addEventListener("click", (() => {
	
	idBalance.textContent = cheqAcc.deposit(idDeposit.value);
}));