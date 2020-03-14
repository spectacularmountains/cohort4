// CREATE CLASS "ACCOUNT"

let currentBalance; 

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
		currentBalance += depositedAmount;
		return currentBalance;
	}; 

	withdraw (withdrawnAmount) {
		currentBalance -= withdrawnAmount;
		return currentBalance;
	}
}


// INSTATIATE CHEQUING ACCOUNT (a new object of class "Account")

const cheqAcc = new Account("Chequings Account", 25);


export default Account;
