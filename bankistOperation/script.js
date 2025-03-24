'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Reza Azimi',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2024-11-18T21:31:17.178Z',
    '2024-12-23T07:42:02.383Z',
    '2025-01-28T09:15:04.904Z',
    '2025-04-01T10:17:24.185Z',
    '2025-05-08T14:11:59.604Z',
    '2025-05-27T17:01:17.194Z',
    '2025-07-11T23:36:17.929Z',
    '2025-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'en-US',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2024-11-01T13:15:33.035Z',
    '2024-11-30T09:48:16.867Z',
    '2024-12-25T06:04:23.907Z',
    '2025-01-25T14:18:46.235Z',
    '2025-02-05T16:33:06.386Z',
    '2025-04-10T14:43:26.374Z',
    '2025-06-25T18:49:59.371Z',
    '2025-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

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

//functions

const formatMovementDate = function (date, local) {
  const calcDayPassed = (date1, date2) =>
    Math.round(Math.abs((date1 - date2) / (1000 * 60 * 60 * 24)));
  const daysPass = calcDayPassed(new Date(), date);
  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();
  if (daysPass === 0) return 'Today';
  if (daysPass === 1) return 'Yesterday';
  if (daysPass <= 7) `${daysPass} days ago`;
  else {
    return new Intl.DateTimeFormat(local).format(date);
  }
};

const formatCal = function (value, local, currency) {
  return new Intl.NumberFormat(local, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.local);

    const formattedMov = formatCal(mov, acc.local, acc.currency);

    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type} deposit</div>
    <div class="movements__date">${displayDate}</div>
    <div class="movements__value">${formattedMov}</div>
    </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov);
  labelBalance.textContent = formatCal(acc.balance, acc.local, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCal(incomes, acc.local, acc.currency);

  const outcomes = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCal(
    Math.abs(outcomes),
    acc.local,
    acc.currency
  );

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(interest => interest >= 1)
    .reduce((acc, res) => acc + res, 0);
  labelSumInterest.textContent = formatCal(interest, acc.local, acc.currency);
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
  displayMovements(acc);
  calcBalance(acc);
  calcDisplaySummary(acc);
};

const startLogOutTimer = function () {
  const tick = function () {
    const minute = String(Math.trunc(time / 60)).padStart(2, 0);
    const second = String(time % 60).padStart(2, 0);
    
    labelTimer.textContent = `${minute}:${second}`;
    
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }
    time--;
  };
  let time = 300; 

  tick()
  const timer = setInterval(tick, 1000);
  return timer
};

//////////////////////////////////////////
//---event-handler---
let currentAccount, timer;

// ---add fake login---
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

const now = new Date();
const options = {
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
  // weekday: 'long',
};
// const locale = navigator.language;

// const day = `${now.getDate()}`.padStart(2, 0);
// const month = `${now.getMonth() + 1}`.padStart(2, 0);
// const year = now.getFullYear();
// const hour = `${now.getHours()}`.padStart(2, 0);
// const minute = `${now.getMinutes()}`.padStart(2, 0);

// labelDate.textContent = `${year}/${month}/${day}, ${hour}:${minute}`;

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
    if (timer) clearInterval(timer)
    timer = startLogOutTimer();
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.userName === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    receiverAcc &&
    amount > 0 &&
    currentAccount.balance >= amount &&
    receiverAcc?.userName != currentAccount.userName
  ) {
    currentAccount.movements.push(amount * -1);
    receiverAcc.movements.push(amount);

    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);
    updateUI(currentAccount);
    clearInterval(timer)
    timer = startLogOutTimer();
  }
});

//deleting the account
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  const user_acc_d = inputCloseUsername.value;
  const pin_acc_d = Number(inputClosePin.value);
  if (
    currentAccount?.userName === user_acc_d &&
    currentAccount.pin === pin_acc_d
  ) {
    const index = accounts.findIndex(
      acc => currentAccount.userName === acc.userName
    );
    //delete account
    accounts.splice(index, 1);

    //hide UI
    containerApp.style.opacity = 0;
  }
  inputClosePin.value = inputCloseUsername.value = '';
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(new Date().toISOString());
      updateUI(currentAccount);
    }, 2500);
    clearInterval(timer)
    timer = startLogOutTimer();
  }
  inputLoanAmount.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

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

// ----------------------------------------------some()--------------------------------------------

// console.log(movements.some(char => 0 < char));

// ------------------------------------------------array-------------------------------------------

// const x = new Array(8);

// console.log(x);

// x.fill(2, 4, 7);
// console.log(x);

// const y = Array.from({ length: 8 }, () => 1);
// console.log(y);

// const z = Array.from({ length: 8 }, (_, i) => i + 1);
// console.log(z);

// console.log(document.querySelectorAll('.movements__value'))
// const movementUI = Array.from(document.querySelectorAll('.movements__value'))
// console.log(movementUI)

// ----------------------------------------Practice------------------------------------------------

// const bankDepositSum = accounts
//   .flatMap(char => char.movements)
//   .filter(char => char > 0)
//   .reduce((acc, char) => acc + char, 0);

// console.log(bankDepositSum);

// const number_deposit_over_1000 = accounts
//   .flatMap(char => char.movements)
//   .reduce((acc, cur) => {
//     if (cur >= 1000) {
//       return ++acc;
//     } else {
//       return acc;
//     }
//   }, 0);
// console.log(number_deposit_over_1000);

// const balanceObjects = accounts
//   .flatMap(char => char.movements)
//   .reduce(
//     (acc, cur) => {
//       if (cur > 0) {
//         acc.deposit += cur;
//       } else {
//         acc.withdrawals += cur;
//       }
//       return acc;
//     },
//     { deposit: 0, withdrawals: 0 }
//   );
// console.log(balanceObjects);

// const title_converter = function (title) {
//   const title_case = title.reduce((acc, cur) => {
//     acc + cur;
//     return cur;
//   }, '');
//   return title_case;
// };

// console.log(title_converter('heythere'));

// -----------------------------------------coding-challenge---------------------------------------

// const dogs = [
//   { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
//   { weight: 8, curFood: 200, owners: ['Matilda'] },
//   { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
//   { weight: 32, curFood: 340, owners: ['Michael'] },
// ];
// //1.
// dogs.map(char => {
//   char.recommendedFood = Math.trunc(char.weight ** 0.75 * 28);
// });

// //2.
// dogs.map(char => {
//   if (char.owners.includes('Sarah')) {
//     console.log(
//       char.curFood > char.recommendedFood
//         ? 'eating too much'
//         : 'eating too less'
//     );
//   }
// });

// //3.
// const ownerEatTooMuch = dogs
//   .filter(char => char.curFood > char.recommendedFood)
//   .map(char => char.owners)
//   .flat();
// const ownerEatTooLittle = dogs
//   .filter(char => char.curFood < char.recommendedFood)
//   .map(char => char.owners)
//   .flat();

// // console.log(dogs)
// console.log(ownerEatTooMuch);
// console.log(ownerEatTooLittle);

// //4.

// console.log(
//   `${ownerEatTooMuch.join(
//     ' and '
//   )}'s dogs eat too much and ${ownerEatTooLittle.join(
//     ' and '
//   )}'s dogs eat too little.`
// );
// //5.
// console.log(dogs.some(char => char.curFood === char.recommendedFood));

// const myCondition = char =>
//   char.curFood > char.recommendedFood * 0.9 &&
//   char.curFood < char.recommendedFood * 1.1;

// //6.
// console.log(dogs.some(myCondition));

// //7.
// const ok_dogs = dogs.filter(myCondition);
// console.log(ok_dogs);

// //8.
// const shallow_copy = dogs.slice();

// shallow_copy.sort((a, b) => {
//   return a.recommendedFood - b.recommendedFood;
// });
// console.log(shallow_copy);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES 2

// console.log(34);
// console.log(0.1 + 0.2);

// console.log(Number.parseInt('float32', 16));
// console.log(Number.parseInt('float32', 10));
// console.log(Number.isNaN(34));
// console.log(Number.isNaN(+'df34'));
// console.log(25 / 0);

// console.log(Number.isInteger(34.2));
// console.log(Number.isFinite(34.2));

// console.log(Math.trunc(Math.random() * 4) + 1);

// console.log(Math.round(3.8));

// console.log(+(3.234).toFixed(10));

// console.log(34_342_342);

// console.log(2 ** 53 );

// console.log(34234234234239408230984098n)
// console.log(BigInt(34234234234239408230984098))

// console.log(new Date(account1.movementsDates[0]))
// console.log(new Date(2025, 3))
// console.log(new Date(1))
// console.log(new Date(60 * 365 * 24 * 60 * 60 * 1000))

// const some_day = new Date(2025, 2, 5, 22);

// console.log(some_day.getDay());
// console.log(some_day.getDate());
// console.log(some_day.getTime());
// console.log(Date.now());
// some_day.setFullYear(2015);
// console.log(some_day.toString());

// const some_day = new Date(2025, 2, 5, 22, 30);
// const later_day = new Date(2019, 10, 5, 2, 30);

// console.log(+some_day);

// const calcDayPassed = (date1, date2) =>
//   Math.abs((date1 - date2) / (1000 * 60 * 60 * 24));
// console.log(calcDayPassed(some_day, later_day));

// const num = 23445323.33424;
// const option = {
//   style: 'unit',
//   unit: 'mile-per-hour',
// };

// console.log(`US ${new Intl.NumberFormat('en-US', option).format(num)}`);
// console.log(`DE ${new Intl.NumberFormat('de-DE', option).format(num)}`);
// console.log(`IR ${new Intl.NumberFormat('fa-IR', option).format(num)}`);

// const time_arrival = setTimeout(() => console.log('here your pizza 🍕'), 2000);

// setInterval(()=>{
//  const now = new Date()
//  console.log(`${now.getMinutes()}:${now.getSeconds()}`)
// },1000)
