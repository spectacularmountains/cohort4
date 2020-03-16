import {Account, AccountController, functions} from './account.js'

// Instantiate new Chequings Account
const cheqAcc = new Account("Chequings Account", 25);

idBalance.textContent = (cheqAcc.balance()).toFixed(2);
idTotalBalance.textContent = (cheqAcc.balance()).toFixed(2);

idAccount.textContent = cheqAcc.accName;

// Instantiate new Account Controller
let a; // Number of accounts 
const accController = new AccountController(["Chequings Account"], 1, 25, 25, 25);



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


// EVENT LISTENER FOR ACCOUNTS BUTTON 

buttonAccounts.addEventListener("click", (() => {
	let content = document.querySelector(".right");
	if (!content) return;

	// Toggle the content
	functions.toggle(content);
}));


// EVENT LISTENER FOR CREATE ACCOUNT BUTTON 

buttonCreateAccount.addEventListener("click", (() => {
	const rows = document.querySelector(".card-mainR");
	const newRow = accController.createNewAccount();
	rows.insertBefore(newRow, rows.childNodes[a+6]);
	idBalance.textContent = (cheqAcc.withdraw(Number(idWithdraw.value))).toFixed(2);
	idWithdraw.value = [];
}));
