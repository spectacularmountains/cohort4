import React, { Component } from 'react';

class Controller extends Component {
    constructor() {
        super();
        this.state = {
            currentAccount: "Chequing",
            accountNames: ["Chequing", "Savings", "Investment"],
            accountBalances: [25, 150, 3000],
            message: "Welcome!",
        }
        this.getDeposit = this.getDeposit.bind(this); 
        this.changeCurrentAccount = this.changeCurrentAccount.bind(this); 
        this.getMessage = this.getMessage.bind(this); 
        this.createNewAccount = this.createNewAccount.bind(this); 
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

    changeCurrentAccount(account) {
        this.setState({currentAccount: account})
    }

    createNewAccount(newAccountName) {
        let accountBalances = [...this.state.accountBalances]
        accountBalances.push(0);
        this.setState({accountBalances: accountBalances})

        let accounts = [...this.state.accountNames]
        accounts.push(newAccountName);
        this.setState({accountNames: accounts})
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
                                <div className="column4">
                                    <button id="buttonAccounts">STATS</button>
                                </div>
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
                            <div className="column">
                                <div className="column3">
                                    <input id="idRename" size="11" />
                                </div>
                            </div>
                            <div className="column">
                                <div className="column4">
                                    <button id="buttonRename">RENAME</button>
                                </div>
                            </div>
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
                            <div className="column">
                                <div className="column4">
                                    <button id="buttonDelete">DELETE</button>
                                </div>
                            </div>
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


            {/* //-- ACCOUNT CARDS -- */}
                    <div className="accountsPanel">
                        <Accounts accountNames={this.state.accountNames} handleClick={this.changeCurrentAccount}/>
                    </div>
                
                </div>


            {/* //-- RIGHT PANEL: ACCOUNT STATS -- */}

                <div className="right">
                    <Stats accountBalances={this.state.accountBalances} accountNames={this.state.accountNames}/>
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
    }

    handleClick(account) {
        this.props.handleClick(account);
        console.log(account);
        return;
    }
    
    render() {
        let accountNames = this.props.accountNames;
        let listOfAccounts = accountNames.map(account => {
                return <div className="accounts" onClick={() => this.handleClick(account)} key={account}>{account}</div>
            }
        );
        return <div>{listOfAccounts}</div>
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
        let highestAccount = this.props.accountBalances.map((item, i) => {
            if (item === (this.getHighestBalance())) {
                return this.props.accountNames[i]
            }
            return null;
        })
        return highestAccount; 
    }
    
    getLowestAccount() {
        let lowestAccount = this.props.accountBalances.map((item, i) => {
            if (item === (this.getLowestBalance())) {
                return this.props.accountNames[i]
            }
            return null;
        })
        return lowestAccount;
    }

    render() {
        return (
            <div className="cardR">
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
            let newAccountName = accountName.charAt(0).toUpperCase() + accountName.slice(1); // Capitalize first letter of newly created account name 
            this.props.getNewAccountName(newAccountName);
            let message = `You created a new account named ${newAccountName}.`;
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
                        <button id="buttonCreate">CREATE NEW</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}


export default Controller;