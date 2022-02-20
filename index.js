// Data
const account1 = {
  owner: "Omar Barragan Moreno",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Castro",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Mario Ernesto Martinez",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Pilar Perez Chavez",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

const containerMovements = document.querySelector(".container-movements");
const displayCash = document.querySelector(".cash");
const dateIn = document.querySelector(".date-in");
const dateOut = document.querySelector(".date-out");
const dateInterest = document.querySelector(".date-interest");
const welcomeText = document.querySelector(".welcome-text");

const buttonLogin = document.querySelector(".button-login");
const loginUsername = document.querySelector(".login-username");
const loginPassword = document.querySelector(".login-password");
const text = document.querySelector(".invalid");
const containerMain = document.querySelector(".operation-main");

const inputDestination = document.querySelector(".destination");
const inputDeposit = document.querySelector(".deposit");
const buttonOperation = document.querySelector(".button-operation");
const validDestination = document.querySelector(".label-text");

const buttonClosed = document.querySelector(".button-close");
const closeUser = document.querySelector(".close-user");
const closePassword = document.querySelector(".close-pass");
const userClosed = document.querySelector(".text-user");
const passwordClosed = document.querySelector(".text-password");

const buttonLoan = document.querySelector(".button-loan");
const inputLoan = document.querySelector(".loan");
const textLoan = document.querySelector(".text-loan");

const buttonSort = document.querySelector(".button-sort");

const date = document.querySelector(".date");

const time = document.querySelector(".time");

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = "";
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach((mov, i) => {
    const type = mov > 0 ? "deposito" : "pago";
    const html = `<div class="container-pay movements-deposit">
      <div class="movement-${type}">${type} ${i + 1}</div>
      <div class="deposit-cash">$${mov} mxn</div>
    </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};
const calcPrintBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  displayCash.textContent = `$${acc.balance} mxn`;
};

const calcDisplaySummary = function (account) {
  const incomes = account.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  dateIn.textContent = `$${incomes} mxn`;

  const out = account.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  dateOut.textContent = `$${Math.abs(out)} mxn`;

  const interest = account.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * account.interestRate) / 100)
    .filter((int, i, arr) => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  dateInterest.textContent = `$${interest} mxn`;
};

const createName = function (accs) {
  accs.forEach(function (acc) {
    acc.userName = acc.owner
      .toLowerCase()
      .split(" ")
      .map(function (name) {
        return name[0];
      })
      .join("");
  });
};
createName(accounts);

//TIMER

const startLogOutTimer = function () {
  const fick = function () {
    //In each call, print the remaining time to UI

    const min = String(Math.trunc(timeCounter / 60)).padStart(2, 0);
    const sec = String(timeCounter % 60).padStart(2, 0);
    time.textContent = `${min}:${sec}`;

    //When 0 seconds, stop timer and log out user
    if (timeCounter === 0) {
      clearInterval(timer);
      welcomeText.textContent = ` Inicia sesion con tu cuenta the bank`;
      containerMain.style.opacity = 0;
    }
    timeCounter--;
  };
  // Set time to 3minutes
  //Decrese 1 second
  let timeCounter = 2000;
  //Call the timer every second
  fick();
  const timer = setInterval(fick, 1000);
  return timer;
};

const updateUI = function (acc) {
  displayMovements(acc.movements);
  calcPrintBalance(acc);
  calcDisplaySummary(acc);
};

//LOGIN

let currentAccount, timer;

buttonLogin.addEventListener("click", function (event) {
  //Prevent for from submitting
  event.preventDefault();
  currentAccount = accounts.find(
    (user) => user.userName === loginUsername.value
  );
  if (currentAccount && currentAccount.pin === Number(loginPassword.value)) {
    welcomeText.textContent = `Bienvenido a tu cuenta ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerMain.style.opacity = 100;

    //clear inputs
    loginUsername.value = "";
    loginPassword.value = "";

    loginPassword.blur();

    if (timer) {
      clearInterval(timer);
    }
    timer = startLogOutTimer();

    updateUI(currentAccount);
  } else {
    text.textContent = `Usuario o Password incorrectos`;
  }
});

//TRANSFER

buttonOperation.addEventListener("click", function (event) {
  event.preventDefault();
  const amount = Number(inputDeposit.value);
  const destination = accounts.find(
    (acc) => acc.userName === inputDestination.value
  );

  inputDeposit.value = "";
  inputDestination.value = "";

  if (
    amount > 0 &&
    destination &&
    currentAccount.balance >= amount &&
    destination.userName !== currentAccount.userName
  ) {
    currentAccount.movements.push(-amount);
    destination.movements.push(amount);

    updateUI(currentAccount);

    //reset time
    clearInterval(timer);
    timer = startLogOutTimer();
  } else {
    validDestination.textContent = `Dinero isuficiente`;
  }
});

//LOAN
buttonLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Number(inputLoan.value);
  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount / 10)
  ) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);

    clearInterval(timer);
    timer = startLogOutTimer();
  } else {
    textLoan.textContent = `Solo se otorga el 10%`;
  }
  inputLoan.value = "";
});

//CLOSE

buttonClosed.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    closeUser.value === currentAccount.userName &&
    Number(closePassword.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.userName === currentAccount.userName
    );
    accounts.splice(index, 1);

    containerMain.style.opacity = 0;
  } else {
    userClosed.textContent = `Incorrecto`;
    passwordClosed.textContent = `Incorrecto`;
  }
  //clear inputs
  loginUsername.value = "";
  loginPassword.value = "";
});

//SORT

let sorted = false;
buttonSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

const now = new Date();
const day = now.getDate();
const month = now.getMonth() + 1;
const year = now.getFullYear();
const hour = now.getHours();
const min = now.getMinutes();
date.textContent = `${day}/${month}/${year}, ${hour}:${min}`;
