//when user clicks a number button, an operator, and another number
//do that mathematical operation on those 2 numbers

//CALCULATOR FUNCTIONALITY
const operations = {
  '+': (n1, n2) => n1 + n2,
  '-': (n1, n2) => n1 - n2,
  '*': (n1, n2) => n1 * n2,
  '/': (n1, n2) => n2 == 0 ? 'Div by 0?!' : n1 / n2,
}

//create variables for the 3 user inputs
let num1;
let operator;
let num2; 

//takes 3 variables, 2 nums and an operation 
//uses one of the above function based on the operation to perform the operation
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

const numbers = document.querySelectorAll('.number');

//EVENT LISTENERS
//if display shows 0, clicking any number except 0 replaces 0 
//if you keep clicking, the clicked number gets added onto the end of what's already there
numbers.forEach(num => num.addEventListener('click', () => {
  return display.textContent == 0 
  ? display.textContent = num.textContent 
  : display.textContent += num.textContent;
}));

document.addEventListener('keydown', (e) => {
  if(e.key.match(/\d/)) {
    return display.textContent == 0 
    ? display.textContent = e.key 
    : display.textContent += e.key;
  }
});

//remove what's in display and resets it to 0
const clear = document.querySelector('.clear');
clear.addEventListener('click', () => {
  display.textContent = 0;
  clearInputs();
});

document.addEventListener('keydown', (e) => {
  if(e.key == 'Backspace') display.textContent = 0;
  clearInputs();
});

//helper function to clear user inputs
function clearInputs() {
  num1 = undefined;
  operator = undefined;
  num2 = undefined;
  return num1, operator, num2;
}

const opBtns = document.querySelectorAll('.operation');
opBtns.forEach(opBtn => opBtn.addEventListener('click', () => {
  //if num1 is not defined, define it as what's in the display
  //if operator is also not defined, define it as the operator btn's text content;
  
  if(operator === undefined) {
    num1 = display.textContent;
    operator = opBtn.textContent;
    //clear display to prep for num2
    display.textContent = 0;
    console.log(num1, operator, num2, operate(num1, operator, num2));

    //if num1 and operator are defined, set num2 to what's in display
  } else {
    num2 = display.textContent;
    display.textContent = operate(num1, operator, num2);
    console.log(num1, operator, num2, operate(num1, operator, num2));
    clearInputs();
    if(opBtn.textContent !== '=') {
      num1 = display.textContent;
      operator = opBtn.textContent;
      display.textContent = 0;
    }
  } 
}));