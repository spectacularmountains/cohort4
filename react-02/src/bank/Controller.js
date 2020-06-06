import React, { Component } from 'react';

class Controller extends Component {
    constructor() {
        super();
        this.state = {
            currentAccount: "Chequing",
            accountNames: ["Chequing", "Savings", "Investment"],
            accountBalances: [25, 150, 3000],
            message: "Welcome!",
            statsDisplayed: true, 
        }
        this.getDeposit = this.getDeposit.bind(this); 
        this.changeCurrentAccount = this.changeCurrentAccount.bind(this); 
        this.getMessage = this.getMessage.bind(this); 
        this.createNewAccount = this.createNewAccount.bind(this); 
        this.updateAccountName = this.updateAccountName.bind(this); 
        this.deleteAccount = this.deleteAccount.bind(this); 
        this.showHideStats = this.showHideStats.bind(this); 
    }

    getDeposit(deposit) {
        let newAccountBalances = [...this.state.accountBalances]
        this.state.accountNames.map((account, i) => {
            if (account === this.state.currentAccount) {
                let newBalance = this.state.accountBalances[i] + Number(deposit); 
                newAccountBalances.splice(i,1,newBalance)
                this.setState({accountBalances: newAccountBalances});
                return null;
            }
            return null;
        });
    }

    getMessage(message) {
        this.setState({message: message})
    }

    showHideStats() {
        this.state.statsDisplayed? this.setState({statsDisplayed: false}) : this.setState({statsDisplayed: true});
    }

    changeCurrentAccount(account) {
        this.setState({currentAccount: account})
    }

    createNewAccount(newAccountName) {
        this.setState({accountNames: [...this.state.accountNames, newAccountName]})
        this.setState({accountBalances: [...this.state.accountBalances, 0]})
    }

    updateAccountName(newAccountName) {
        let newList = this.state.accountNames.map((account) => {
            if (account === this.state.currentAccount) {
                return newAccountName;
            }
            return account;
        });
        this.setState({accountNames: newList});
        this.changeCurrentAccount(newAccountName);
        return;
    }
    
    deleteAccount() {
        let newAccountBalances = [...this.state.accountBalances]
        let newAccountNames = [...this.state.accountNames]

        newAccountNames.map((account, i) => {
            if (account === this.state.currentAccount) {
                newAccountBalances.splice(i,1)
                newAccountNames.splice(i,1)
                return null;
            }
            return null;
        });
        this.setState({accountBalances: newAccountBalances})
        this.setState({accountNames: newAccountNames});
        this.changeCurrentAccount(newAccountNames[0]);
        return;
    }

    render() {
        return (
            <div className="container">
                <div className="left">

                    <div className="card">
                        <div className="card-header">CHOCOLATE BANK LTD.</div>
                        <div className="card-main">

                        {/* //-- ROW 1 -- */}
                        <div className="row">
                            <div className="column">
                                <div className="column1">
                                    <i className="material-icons">account_balance</i>
                                </div>
                            </div>
                            <div className="column">
                                <div className="column2">
                                    <div className="main-description">Account:</div>
                                </div>
                            </div>
                            <div className="column">
                                <div className="column3">
                                    <div className="main-description" style={{fontWeight:"bold", backgroundColor: "rgb(233, 232, 232)"}} id="idAccount">{this.state.currentAccount}</div>
                                </div>
                            </div>
                            <div className="column">
                                <StatsButton handleShowHide={this.showHideStats}/>
                            </div>
                        </div>

                        {/* //-- ROW 2 -- */}
                        <div className="row">
                            <div className="column">
                                <div className="column1">
                                    <i className="material-icons">attach_money</i>
                                </div>
                            </div>
                            <div className="column">
                                <div className="column2">
                                    <div className="main-description">Current balance:</div>
                                </div>
                            </div>
                            <div className="column">
                                <div className="column3" style={{backgroundColor: "rgb(233, 232, 232)"}}>
                                    <AccountBalance className="main-description" accountNames={this.state.accountNames} accountBalances={this.state.accountBalances} currentAccount={this.state.currentAccount} />
                                </div>
                            </div>
                            <div className="column">
                                <div className="column4">
                                    {/* //-- This cell is empty --> */}
                                </div>
                            </div>
                        </div>

                        {/* //-- ROW 3 --// */}
                        <div className="row">
                            <div className="column">
                                <div className="column1">
                                    <i className="material-icons">add_circle</i>
                                </div>
                            </div>
                            <div className="column">
                                <div className="column2">
                                    <div className="main-description">Deposit amount:</div>
                                </div>
                            </div>
                            <Deposit onGetDeposit={this.getDeposit} onGetMessage={this.getMessage} currentAccount={this.state.currentAccount}/>
                        </div>

                        {/* //-- ROW 4 -- */}
                        <div className="row">
                            <div className="column">
                                <div className="column1">
                                    <i className="material-icons">remove_circle_outline</i>
                                </div>
                            </div>
                            <div className="column">
                                <div className="column2">
                                    <div className="main-description">Withdraw amount:</div>
                                </div>
                            </div>
                            <Withdraw onGetDeposit={this.getDeposit} onGetMessage={this.getMessage} currentAccount={this.state.currentAccount}/>
                        </div>

                        {/* //-- ROW 5 -- */}
                        <div className="row">
                            <div className="column">
                                <div className="column1">
                                    <i className="material-icons">check_circle</i>
                                </div>
                            </div>
                            <div className="column">
                                <div className="column2">
                                    <div className="main-description">Create account:</div>
                                </div>
                            </div>
                            <CreateAccount getNewAccountName={this.createNewAccount} onGetMessage={this.getMessage}/>
                        </div>

                        {/* //-- ROW 6 -- */}
                        <div className="row">
                            <div className="column">
                                <div className="column1">
                                    <i className="material-icons">text_format</i>
                                </div>
                            </div>
                            <div className="column">
                                <div className="column2">
                                    <div className="main-description">Rename account:</div>
                                </div>
                            </div>
                            <RenameAccount updateAccountName={this.updateAccountName} accountNames={this.state.accountNames} onGetMessage={this.getMessage}/>
                        </div>

                        {/* //-- ROW 7 -- */}
                        <div className="row">
                            <div className="column">
                                <div className="column1">
                                    <i className="material-icons">delete</i>
                                </div>
                            </div>
                            <div className="column">
                                <div className="column2">
                                    <div className="main-description">Delete account</div>
                                </div>
                            </div>
                            <div className="column">
                                <div className="column3">
                                    {/* //-- This cell is empty --> */}
                                </div>
                            </div>
                            <DeleteAccount delAccountName={this.deleteAccount} onGetMessage={this.getMessage} currentAccount={this.state.currentAccount} accountNames={this.state.accountNames} accountBalances={this.state.accountBalances}/>

                        </div>

                        {/* //-- ROW 8 -- */}
                        <div className="row">
                            <div className="quad-column">
                                <div className="column1">
                                    <div className="message" id="idMessage">{this.state.message}</div>
                                </div>
                                <div className="column2">
                                    {/* //-- This cell is empty --> */}
                                </div>
                                <div className="column3">
                                    {/* //-- This cell is empty --> */}
                                </div>
                                <div className="column4">
                                    {/* //-- This cell is empty --> */}
                                </div>
                            </div>
                        </div>
                        </div>

                    </div>

                    {/* //-- ACCOUNT STATS -- */}
                    <Stats statsDisplayed={this.state.statsDisplayed} accountBalances={this.state.accountBalances} accountNames={this.state.accountNames}/>
                
                </div>


                {/* //-- RIGHT PANEL: ACCOUNT CARDS -- */}

                <div className="right">
                    <Accounts currentAccount={this.state.currentAccount} accountNames={this.state.accountNames} handleClick={this.changeCurrentAccount}/>
                </div>
            </div>
        )
    }
}

// DEPOSIT 
class Deposit extends Component {
    constructor() {
        super();
        this.state = {
            value: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleKeyPress(event) {
        if(event.keyCode === 13 || event.keyCode === undefined){
            this.props.onGetDeposit(this.state.value);
            let message = `You have deposited $${this.state.value} into your ${this.props.currentAccount} account.`;
            this.props.onGetMessage(message);
            this.setState({value: ""})
        }    
    }
    
    handleChange(event) {
        this.setState({value: event.target.value})
    }

    render() {
        return (
            <React.Fragment>
                <div className="column">
                    <div className="column3">
                        <input type="number" style={{width: "120px"}} value={this.state.value} onKeyDown={this.handleKeyPress} onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="column">
                    <div className="column4">
                        <button id="buttonDeposit" onClick={this.handleKeyPress}>DEPOSIT</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

// WITHDRAW  
class Withdraw extends Component {
    constructor() {
        super();
        this.state = {
            value: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleKeyPress(event) {
        if(event.keyCode === 13 || event.keyCode === undefined){
            let negValue = -Math.abs(this.state.value); // Turn value negative (for withdrawing)
            this.props.onGetDeposit(negValue); // Send negative value up to Controller component via props
            let message = `You have withdrawn $${this.state.value} from your ${this.props.currentAccount} account.`;
            this.props.onGetMessage(message);
            this.setState({value: ""});
        }    
    }
    
    handleChange(event) {
        this.setState({value: event.target.value})
    }

    render() {
        return (
            <React.Fragment>
                <div className="column">
                    <div className="column3">
                        <input type="number" style={{width: "120px"}} value={this.state.value} onKeyDown={this.handleKeyPress} onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="column">
                    <div className="column4">
                        <button id="buttonWithdraw" onClick={this.handleKeyPress}>WITHDRAW</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

// ACCOUNT CARDS 
class Accounts extends Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
        this.getStyle = this.getStyle.bind(this);
    }

    handleClick(account) {
        this.props.handleClick(account);
        return;
    }

    getStyle(account) {
        return (account === this.props.currentAccount)? {color: "white", backgroundColor: "red"} : {color: "black", backgroundColor: "white"}
    }
    
    render() {
        let accountNames = this.props.accountNames;
        let listOfAccounts = accountNames.map(account => {
                return (
                    <div className="accounts" style={this.getStyle(account)} onClick={() => this.handleClick(account)} key={account}>{account}</div>
                )
            }
        );
        return (
            <React.Fragment>
                <div className="accountsPanel">
                    <div>{listOfAccounts}</div>
                </div>
            </React.Fragment>
        )
    }
}

// STATS WINDOW 
class Stats extends Component {
    constructor() {
        super();
        this.getTotalBalance = this.getTotalBalance.bind(this);
        this.getHighestBalance = this.getHighestBalance.bind(this);
        this.getLowestBalance = this.getLowestBalance.bind(this);
        this.getHighestAccount = this.getHighestAccount.bind(this);
        this.getLowestAccount = this.getLowestAccount.bind(this);
        this.getStyle = this.getStyle.bind(this);
    }

    getTotalBalance() {
        return this.props.accountBalances.reduce((acc, balance) => acc + balance)
    }

    getHighestBalance() {
        return this.props.accountBalances.reduce((acc, balance) => {
            return acc > balance ? acc : balance
        })
    }

    getLowestBalance() {
        return this.props.accountBalances.reduce((acc, balance) => {
            return acc < balance ? acc : balance
        })
    }

    getHighestAccount() {
        let highestAccount = ""; 
        for (let i=0;i<this.props.accountBalances.length;i++) {
            if (this.props.accountBalances[i] === (this.getHighestBalance())) {
                highestAccount = this.props.accountNames[i];
                break;
            }
        }
        return highestAccount; 
    }
    
    getLowestAccount() {
        let lowestAccount = ""; 
        for (let i=0;i<this.props.accountBalances.length;i++) {
            if (this.props.accountBalances[i] === (this.getLowestBalance())) {
                lowestAccount = this.props.accountNames[i];
                break;
            }
        }
        return lowestAccount;
    }

    getStyle() {
        return this.props.statsDisplayed? {display: "block"} : {display: "none"};
    }

    render() {
        return (
            <React.Fragment>
                <div style={this.getStyle()} className="cardR">
                    <div className="card-headerR">ACCOUNT STATS</div>
                    <div className="card-mainR">

                            {/* //-- ROW 1 --> */}
                            <div className="rowR">
                                {/* <div className="columnR"> */}
                                    <div className="column1R">
                                        Account holder:
                                    </div>
                                {/* </div> */}
                                {/* <div className="columnR"> */}
                                    <div className="column2R">
                                        <div className="main-descriptionR">John Smith</div>
                                    </div>
                                {/* </div> */}
                                
                            </div>

                            {/* //-- ROW 2 --> */}
                            <div className="rowR">
                                {/* <div className="columnR"> */}
                                    <div className="column1R">
                                        Total funds:
                                    </div>
                                {/* </div> */}
                                {/* <div className="columnR"> */}
                                    <div className="column2R" id="idTotalBalance">
                                        ${this.getTotalBalance()}
                                    </div>
                                {/* </div> */}
                                
                            </div>

                            {/* //-- ROW 3 --> */}
                            <div className="rowR">
                                    <div className="column1R">
                                        Highest account:
                                    </div>
                                    <div className="column2R" id="idHighestAccountValue">
                                        {this.getHighestAccount()} (${this.getHighestBalance()})
                                    </div>
                                
                            </div>

                            {/* //-- ROW 4 --> */}
                            <div className="rowR">
                                    <div className="column1R">
                                        Lowest account: 
                                    </div>
                                    <div className="column2R" id="idLowestAccountValue">
                                        {this.getLowestAccount()} (${this.getLowestBalance()})
                                    </div>
                            </div>

                            <div className="lastRow"></div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

function AccountBalance(props) {
    let {currentAccount, accountNames, accountBalances} = props;
    let currentBalance; 
    currentBalance = accountNames.map((account, i) => {
        if (account === currentAccount) {
            return accountBalances[i];
        }
        return null;
    })
    return currentBalance;
}

class CreateAccount extends Component {
    constructor() {
        super();
        this.state = {
            value: "",
            }
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value})
    }

    handleKeyPress(event) {
        if(event.keyCode === 13 || event.keyCode === undefined) {
            let accountName = this.state.value;
            if (accountName === "") return null; //Make sure that field is not empty 
            if(isNaN(accountName[0]) && accountName[0] !== " ") { //Make sure first character is not a number or space
                let newAccountName = accountName.charAt(0).toUpperCase() + accountName.slice(1); // Capitalize first letter of newly created account name 
                this.props.getNewAccountName(newAccountName);
                let message = `You created a new account named ${newAccountName}.`;
                this.props.onGetMessage(message);
                this.setState({value: ""});
                return;
            }
            let message = `First character must be a letter!`;
            this.props.onGetMessage(message);
            this.setState({value: ""});
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="column">
                    <div className="column3">
                        <input type="text" value={this.state.value} id="idCreate" style={{width: "120px"}} onChange={this.handleChange} onKeyDown={this.handleKeyPress}/>
                    </div>
                </div>
                <div className="column">
                    <div className="column4">
                        <button onClick={this.handleKeyPress}>CREATE NEW</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

class RenameAccount extends Component {
    constructor() {
        super();
        this.state = {
            value: "",
            }
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value})
    }

    handleKeyPress(event) {
        if(event.keyCode === 13 || event.keyCode === undefined) {
            let updatedAccountName = this.state.value;
            if (updatedAccountName === "") return null; // Make sure that field is not empty 
            for (let i=0;i<this.props.accountNames.length;i++) { // Check if account name exists already 
                if (this.props.accountNames[i] === updatedAccountName) {
                    let message = `Account name already exists!`;
                    this.props.onGetMessage(message);
                    this.setState({value: ""});
                    break;
                }
            }
            if(isNaN(updatedAccountName[0]) && updatedAccountName[0] !== " ") { // Make sure first character is not a number or space
                let newAccountName = updatedAccountName.charAt(0).toUpperCase() + updatedAccountName.slice(1); // Capitalize first letter of newly created account name 
                this.props.updateAccountName(newAccountName);
                let message = `You renamed the account to ${newAccountName}.`;
                this.props.onGetMessage(message);
                this.setState({value: ""});
                return;
            }
            let message = `First character must be a letter!`;
            this.props.onGetMessage(message);
            this.setState({value: ""});
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="column">
                    <div className="column3">
                    <input type="text" value={this.state.value} style={{width: "120px"}} onChange={this.handleChange} onKeyDown={this.handleKeyPress}/>
                    </div>
                </div>
                <div className="column">
                    <div className="column4">
                        <button onClick={this.handleKeyPress}>RENAME</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

class DeleteAccount extends Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        let {accountNames, accountBalances, currentAccount} = this.props;
        if (accountNames.length === 1) return; // If only one account exists, account cannot be deleted 
        for (let i=0;i<accountNames.length;i++) {
            if (accountNames[i] === currentAccount) {
                if (accountBalances[i] !== 0) {
                    let message = `Account cannot be deleted due to remaining balance!`;
                    this.props.onGetMessage(message);
                    break;
                }
                let message = `${currentAccount} account has been deleted.`;
                this.props.onGetMessage(message);
                this.props.delAccountName();
            }
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="column">
                    <div className="column4">
                        <button onClick={this.handleClick}>DELETE</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

class StatsButton extends Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.handleShowHide();
    }

    render() {
        return (
            <React.Fragment>
                <div className="column4">
                    <button onClick={this.handleClick}>STATS</button>
                </div>
            </React.Fragment>
        )
    }
}


export default Controller;