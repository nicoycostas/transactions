
// grab modals divs html
const modalIncome = document.querySelector('.modalIncome');
const modalExpense = document.querySelector('.modalExpense');

// grab account Modal html
const accountNameField = document.querySelector('.accountNameField');
const typeOptionField = document.querySelector('.typeOptionField');
const balanceField = document.querySelector('.balanceField');

// grab income Modal html
const modalAccount = document.querySelector('.modalAccount');
const categoryofincomeField = document.querySelector('.categoryofincomeField');
const accountincomeChooseField = document.querySelector('.accountincomeChooseField')
const incomeamountField = document.querySelector('.incomeamountField');

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
//-----------End Open Modals--------------------//



//----------DATA ENTRY AND CALCULATION-------------//
// Add account function 
function addAccount() {
    let randomnum = Math.floor(Math.random() * 10);
    let newAccount = new Account(randomnum, accountNameField.value, typeOptionField.value, Number(balanceField.value));
    accountArray.push(newAccount);
    modalAccount.style.display = "none";


    // emptying form
    accountNameField.value = "";
    typeOptionField.value = "";
    balanceField.value = "";




    const htmlAccountEntry = `
            <p class="accountEntry"> 
                <span class="existingAccountName"> ${newAccount.name} /</span> 
                Amount: <span class="euro">€</span><span id="${newAccount.random}"class="accountAmount">${newAccount.balance}</span>
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
                    <span class="category span">Category:${newIncomeEntry.category}</span>
                   
                    <span class="span account">${newIncomeEntry.account}</span>  
                    <span class="span amount">Amount: <span class="euro">€+<span><span class="incomeamountValue">${newIncomeEntry.amount}</span>
                    </span>
                </p>
            </div>

            `;

    transactionEntries.insertAdjacentHTML("afterbegin", htmlIncomeEntry);
    addition(accountincomeChooseField.value, Number(incomeamountField.value));
    modalIncome.style.display = "none";

    // emptying input values 
    incomeamountField.value = "";

    calculateTotalofAccounts(accountArray);
    total = calculateTotalofAccounts(accountArray);
    totalAmount.innerHTML = total;

}

// Add Expense function
function addExpense() {
    let newExpenseEntry = new ExpenseTransaction(categoryofexpenseField.value, accountchooseExpenseField.value, Number(expenseamountField.value));
    expenseArray.push(newExpenseEntry);




    // subtruction(accountchooseExpenseField.value, Number(expenseamountField.value));

    subtruction(newExpenseEntry);


    modalExpense.style.display = "none";
    calculateTotalofAccounts(accountArray);
    total = calculateTotalofAccounts(accountArray);
    totalAmount.innerHTML = total;


}


function calculateTotalofAccounts(arrayofAccounts) {
    let totalAccount = 0;
    arrayofAccounts.forEach(item => {
        totalAccount += item.balance;

    });
    return totalAccount;
}

// addition and subtruction of accounts
function addition(account, amount) {

    for (let i in accountArray) {
        if (accountArray[i].name == account) {

            accountArray[i].balance += amount;
            let accountAmount = document.querySelectorAll('.accountAmount');
            accountAmount.forEach(el => {
                if (el.getAttribute('id') == accountArray[i].random) {


                    el.innerHTML = accountArray[i].balance;
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
                    let accountAmount = document.querySelectorAll('.accountAmount');
                    accountAmount.forEach(el => {
                        if (el.getAttribute('id') == accountArray[i].random) {


                            el.innerHTML = accountArray[i].balance;

                        }


                    });
                    const htmlExpenseEntry = `
                    <div class="transaction">
                        <p><span class="type span expense">Expense</span> <span class="category span">Category:
                            ${obj.category}</span> <span class="span account">${obj.account}</span> 
                            <span class="span amount">Amount:<span class="euro">€-</span><span class="expenseamountValue">${obj.amount}</span>
                        </p>
                    </div>
                
                    `;
                    transactionEntries.insertAdjacentHTML("afterbegin", htmlExpenseEntry);
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

// function minusZero(){

// }

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