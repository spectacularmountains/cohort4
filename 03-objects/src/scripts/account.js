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
}


// INSTATIATE CHEQUING ACCOUNT (a new object of class "Account")

const cheqAcc = new Account("Chequings Account", 25);


export default Account;
