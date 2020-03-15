// CREATE CLASS "ACCOUNT"

let currentBalance; 
const enterPrompt = "Please enter an amount";
// const depositedInfo = `You have deposited $${depositedAmount}.`

class Account {
	constructor (accName, initialBalance) {
		this.accName = accName;
		this.initialBalance = initialBalance; 
		currentBalance = initialBalance;
	};

	balance () {
		return currentBalance;
	};

	deposit (depositedAmount) {
		if (isNaN(depositedAmount) || depositedAmount <= 0) {
			idMessage.textContent = enterPrompt; 
			idDeposit.value = []; 
			return currentBalance;
		} else {
			currentBalance += depositedAmount;
			idMessage.textContent = `You have deposited $${depositedAmount}.`;
			return currentBalance;
		}
	}; 

	withdraw (withdrawnAmount) {
		if (isNaN(withdrawnAmount) || withdrawnAmount <= 0) {
			idMessage.textContent = enterPrompt; 
			idDeposit.value = []; 
			return currentBalance;
		} else {
			currentBalance -= withdrawnAmount;
			idMessage.textContent = `You have withdrawn $${withdrawnAmount}.`;
			return currentBalance;
		}
	};

	openController () {
		
	}
}


// INSTATIATE CHEQUING ACCOUNT (a new object of class "Account")

const cheqAcc = new Account("Chequings Account", 25);


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

export {Account, functions}
