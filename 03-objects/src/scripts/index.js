import Account from './account.js'

const cheqAcc = new Account("Chequings Account", 25);

idBalance.textContent = (cheqAcc.balance()).toFixed(2);
idAccount.textContent = cheqAcc.accName;


// EVENT LISTENER FOR DEPOSIT BUTTON 

buttonDeposit.addEventListener("click", (() => {
	idBalance.textContent = (cheqAcc.deposit(Number(idDeposit.value))).toFixed(2);
	idDeposit.value = [];
}));


// EVENT LISTENER FOR WITHDRAW BUTTON 

buttonWithdraw.addEventListener("click", (() => {
	idBalance.textContent = (cheqAcc.withdraw(Number(idWithdraw.value))).toFixed(2);
	idWithdraw.value = [];
}));