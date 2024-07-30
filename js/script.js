// --------TODO's--------------------//
// Addition pass object

// --------TODO's--------------------//

// grab modals divs html
const modalIncome = document.querySelector('.modalIncome');
const modalExpense = document.querySelector('.modalExpense');
const modalMove = document.querySelector('.modalmoveAccount');

// grab account Modal html
const accountNameField = document.querySelector('.accountNameField');
const typeOptionField = document.querySelector('.typeOptionField');
const balanceField = document.querySelector('.balanceField');

// grab income Modal html
const modalAccount = document.querySelector('.modalAccount');
const categoryofincomeField = document.querySelector('.categoryofincomeField');
const accountincomeChooseField = document.querySelector('.accountincomeChooseField')
const incomeamountField = document.querySelector('.incomeamountField');

// grab move money modal html
const moveFrom = document.querySelector('.moveFrom');
const movetoAccount = document.querySelector('.moveTo');
const accountsMove = document.querySelectorAll('.accountsMove');
const moveAmount = document.querySelector('.moveAmount');

// btn for opening modal move accounts
const moveAccount = document.querySelector('.moveAccount');
moveAccount.disabled = true;
let total = 0;
const existingAccounts = document.querySelector('.existingAccounts');
const existingAccountHeading = document.querySelector('.existingAccountHeading');

// grab expense modal html
const categoryofexpenseField = document.querySelector('.categoryofexpenseField');
const accountchooseExpenseField = document.querySelector('.accountchooseExpenseField');
const expenseamountField = document.querySelector('.expenseamountField');

// grab transaction html
const transactionEntries = document.querySelector('.transactions-entries');

// Arrays creation
let accountArray = [];
let incomeArray = [];
let expenseArray = [];
let totalAccountsBalance = [];

// grab modal close buttons
const closeModalBtns = document.querySelectorAll('.closeModal');

// grab transaction btns
const addTransactionBtns = document.querySelectorAll('.addTransactionBtn');
for (let i in addTransactionBtns) {

    addTransactionBtns[i].disabled = true;
}

const totalAmount = document.querySelector('.totalAmount');


// copyright year
const dynYear = document.querySelector('.dynYear');


// 

//-----------Declaration of Objects--------------------//
class Account {
    constructor(random, name, type, balance) {
        this.random = random;
        this.name = name;
        this.type = type;
        this.balance = balance;
    }
}

// Income Object Class
class IncomeTransaction {
    constructor(category, account, amount) {
        this.category = category;
        this.account = account;
        this.amount = amount;
    }
}

class ExpenseTransaction {
    constructor(category, account, amount) {
        this.category = category;
        this.account = account;
        this.amount = amount;
    }
}

class MoneyMove {
    constructor(movefromAccount, movetoAccount, amount) {
        this.movefromAccount = movefromAccount;
        this.movetoAccount = movetoAccount;
        this.amount = amount;
    }
}
//-----------End Declaration of Objects--------------------//


//-----------Start Open Modals--------------------//
function ModalAccountOpen() {
    modalAccount.style.display = "block";

    closeModal(modalAccount);
}



// Open modal income
function ModalIncomeOpen() {
    modalIncome.style.display = "block";

    dynAccounts(accountincomeChooseField);
    closeModal(modalIncome);
}

// Open modal expense
function ModalExpenseOpen() {
    modalExpense.style.display = "block";
    dynAccounts(accountchooseExpenseField);
    closeModal(modalExpense);
}

// open modal move
function ModalMoveOpen() {
    modalMove.style.display = "block";
    accountsMove.forEach(accountMove => {
        dynAccounts(accountMove);
    });
    closeModal(modalMove);
}
//-----------End Open Modals--------------------//



//----------DATA ENTRY AND CALCULATION-------------//
// Add account function 
function addAccount() {
    let randomnum = Math.floor(Math.random() * 100000000);
    let newAccount = new Account(randomnum, accountNameField.value, typeOptionField.value, Number(balanceField.value));
    accountArray.push(newAccount);
    if (accountArray.length >= 2) moveAccount.disabled = false;
    modalAccount.style.display = "none";


    // emptying form
    accountNameField.value = "";
    typeOptionField.value = "";
    balanceField.value = "";


    let printedamountBalance = newAccount.balance.toFixed(2);


    const htmlAccountEntry = `
            <p class="accountEntry"> 
                <span class="existingAccountName"> ${newAccount.name} /</span> 
                Amount: <span class="euro">€</span><span id="${newAccount.random}"class="accountAmount">${printedamountBalance}</span>
            </p > `;
    existingAccountHeading.style.display = "block";
    existingAccounts.insertAdjacentHTML("afterbegin", htmlAccountEntry);

    // totalAccountsBalance.push(Number(newAccount.balance));

    total = calculateTotalofAccounts(accountArray);
    totalAmount.innerHTML = total;
    for (let i in addTransactionBtns) {
        // addTransactionBtns[i].style.disabled = true;
        addTransactionBtns[i].disabled = false;
    }



}

// Add Income Function
function addIncome() {

    let newIncomeEntry = new IncomeTransaction(categoryofincomeField.value, accountincomeChooseField.value, Number(incomeamountField.value));

    incomeArray.push(newIncomeEntry);

    const htmlIncomeEntry = `
            <div class="transaction" >
                <p>
                    <span class="type span income">Income</span> 
                    <span class="category span">Category: ${newIncomeEntry.category}</span>
                   
                    <span class="span account">${newIncomeEntry.account}</span>  
                    <span class="span amount">Amount: <span class="euro">€+<span><span class="incomeamountValue">${newIncomeEntry.amount.toFixed(2)}</span>
                    </span>
                </p>
            </div>

            `;

    transactionEntries.insertAdjacentHTML("afterbegin", htmlIncomeEntry);
    addition(newIncomeEntry);
    modalIncome.style.display = "none";

    // emptying input values 
    incomeamountField.value = "";

    calculateTotalofAccounts(accountArray);
    total = calculateTotalofAccounts(accountArray);
    totalAmount.innerHTML = total;

}

// Add Expense function
function addExpense() {
    let newExpenseEntry = new ExpenseTransaction(categoryofexpenseField.value, accountchooseExpenseField.value, Number(expenseamountField.value).toFixed(2));
    expenseArray.push(newExpenseEntry);
    subtruction(newExpenseEntry);
    modalExpense.style.display = "none";
    calculateTotalofAccounts(accountArray);
    total = calculateTotalofAccounts(accountArray);
    totalAmount.innerHTML = total;
}

// Move Money Function
function moveMoney() {
    let newmoveTransaction = new MoneyMove(moveFrom.value, movetoAccount.value, Number(moveAmount.value));
    modalMove.style.display = "none";

    if (newmoveTransaction.movefromAccount == newmoveTransaction.movetoAccount) {
        const htmlIncomeEntry = `
        <div class="invalid-transaction" >
            <p>
               Invalid Transaction. Can't move money into the same account
            </p>
        </div>

        `;

        transactionEntries.insertAdjacentHTML("afterbegin", htmlIncomeEntry);
    } else if (newmoveTransaction.movefromAccount !== newmoveTransaction.movetoAccount) {

        const conditionalMove = move(newmoveTransaction, moveFrom.value, movetoAccount.value);
        if (conditionalMove == true) {
            const htmlIncomeEntry = `
            <div class="transaction" >
                <p>
                    <span class="type span move">Move</span> 
                                 
                    <span class="span movedfromaccount">From ${newmoveTransaction.movefromAccount}<span class="minusaccount"> €-${newmoveTransaction.amount}</span></span>  
                    <span class="span movedtoaccount">To ${newmoveTransaction.movetoAccount}<span class="plusaccount"> €+${newmoveTransaction.amount}</span></span>  
                    </span>
                </p>
            </div>

            `;

            transactionEntries.insertAdjacentHTML("afterbegin", htmlIncomeEntry);
        }
        calculateTotalofAccounts(accountArray);
        total = calculateTotalofAccounts(accountArray);
        totalAmount.innerHTML = total;
    }
    // else{

    // }
}


function calculateTotalofAccounts(arrayofAccounts) {
    let totalAccount = 0;
    let printedTotal = 0;
    arrayofAccounts.forEach(item => {
        totalAccount += item.balance;
        // console.log(item)
        printedTotal = totalAccount;

    });
    return printedTotal.toFixed(2);
}

// addition and subtruction of accounts
function addition(obj) {

    for (let i in accountArray) {
        if (accountArray[i].name == obj.account) {

            accountArray[i].balance += obj.amount;
            let incomeBalance = accountArray[i].balance.toFixed(2);
            let accountAmount = document.querySelectorAll('.accountAmount');
            accountAmount.forEach(el => {
                if (el.getAttribute('id') == accountArray[i].random) {


                    el.innerHTML = incomeBalance;
                }

            });

        }
    }
}


function subtruction(obj) {

    for (let i in accountArray) {
        if (accountArray[i].name == obj.account) {

            if (accountArray[i].balance !== 0) {

                if (obj.amount > accountArray[i].balance) {

                    const htmlExpenseEntry = `
                    <div class="invalid-transaction">
                        <p>Transaction Invalid. Not enough money in ${obj.account} account.</p>
                    </div>

                    `;
                    transactionEntries.insertAdjacentHTML("afterbegin", htmlExpenseEntry);
                } else {

                    accountArray[i].balance -= obj.amount;
                    let expenseFinal = accountArray[i].balance.toFixed(2);
                    let accountAmount = document.querySelectorAll('.accountAmount');
                    const htmlExpenseEntry = `
                        <div class="transaction">
                            <p><span class="type span expense">Expense</span> <span class="category span">Category:
                                ${obj.category}</span> <span class="span account">${obj.account}</span>
                                <span class="span amount">Amount: <span class="euro">€-</span><span class="expenseamountValue">${obj.amount}</span>
                            </p>
                        </div>

                        `;
                    transactionEntries.insertAdjacentHTML("afterbegin", htmlExpenseEntry);
                    accountAmount.forEach(el => {
                        if (el.getAttribute('id') == accountArray[i].random) {
                            let accountAmount = document.querySelectorAll('.accountAmount');
                            accountAmount.forEach(sameid => {
                                if (el.getAttribute('id') == sameid.getAttribute('id')) {
                                    // console.log(`ID el ${el.getAttribute('id')} and ${sameid.getAttribute('id')} are equal`);
                                    let newrandomNumber = Math.floor(Math.random() * 100000000);
                                    accountArray[i].random = newrandomNumber;
                                    el.setAttribute("id", newrandomNumber.toString())

                                    el.innerHTML = expenseFinal;
                                }
                            });


                        }


                    });

                }






            } else {
                const htmlExpenseEntry = `
            <div class="invalid-transaction">
                <p>Transaction Invalid. ${obj.account} account is empty.</p>
            </div>

            `;
                transactionEntries.insertAdjacentHTML("afterbegin", htmlExpenseEntry);

            }
        }


    }
}

// function to move money from one account to another
function move(obj, valeuofmoveFrom, valeuofmoveTo) {
    for (let i in accountArray) {

        // CHECK IF THE ACCOUNT ARRAY MATCHES THE ACCOUNT WHICH MONEY ARE GOING TO BE SUBTRACK
        if (accountArray[i].name == valeuofmoveFrom) {


            if (accountArray[i].balance == 0) {
                const htmlIncomeEntry = `
                <div class="invalid-transaction" >
                    <p>
                       Invalid Transaction. ${obj.movefromAccount} account is empty
                    </p>
                </div>
    
                `;

                transactionEntries.insertAdjacentHTML("afterbegin", htmlIncomeEntry);

                return false;
            } else if (accountArray[i].balance < obj.amount) {
                const htmlIncomeEntry = `
                <div class="invalid-transaction" >
                    <p>
                       Invalid Transaction. You don't have enough money in ${accountArray[i].name} account 
                    </p>
                </div>
    
                `;

                transactionEntries.insertAdjacentHTML("afterbegin", htmlIncomeEntry);

                return false;
            } else {



                accountArray[i].balance -= obj.amount;
                let accountAmount = document.querySelectorAll('.accountAmount');
                let subtracted_amount_balance = accountArray[i].balance.toFixed(2);



                accountAmount.forEach(el => {
                    if (el.getAttribute('id') == accountArray[i].random) {



                        el.innerHTML = subtracted_amount_balance;
                    }

                });

                for (let x in accountArray) {
                    if (accountArray[x].name == valeuofmoveTo) {
                        // console.log(accountArray[x].name);
                        accountArray[x].balance += obj.amount;
                        let accountAmount = document.querySelectorAll('.accountAmount');
                        let added_amount_balance = accountArray[x].balance.toFixed(2);

                        accountAmount.forEach(el => {
                            if (el.getAttribute('id') == accountArray[x].random) {


                                el.innerHTML = added_amount_balance;
                            }

                        });
                    }
                }




                return true;
            }
        }
    }
}

//----------DATA ENTRY AND CALCULATION-------------//


//-----------------DRY------------------//
// close modals function
function closeModal(modal) {

    for (let i in closeModalBtns) {

        closeModalBtns[i].addEventListener("click", function () {
            modal.style.display = "none";
        });

    }

}

// dynamic selection of account options for income and expenses
function dynAccounts(importdynAccount) {


    if (importdynAccount.options.length > 0) {

        for (let i in importdynAccount.options) {

            importdynAccount.remove(i);
        }

        for (let i in accountArray) {
            let accountOption = `
            <option value='${accountArray[i].name}'>${accountArray[i].name}</option> `;

            // console.log(accountOption.search(`${accountArray[i].name}`));
            importdynAccount.insertAdjacentHTML("afterbegin", accountOption);

        }
    }
    else if (importdynAccount.options.length == 0) {

        for (let i in accountArray) {
            let accountOption = `
            <option value='${accountArray[i].name}'>${accountArray[i].name}</option> `;

            // console.log(accountOption.search(`${accountArray[i].name}`));
            importdynAccount.insertAdjacentHTML("afterbegin", accountOption);

        }
    }

}
//-----------------DRY------------------//


dynYear.innerHTML = (new Date().getFullYear());