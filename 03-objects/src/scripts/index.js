import {Account, AccountController, functions} from './account.js'

document.querySelector(".right").style.display = 'none' // Hide right panel at the beginning


let accounts = [new Account("Chequing", 25)]; // Array of instantiated accounts - IMPORTANT TO CREATE DYNAMIC INSTANCE NAMES!!!!!

idBalance.textContent = accounts[0].currentBalance.toFixed(2);
idTotalBalance.textContent = accounts[0].currentBalance.toFixed(2);
idAccount.textContent = accounts[0].accName;


// Instantiate new Account Controller
let currentAccount = "Chequing"; // STATE: Currently active account 
let currentBalance = 25; 
const accController = new AccountController(["Chequing"], 25, 25, 25, "Chequing", "Chequing");

showExtremes(); // Display highest and lowest account balances 


const enterPrompt = "Please enter an amount";


// EVENT LISTENERS FOR DEPOSIT 

buttonDeposit.addEventListener("click", (() => {
	deposit(); 
}));

idDeposit.addEventListener('keyup',((e) => {
    if (e.keyCode === 13 || e.which === 13) {
		deposit(); 
	}
}));

function deposit() { 
	if (isNaN(idDeposit.value) || idDeposit.value <= 0) {
		idMessage.textContent = enterPrompt; 
		idDeposit.value = []; 
		return;
	};

	for (let i=0; i<accController.accounts.length; i++) {
		if (currentAccount === accounts[i].accName) {
		currentBalance = accounts[i].deposit(Number(idDeposit.value));
		}
	}

	defineExtremes(currentBalance); 
	idBalance.textContent = currentBalance.toFixed(2); 
	idMessage.textContent = `You have deposited $${idDeposit.value} into your ${currentAccount} account.`;
	showExtremes();

	clear();
}

// EVENT LISTENERS FOR WITHDRAW 

buttonWithdraw.addEventListener("click", (() => {
	withdraw(); 
}));

idWithdraw.addEventListener('keyup',((e) => {
    if (e.keyCode === 13 || e.which === 13) {
		withdraw(); 
	}
}));

function withdraw() { 
	if (isNaN(idWithdraw.value) || idWithdraw.value <= 0) {
		idMessage.textContent = enterPrompt; 
		idWithdraw.value = []; 
		return;
	};
	
	for (let i=0; i<accController.accounts.length; i++) {
		if (currentAccount === accounts[i].accName) {
		currentBalance = accounts[i].withdraw(Number(idWithdraw.value));
		}
	}

	defineExtremes(); 
	idBalance.textContent = currentBalance.toFixed(2);
	idMessage.textContent = `You have withdrawn $${idWithdraw.value} from your ${currentAccount} account.`;
	showExtremes();

	clear();
}


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
		accounts.splice(index, 1);
	}
	

	deleteAccountCard(currentAccount);

	currentAccount = "Chequing"; // Change state: active account reverts back to Chequing Account 
	idAccount.textContent = currentAccount;
	currentBalance = accounts[0].currentBalance; // Change state: show current balance of Chequing Account
	idBalance.textContent = currentBalance.toFixed(2);

	defineExtremes(); 
	showExtremes();
}));

// EVENT LISTENER FOR ACCOUNTS BUTTON 

buttonAccounts.addEventListener("click", (() => {
	let content = document.querySelector(".right");
	if (!content) return;

	// Toggle the content
	functions.toggle(content);
}));


// EVENT LISTENERS FOR CREATE ACCOUNT 

buttonCreate.addEventListener("click", (() => {
	create(); 
}));  

idCreate.addEventListener('keyup',((e) => {
    if (e.keyCode === 13 || e.which === 13) {
		create(); 
	}
}));

function create() {
	let newAccount = document.getElementById("idCreate").value;
	newAccount = newAccount[0].toUpperCase() + newAccount.slice(1); // Capitalize first letter of account name 
	let lc = newAccount.toLowerCase(); 
	let uc = newAccount.toUpperCase();
	
	if (accController.accounts.length < 8) { // Check if max. number of allowed accounts has been reached
		if (isNaN(newAccount) && newAccount !== "") { // Check if input is a number or empty (not allowed)
			if (accController.accounts.includes(newAccount) === false && accController.accounts.includes(uc) === false && accController.accounts.includes(lc) === false) { // Check if account name already exists

				accounts.push(new Account (newAccount, 0))				
							
				accController.createNew(newAccount);
				defineExtremes(); 
				showExtremes(); 
			
				createNewAccountCard(newAccount); 

				newAccount = ""; 
				clear();
				idMessage.textContent = "Welcome!";
				
			} else {idMessage.textContent = "Account name already exists!"};
			clear(); 
		} 
	} else {idMessage.textContent = "You can have up to 8 accounts!"}
	
}
// EVENT LISTENER FOR RENAME ACCOUNT BUTTON 

buttonRename.addEventListener("click", (() => {
	let newName = document.getElementById("idRename").value;
		
	if (isNaN(newName) && newName !== "") { // Check if input is a number or empty (not allowed)

		newName = newName[0].toUpperCase() + newName.slice(1); // Capitalize first letter of account name 
		let lc = newName.toLowerCase(); 
		let uc = newName.toUpperCase();	

		if (accController.accounts.includes(newName) === false && accController.accounts.includes(uc) === false && accController.accounts.includes(lc) === false) { // Check if account name already exists
			
			for (let i=0; i<accController.accounts.length; i++) {
				if (accounts[i].accName === currentAccount) {
					if (i === 0) {
						idMessage.textContent = `Chequing account cannot be renamed!`;
						clear(); 
						return; 
					} 
				accounts[i].rename(newName);
				
				accController.accounts[i]  = newName; 

				idAccount.textContent = newName;
				idMessage.textContent = `Account name changed!`;
				clear();
				changeAccountCardName(newName);
				}
			}
		} else {idMessage.textContent = "Account name already exists!"}
	} 
	clear();
}));  

// EVENT LISTENER FOR ACCOUNTS (To select which account is currently active)

document.addEventListener("click", ((e) => {

	if (e.target.className === "accounts") {

		currentAccount = e.target.textContent // Update STATE: Current account
		idAccount.textContent = currentAccount;
		
		for (let i=0; i<accController.accounts.length; i++) {
			if (accController.accounts[i] === currentAccount) {
				currentBalance = accounts[i].currentBalance;
			}
		}
		idBalance.textContent = currentBalance.toFixed(2);
	}

	return;

	}
));




// PRESENTATION FUNCTIONS 

function createNewAccountCard(newAccount) {
	const accountsDiv = document.querySelector(".accountsPanel");

	const newCard = document.createElement("div");
	const accountName = document.createTextNode(newAccount);
	newCard.appendChild(accountName);
	newCard.className = "accounts";

	accountsDiv.insertBefore(newCard, accountsDiv.childNodes[accController.accounts.length]);
	
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

function changeAccountCardName(newName) {
	
	let listOfAccounts = document.querySelectorAll(".accounts"); 
	
	for (let i=0; i<listOfAccounts.length; i++) {
		if (listOfAccounts[i].textContent === currentAccount) {
			listOfAccounts[i].textContent = newName;
		}
	}
	currentAccount = newName; 
	return; 
}

function showExtremes() {
	idHighestAccountValue.textContent = accController.highestAccount + " ($" + accController.highestBalance.toFixed(2) + ")";
	idLowestAccountValue.textContent = `${accController.lowestAccount} ($${accController.lowestBalance.toFixed(2)})`;
	idTotalBalance.textContent = "$" + accController.totalBalance.toFixed(2)
	return; 
}

function defineExtremes () {
	// Initialize extremes to first account (for comparison purposes)
	let totalBalance = 0;
	accController.lowestBalance = accounts[0].currentBalance;
	accController.lowestAccount = accounts[0].accName; 
	accController.highestBalance = accounts[0].currentBalance;
	accController.highestAccount = accounts[0].accName; 
		
	for (let i=0; i<accController.accounts.length; i++) {
		totalBalance += accounts[i].currentBalance;
		if (accounts[i].currentBalance > accController.highestBalance) {
			accController.highestBalance = accounts[i].currentBalance;
			accController.highestAccount = accounts[i].accName; 
		}
	
		if (accounts[i].currentBalance < accController.lowestBalance) {
			accController.lowestBalance = accounts[i].currentBalance;
			accController.lowestAccount = accounts[i].accName; 
		}
	}
	accController.totalBalance = totalBalance; 
	return; 
}

function clear() { // Clear all input fields 
	idWithdraw.value = []; 
	idDeposit.value = []; 
	idCreate.value = [];
	idRename.value = [];
	return; 
}