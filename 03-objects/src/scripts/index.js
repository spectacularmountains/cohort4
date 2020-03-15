import {Account, functions} from './account.js'

const cheqAcc = new Account("Chequings Account", 25);

idBalance.textContent = (cheqAcc.balance()).toFixed(2);
idTotalBalance.textContent = (cheqAcc.balance()).toFixed(2);

idAccount.textContent = cheqAcc.accName;


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


document.addEventListener('click', function (event) {

	// Make sure clicked element is our toggle
	if (!event.target.classList.contains('toggle')) return;

	// Prevent default link behavior
	event.preventDefault();

	// Get the content
	var content = document.querySelector(event.target.hash);
	if (!content) return;

	// Toggle the content
	toggle(content);

}, false);