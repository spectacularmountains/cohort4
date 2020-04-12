// CREATE CLASS "ACCOUNT"

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
	constructor (accounts, totalBalance, highestBalance, lowestBalance, highestAccount, lowestAccount) {
		this.accounts = accounts; 
		this.totalBalance = totalBalance; 
		this.highestBalance = highestBalance; 
		this.lowestBalance = lowestBalance; 
		this.highestAccount = highestAccount; 
		this.lowestAccount = lowestAccount; 
	};

	createNew (newAccount) {
		this.accounts.push(newAccount);
		return;
	};
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
