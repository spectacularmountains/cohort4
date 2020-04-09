// CREATE CLASS "ACCOUNT"

let currentBalance; 

class Account {
	constructor (accName, currentBalance) {
		this.accName = accName;
		this.currentBalance = currentBalance; 
	};

	deposit (depositedAmount) {
		this.currentBalance += depositedAmount;
		return this.currentBalance;
	}; 

	withdraw (withdrawnAmount) {
		this.currentBalance -= withdrawnAmount;
		return this.currentBalance;
	};

	rename (newName) {
		this.accName = newName; 
		return;
	};

}


// CREATE CLASS "ACCOUNT CONTROLLER"

let a;

class AccountController {
	constructor (accounts, genericAccNames, numberOfAccounts, totalBalance, highestBalance, lowestBalance) {
		this.accounts = accounts; 
		this.genericAccNames = genericAccNames; 
		this.numberOfAccounts = numberOfAccounts; 
		this.totalBalance = totalBalance; 
		this.highestBalance = highestBalance; 
		this.lowestBalance = lowestBalance; 
	};

	createNew (newAccount, newGenericAccName) {
		this.accounts.push(newAccount);
		this.genericAccNames.push(newGenericAccName);
		this.numberOfAccounts++; 
		return;
	}
	
	rename (oldName, newName) {
		this.accounts.push(newAccount);
		this.genericAccNames.push(newGenericAccName);
		this.numberOfAccounts--; 
		return;
	}
	delete (deleteAccount, newGenericAccName) {
		this.accounts.push(newAccount);
		this.genericAccNames.push(newGenericAccName);
		this.numberOfAccounts--; 
		return;
	}

	// createNewAccount () {
	// 	a++; 
	// 	let accounts = this.accounts; 
	// 	accounts = accounts.push("New Account");

	// 	const newRenameButton = document.createElement("button");
	// 	const newRenameButtonText = document.createTextNode("RENAME");
	// 	newRenameButton.appendChild(newRenameButtonText);
	// 	newRenameButton.classList.add("buttonRename");

	// 	const newDeleteButton = document.createElement("button");
	// 	const newDeleteButtonText = document.createTextNode("DELETE");
	// 	newDeleteButton.appendChild(newDeleteButtonText);
	// 	newRenameButton.classList.add("buttonDelete");


	// 	const newDiv1a = document.createElement("div");
	// 	const newAccountText = document.createTextNode("New Account");
	// 	newDiv1a.appendChild(newAccountText);
	// 	newDiv1a.classList.add("column1R");
	// 	newDiv1a.classList.add("accountType");
	// 	const newDiv1b = document.createElement("div");
	// 	newDiv1b.classList.add("columnR");
	// 	newDiv1b.appendChild(newDiv1a);

	// 	const newDiv2a = document.createElement("div");
	// 	const newAccountBalance = document.createTextNode("0");
	// 	newDiv2a.appendChild(newAccountBalance);
	// 	newDiv2a.classList.add("column2R");
	// 	newDiv2a.classList.add("total");
	// 	const newDiv2b = document.createElement("div");
	// 	newDiv2b.classList.add("columnR");
	// 	newDiv2b.appendChild(newDiv2a);

	// 	const newDiv3a = document.createElement("div");
	// 	newDiv3a.appendChild(newRenameButton);
	// 	newDiv3a.classList.add("column3R");
	// 	const newDiv3b = document.createElement("div");
	// 	newDiv3b.classList.add("columnR");
	// 	newDiv3b.appendChild(newDiv3a);

	// 	const newDiv4a = document.createElement("div");
	// 	newDiv4a.appendChild(newDeleteButton);
	// 	newDiv4a.classList.add("column4R");
	// 	const newDiv4b = document.createElement("div");
	// 	newDiv4b.classList.add("columnR");
	// 	newDiv4b.appendChild(newDiv4a);


	// 	const newDivRow = document.createElement("div")
	// 	newDivRow.classList.add("rowR");
	// 	newDivRow.appendChild(newDiv1b)
	// 	newDivRow.appendChild(newDiv2b)
	// 	newDivRow.appendChild(newDiv3b)
	// 	newDivRow.appendChild(newDiv4b)

	// 	return newDivRow
	// };


}




// TOGGLE FUNCTIONS TO SHOW/HIDE RIGHT PANEL (ACC MANAGER)

const functions = {
	show: (elem) => {
		elem.style.display = 'block';
	},
	
	hide: (elem) => {
		elem.style.display = 'none';
	},
	
	toggle: (elem) => {
	
		// If the element is visible, hide it
		if (window.getComputedStyle(elem).display === 'block') {
			functions.hide(elem);
			return;
		}
	
		// Otherwise, show it
		functions.show(elem);
	
	},
	
}

export {Account, AccountController, functions}
