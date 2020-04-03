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

buttonCreate.addEventListener("click", (() => {
	
	const newAccount = document.getElementById("idCreate").value;

	const newAcc = new Account(newAccount, 0);
	
	accController.createNew(newAccount);
	createNewAccountCard(newAccount); 

}));


// PRESENTATION FUNCTIONS 

function createNewAccountCard(newAccount) {
	const left = document.querySelector(".left");

	const newCard = document.createElement("div");
	const item1 = document.createElement("div");
	const item1Text = document.createTextNode(newAccount);
	item1.appendChild(item1Text);

	const item2 = document.createElement("div");
	const item2Text = document.createTextNode("Balance: " + newAcc.balance);
	item2.appendChild(item2Text);

	newCard.appendChild(item1);
	newCard.appendChild(item2);

	left.insertBefore(newCard, left.childNodes[a+1]);
	
	return;

}