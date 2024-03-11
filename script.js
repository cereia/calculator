//CALCULATOR FUNCTIONALITY
const operations = {
  '+': (n1, n2) => n1 + n2,
  '-': (n1, n2) => n1 - n2,
  '*': (n1, n2) => n1 * n2,
  '/': (n1, n2) => n2 == 0 ? display.textContent = 'Div by 0?!' : n1 / n2,
}

//create variables for the 3 user inputs
let num1 = 0;
let operator = '';
let num2 = 0; 

function operate(n1, op, n2) {
  num1 = Number(n1);
  operator = op;
  num2 = Number(n2);

  //looks through operations obj for the correct operator key, then performs the operation
  return operations[operator](num1, num2);
}


//CALCULATOR DISPLAY 
const display = document.querySelector('.display');
display.textContent = 0;
const opBtns = document.querySelectorAll('.operation');
const numbers = document.querySelectorAll('.number');
const clear = document.querySelector('.clear');

//EVENT LISTENERS

//EVENT LISTENER HELPER FUNCTIONS
//clear display for next number by remove selected class from operation button
function removeSelected() {
  //turn a node list into a proper array to iterate
  let opBtnsArr = [...opBtns];
  //for every button, check for the selected class and remove if found
  for(let btn in opBtnsArr) {
    if(opBtnsArr[btn].classList.contains('selected')) {
      opBtnsArr[btn].classList.remove('selected');
      display.textContent = 0;
    }
  }
}

//clear user inputs
function clearInputs() {
  num1 = 0;
  operator = '';
  num2 = 0;
  return num1, operator, num2;
}

//if display shows 0, clicking any number except 0 replaces 0 
//if it's not 0, the clicked number gets added onto the end of what's already there
numbers.forEach(num => num.addEventListener('click', () => {
  //call removeSelected first to make display 0 before moving to ternary
  removeSelected();

  return display.textContent == 0 
  ? display.textContent = num.textContent 
  : display.textContent += num.textContent;
}));

document.addEventListener('keydown', (e) => {
  removeSelected();

  if(e.key.match(/^[\d]/)) {
    return display.textContent == 0 
    ? display.textContent = e.key 
    : display.textContent += e.key;
  }
});

//remove what's in display, all saved inputs, and any additional classes
clear.addEventListener('click', () => {
  display.textContent = 0;
  clearInputs();
  removeSelected();
});

document.addEventListener('keydown', (e) => {
  if(e.key == 'Backspace' || e.key == 'Delete') {
    display.textContent = 0;
    clearInputs();
    removeSelected();
  };  
});

//click listener to operator buttons and =
opBtns.forEach(btn => btn.addEventListener('click', (e) => {
  //add selected class that helps with clearing display
  btn.classList.add('selected');
  //pass button's symbol to handler
  calculateHandler(e.target.textContent);
}));

//keyboard listener for operations
document.addEventListener('keydown', (e) => {
  //add selected class to help with clearing display
  let opBtnsArr = [...opBtns];
  for(let btn in opBtnsArr) {
    if(e.key === opBtnsArr[btn].textContent || 
      (e.key === 'Enter' && opBtnsArr[btn].textContent === '=')) {
      opBtnsArr[btn].classList.add('selected');
    }
  }

  let keys = Object.keys(operations);
  if(keys.includes(e.key) || e.key === '=') {
    calculateHandler(e.key);
  } else if (e.key === 'Enter') {
    calculateHandler('=');
  }
})

//click and keydown handler for operations
function calculateHandler(symbol) {
  if(symbol !== '=' && !operator) {
    num1 = display.textContent;
    operator = symbol;
  } else {
    num2 = display.textContent;
    display.textContent = operate(num1, operator, num2);
    clearInputs();

    if(symbol !== '=') {
      num1 = display.textContent;
      operator = symbol;
    }
  }
}