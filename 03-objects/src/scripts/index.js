import {Account, AccountController, functions} from './account.js'

// Instantiate new accounts 
let account1 = new Account("Chequing", 25); 
let account2 = new Account("Account2", 0); 
let account3 = new Account("Account3", 0);


// Experiment to create a new account name as a variable (dynamically)
				// var baseObj = {};
				// let wobble = "account1";
				// baseObj[wobble] = new Account("Chequing", 25);
				// console.log(baseObj[wobble].accName);
				// console.log(account1.accName)

idBalance.textContent = account1.currentBalance.toFixed(2);
idTotalBalance.textContent = account1.currentBalance.toFixed(2);

idAccount.textContent = account1.accName;


// Instantiate new Account Controller
let a = 1; // STATE: Number of accounts 
let currentAccount = "Chequing"; // STATE: Currently active account 
let newGenericAccName; 
let currentBalance = 25; 
const accController = new AccountController(["Chequing"], ["account1"], 1, 25, 25, 25);

const enterPrompt = "Please enter an amount";


// EVENT LISTENER FOR DEPOSIT BUTTON 

buttonDeposit.addEventListener("click", (() => {
	if (isNaN(idDeposit.value) || idDeposit.value <= 0) {
		idMessage.textContent = enterPrompt; 
		idDeposit.value = []; 
		return;
	};

	for (let i=0; i<accController.accounts.length; i++) {
		if (accController.accounts[i] === currentAccount) {
			if (i === 0) {
				currentBalance = account1.deposit(Number(idDeposit.value));
			} else if (i === 1) {
				currentBalance = account2.deposit(Number(idDeposit.value));
			} else {
				currentBalance = account3.deposit(Number(idDeposit.value));
			}
		idBalance.textContent = currentBalance.toFixed(2);
		idMessage.textContent = `You have deposited $${idDeposit.value} into your ${currentAccount} account.`;
		idDeposit.value = []; 
		}
	}	
}));


// EVENT LISTENER FOR WITHDRAW BUTTON 

buttonWithdraw.addEventListener("click", (() => {
	if (isNaN(idWithdraw.value) || idWithdraw.value <= 0) {
		idMessage.textContent = enterPrompt; 
		idWithdraw.value = []; 
		return;
	};

	for (let i=0; i<accController.accounts.length; i++) {
		if (accController.accounts[i] === currentAccount) {
			if (i === 0) {
				currentBalance = account1.withdraw(Number(idWithdraw.value));
			} else if (i === 1) {
				currentBalance = account2.withdraw(Number(idWithdraw.value));
			} else {
				currentBalance = account3.withdraw(Number(idWithdraw.value));
			}
		idBalance.textContent = currentBalance.toFixed(2);
		idMessage.textContent = `You have withdrawn $${idWithdraw.value} from your ${currentAccount} account.`;
		idWithdraw.value = []; 
		}
	}
}));


// EVENT LISTENER FOR DELETE ACCOUNT BUTTON 

buttonDelete.addEventListener("click", (() => {
	
	clear();

	if (currentAccount === "Chequing") {
		idMessage.textContent = `Chequing account cannot be deleted!`;
		return; 
	};
	
	if (currentBalance !== 0) {
		idMessage.textContent = `Cannot delete account due to remaining balance ($${currentBalance}).`;
		return; 
	};

	const index = accController.accounts.indexOf(currentAccount);
		if (index > -1) {
		accController.accounts.splice(index, 1);
		accController.genericAccNames.splice(index, 1);
		accController.numberOfAccounts--;
		}

	deleteAccountCard(currentAccount);

	currentAccount = "Chequing"; // Change state: active account reverts back to Chequing Account 
	idAccount.textContent = currentAccount;
	currentBalance = account1.currentBalance; // Change state: show current balance of Chequing Account
	idBalance.textContent = currentBalance.toFixed(2);
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
	let newAccount = document.getElementById("idCreate").value;

	if (accController.accounts.length < 3) { // Check if max. number of allowed accounts has been reached
		if (isNaN(newAccount) && newAccount !== "") { // Check if input is a number or empty (not allowed)
			if (accController.accounts.includes(newAccount) === false) { // Check if account name already exists

				if (accController.genericAccNames.length === 1) {
					newGenericAccName = "account2";
					account2.accName = newAccount; 
				} else if (accController.genericAccNames.length === 2 && (accController.genericAccNames[1] === "account2")) {
					newGenericAccName = "account3";
					account3.accName = newAccount; 					
				} else if (accController.genericAccNames.length === 2 && (accController.genericAccNames[2] === "account3")) {
					newGenericAccName = "account2";
					account2.accName = newAccount; 
				};
			
				accController.createNew(newAccount, newGenericAccName);
			
				createNewAccountCard(newAccount); 

				newAccount = ""; newGenericAccName = "";
				clear();

				
			} else {idMessage.textContent = "Account name already exists!"}
		} 
	} else {idMessage.textContent = "You can have up to 3 accounts!"}
	
}));  


// EVENT LISTENER FOR ACCOUNTS (To select which account is currently active)

document.addEventListener("click", ((e) => {

	if (e.target.className === "accounts") {

		currentAccount = e.target.textContent // Update STATE: Current account
		idAccount.textContent = currentAccount;
		
		for (let i=0; i<accController.accounts.length; i++) {
			if (accController.accounts[i] === currentAccount) {
				if (i === 0) {
					currentBalance = account1.currentBalance;
				} else if (i === 1) {
					currentBalance = account2.currentBalance;
				} else {
					currentBalance = account3.currentBalance;
			}
		}
		idBalance.textContent = currentBalance.toFixed(2);
	}

	return;

	}
}));




// PRESENTATION FUNCTIONS 

function createNewAccountCard(newAccount) {
	const accountsDiv = document.querySelector(".accountsPanel");

	const newCard = document.createElement("div");
	const accountName = document.createTextNode(newAccount);
	newCard.appendChild(accountName);
	newCard.className = "accounts";

	accountsDiv.insertBefore(newCard, accountsDiv.childNodes[accController.numberOfAccounts]);
	
	return;

}


function deleteAccountCard(currentAccount) {
	const accountsDiv = document.querySelector(".accountsPanel");

	let listOfAccounts = document.querySelectorAll(".accounts"); 
	
	for (let i=0; i<listOfAccounts.length; i++) {
		if (listOfAccounts[i].textContent === currentAccount) {
			accountsDiv.removeChild(listOfAccounts[i]);
		}
	}

	return;
}


function clear() { // Clear all input fields and message area 
	idMessage.textContent = "Welcome!";
	idWithdraw.value = []; 
	idDeposit.value = []; 
	idCreate.value = [];
	idRename.textContent = "";

	return; 
}