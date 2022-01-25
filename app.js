'use strict';

//Account Data

const account1 = {
  name: 'William Bowdler',
  movements: [500, -60, 704, 2678, -12, -325, 700, 30, 30, 41, -12],
  interestRate: 1.1,
  password: 'J316'
};
const account2 = {
  name: 'Kobe Van Someren',
  movements: [-1, -600, -913, -6, -4, 1, -1000],
  interestRate: 13.9,
  password: '2C521'
};
const account3 = {
  name: 'Seth Matthews',
  movements: [1141, 164246, 1532135, 1234, 16443, 2, -1, 25452],
  interestRate: 1.1,
  password: '1P224'
};
const account4 = {
  name: 'Matt Coleman',
  movements: [1, 2, 3, 4, 5, 6, 6, 6, 6, 7,],
  interestRate: 1.1,
  password: 'E289'
};

const accounts = [account1, account2, account3, account4];

//Selected Elements

const appContainer = document.querySelector('.user-interface')
const loginUsername = document.querySelector('.login--username');
const loginPass = document.querySelector('.login--pass');
const btnLogin = document.querySelector('.login__btn');
const createAccount = document.querySelector('.newAccount')

const newAccInput = document.querySelectorAll('.form__input')
const inputCloseUn = document.querySelector('.close--un');
const inputClosePass = document.querySelector('.close--pass');
const modalCont = document.querySelector('.modal__container');

const btnTransfer = document.querySelector('.btn--transfer');
const btnRequest = document.querySelector('.btn--request');
const btnClose = document.querySelector('.btn--close')
const movementCont = document.querySelector('.ui__main--movs');
const movInOut = document.querySelector('.in-out');
const movAmount = document.querySelector('.mov-amount');
const welcome = document.querySelector('.welcome');
const balance = document.querySelector('.balance');
const transferTo = document.querySelector('.transfer--to');
const transferAmount = document.querySelector('.transfer--amount');
const loanAmount = document.querySelector('.loanamount');

const infoIcon = document.querySelector('.fa-info-circle');
const btnInfoClose = document.querySelector('.info--close');
const modalConti = document.querySelector('.modal__containeri');

// Creating a new account DOM elements

const btnNewAcc = document.querySelector('.newAcc__btn');
const newAccForm = document.querySelector('newAcc__form')
const inputFirstName = document.querySelector('.inew--firstname');
const inputLastName = document.querySelector('.inew--lastname');
const inputNewUser = document.querySelector('.inew--username');
const inputNewPass = document.querySelector('.inew--password');
const inputNewEmail = document.querySelector('.inew--email');



//Functions 
const computeUN = function(accs) {
  accs.forEach((acc) => {
    acc.username = acc.name
      .toLowerCase()
      .split(' ')
      .map(word => word[0])
      .join('');
  })
}
computeUN(accounts);

const displayMovements = function(movements) {
  movementCont.innerHTML = '';

  movements.forEach((mov, i) => {
    const type = mov > 0 ? 'Deposit' : 'Withdrawal';

    const html = `
    <div class="movement">
      <div class="in-out mov-${type}">${i + 1}: ${type}</div>
      <div class="mov-amount">${mov}</div>
    </div>
    `

    movementCont.insertAdjacentHTML('afterbegin', html);
  })
}

let calcDisplayBalance = function(acc) {
  acc.balance = acc.movements.reduce((acc, mov) => 
    acc + mov, 0);

  balance.textContent = `Balance: $${acc.balance}`
}

const newAccount = function() {
  class AccountCl {
    constructor(name, movements, password, username) {
      this.name = name;
      this.movements = movements;
      this.password = password;
      this.username = username;
    }
  } 


  if (inputFirstName.value && 
      inputLastName.value && 
      inputNewUser.value && 
      inputNewPass.value && 
      inputNewEmail.value
    ) {
    const givenName = `${inputFirstName.value} ${inputLastName.value}`

    let theaccount = new AccountCl(
      givenName, 
      [], 
      inputNewPass.value, 
      inputNewUser.value  
    );
    accounts.push(theaccount)
    alert(`Welcome ${givenName}! You have successfully created your account with Bill's Banking`);
    inputFirstName.value = inputLastName.value = inputNewUser.value = inputNewPass.value = inputNewEmail.value = '' 
  }
}



//Event Listeners
let currentAccount;

btnLogin.addEventListener('click', function(e) {
  e.preventDefault();

  currentAccount = accounts.find(acc => acc.username === loginUsername.value);
  
  if (loginPass.value === currentAccount?.password) {
    appContainer.style.opacity = 100;
    welcome.textContent = `Welcome ${currentAccount.name.split(' ')[0]}`;
    calcDisplayBalance(currentAccount);
    displayMovements(currentAccount.movements);
    createAccount.style.display = 'none';
  }
  loginPass.value = loginUsername.value = '';

  
  
});

btnTransfer.addEventListener('click', function(e) {
  e.preventDefault();
  const amount = Number(transferAmount.value);
  const transferee = accounts.find(
    acc => acc.username === transferTo.value);

  if (amount > 0 && 
      transferee &&
      currentAccount.balance >= amount &&
      transferee?.username !== currentAccount.username ) {
    transferee.movements.push(amount);
    currentAccount.movements.push(-amount);
    calcDisplayBalance(currentAccount);
    displayMovements(currentAccount.movements);
  }
  
  transferTo.value = transferAmount.value = '';
})

btnRequest.addEventListener('click', function(e) {
  e.preventDefault();
  const amount = Number(loanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some(mov => mov >= amount / 10)) {
      currentAccount.movements.push(amount);
      calcDisplayBalance(currentAccount);
      displayMovements(currentAccount.movements);
  }
}) 

// btnNewAcc.addEventListener('click', function(e) {
//   e.preventDefault();
//   //create new object & display new modal window
// })

btnClose.addEventListener('click', function(e) {
  e.preventDefault();

  if (inputCloseUn.value === currentAccount?.username &&
      inputClosePass.value === currentAccount.password) {
        const index = accounts.findIndex(acc => acc.username === currentAccount.username);
        accounts.splice(index, 1);
        appContainer.style.opacity = 0;
      }
  inputClosePass.value = inputCloseUn.value = '';
})

btnNewAcc.addEventListener('click', newAccount);

infoIcon.addEventListener('click', function() {
  modalConti.classList.add('modal-visible');
})
btnInfoClose.addEventListener('click', function() {
  modalConti.classList.remove('modal-visible');
})