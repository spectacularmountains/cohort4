import {Account, AccountController, functions} from './account.js'

// Instantiate new Chequings Account
const cheqAcc = new Account("Chequings Account", 25);

idBalance.textContent = (cheqAcc.balance()).toFixed(2);
idTotalBalance.textContent = (cheqAcc.balance()).toFixed(2);

idAccount.textContent = cheqAcc.accName;

// Instantiate new Account Controller
let a = 1; // STATE: Number of accounts 
let currentAccount; // STATE: Currently active account 
let newGenericAccName; 
const accController = new AccountController(["Chequing"], ["Account1"], 1, 25, 25, 25);



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
	
	if (accController.accounts.length < 3) { // Check if max. number of allowed accounts has been reached
		if (isNaN(newAccount) && newAccount !== "") { // Check if input is a number or empty (not allowed)
			if (accController.accounts.includes(newAccount) === false) { // Check if account name already exists

				if (accController.genericAccNames.length === 1) {
					newGenericAccName = "Account2";
					const account2 = new Account(newAccount, 0);
				} else if (accController.genericAccNames.length === 2 && (accController.genericAccNames[1] === "Account2")) {
					newGenericAccName = "Account3";
					const account3 = new Account(newAccount, 0);
				} else if (accController.genericAccNames.length === 2 && (accController.genericAccNames[2] === "Account3")) {
					newGenericAccName = "Account2";
					const account2 = new Account(newAccount, 0);
				};
			
				accController.createNew(newAccount, newGenericAccName);
			
				currentAccount = newAccount; // Change state 
				
				createNewAccountCard(newAccount); 
			} else {idMessage.textContent = "Account name already exists!"}
		} 
	} else {idMessage.textContent = "You can have up to 3 accounts!"}
	

}));  


// EVENT LISTENER FOR ACCOUNTS 

document.addEventListener("click", ((e) => {

	if (e.target.className === "accounts") {

		currentAccount = e.target.textContent // Update STATE: Current account
		idAccount.textContent = currentAccount;
		idBalance.textContent = currentAccount.currentBalance;
	}

	return;

	})
);




// PRESENTATION FUNCTIONS 

function createNewAccountCard(newAccount) {
	const accountsDiv = document.querySelector(".accountsPanel");

	const newCard = document.createElement("div");
	const accountName = document.createTextNode(newAccount);
	newCard.appendChild(accountName);
	newCard.className = "accounts";

	accountsDiv.insertBefore(newCard, accountsDiv.childNodes[a+1]);
	
	return;

}
