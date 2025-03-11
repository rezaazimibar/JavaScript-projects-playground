'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Daniel Bruno',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movement) {
  containerMovements.innerHTML = '';
  movement.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type} deposit</div>
    <div class="movements__date">3 days ago</div>
    <div class="movements__value">${mov} €</div>
  </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const outcomes = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(interest => interest >= 1)
    .reduce((acc, res) => acc + res, 0);
  labelSumInterest.textContent = `${Math.abs(interest)}€`;
};

//produce side effect on accounts array
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(char => char[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  displayMovements(acc.movements);
  calcBalance(acc);
  calcDisplaySummary(acc);
};

//---event-handler---
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // display information and calculate movement and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.userName === inputTransferTo.value
  );
  inputTransferAmount.value = '';
  inputTransferTo.value = '';
  if (
    receiverAcc &&
    amount > 0 &&
    currentAccount.balance >= amount &&
    receiverAcc?.userName != currentAccount.userName
  ) {
    currentAccount.movements.push(amount * -1);
    receiverAcc.movements.push(amount);
    updateUI(currentAccount);
  }
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// const arr = ["a","b","c","d","e","f",]

// console.log(arr.splice(1,2))
// console.log(arr)

// console.log(arr.at(-1))
// console.log(arr.at(0))

//-----------------------------------------for-each-loop-------------------------------------------

// movements.forEach(function (item, i, arr) {
//   if (item > 0) {
//     console.log(
//       `number${i + 1}: your are good calculate your calculator ${item}`
//     );
//   } else {
//     console.log(`number${i + 1}: you are a bad calculator ${item}`);
//   }
// });

// currencies.forEach(function (item, i, arr) {
//   console.log(
//     `in for each item is ${item},///index is ${i},////and arr is ${arr}`
//   );
// });

// const my_set = new Set(['USA', 'UK', 'UAE']);

// my_set.forEach(function (value, _, set) {
//   console.log(`value is ${value} and set is ${set}`);
// });

//------------------------------------------coding-challenge#1-------------------------------------

// TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
// TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

// const JFD = [3, 5, 2, 12, 7];
// const KRD = [4, 1, 15, 8, 3];

// const checkDogs = function (Julia, arr2) {
//   const arr1 = Julia.slice();
//   arr1.splice(0, 1);
//   arr1.splice(-2);

//   const both_arr = [...arr1, ...arr2];

//   both_arr.forEach(function (dog, i) {
//     const type =
//       dog < 3
//         ? 'is a still puppy🐶'
//         : `is an adult, and it is ${dog} years old`;

//     console.log(`dog number ${i + 1} ${type}`);
//   });
// };

// checkDogs(JFD, KRD);

//---------------------------------------------map-method------------------------------------------

// const EURtoUSD = 1.1;

// const movementUSD = movements.map(mov => mov * EURtoUSD);

// console.log(movementUSD);
// console.log(movements);

//-----------------------------------------filter-()-----------------------------------------------

// const deposits = movements.filter(function (char, i, arr) {
//   return char > 0;
// });
// console.log(deposits);

// const withdrawals = movements.filter(char => {
//   return char < 0;
// });
// console.log(withdrawals);

// ---------------------------------------reduce-()------------------------------------------------
// const sum = movements.reduce((accumulator, currentValue) => {

//   return accumulator + currentValue;
// },0);

// console.log(sum);

// const maximum_val = movements.reduce((acc, mov) => {
//   if (acc > mov) {
//    return acc
//   }else {
//     return mov
//   }
// }, movements[0]);

// console.log(maximum_val);

// ------------------------------------coding-challenge-()-----------------------------------------

// const calcAverageHumanAge = function (dogArr) {
//   let humanAge = dogArr.map(char => {
//     if (char <= 2) {
//       return 2 * char;
//     } else if (char > 2) {
//       return 16 + char * 4;
//     }
//   });

//   const filtered_dog = humanAge.filter(char => {
//     return char > 18;
//   });

//   const sum_human = filtered_dog.reduce((acc, char) => {
//     return acc + char;
//   }, 0);
//   const average_human = sum_human / filtered_dog.length;
//   console.log(`human age = ${humanAge}`);
//   console.log(`filtered dog = ${filtered_dog}`);
//   console.log(`average = ${average_human}`);
// };

// calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);

// -----------------------------------------PIPELINE------------------------------------------------

// const totalDepositToUSD = movements
//   .filter(mov => mov > 0)
//   .map(mov => mov * 1.1)
//   .reduce((acc, mov) => acc + mov, 0);

// console.log(totalDepositToUSD)

// --------------------------------------coding-challenge-3-()-------------------------------------

// const calcAverageHumanAge = dogArray => {
//   const result = dogArray
//     .map(char => {
//       if (char <= 2) {
//         return char * 2;
//       } else {
//         return 16 + char * 4;
//       }
//     })
//     .filter(char => char >= 18)
//     .reduce((acc, char, i, arr) => acc + char /arr.length, 0);
//     console.log(result)
// };

// calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);

// ----------------------------------------------find-()-------------------------------------------

// console.log(movements.find(mov => mov < 0));

// console.log(accounts.find(mov => mov.owner === 'Jessica Davis'));

// for (const acc of accounts) {
//   if (acc.owner === 'Jessica Davis') {
//     console.log(acc);
//   }
// }
