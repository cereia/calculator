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

//check that num1, operator, and num2 are available outside operate
function operateCheck() {
  console.log(num1, operator, num2); 
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
  display.textContent = 0
  clearInputs();
});

document.addEventListener('keydown', (e) => {
  if(e.key == 'Backspace') display.textContent = 0;
  clearInputs();
});

//clicking on any of the operations saves what's in the display to num1
//and saves the operation to operator variable
//clears display to prepare for next number; 
    //don't actually remove the previous number until a new number is clicked, 
    //then set new textContent
//when = what's in display is saved to num2
//operate function is called with num1, operator, and num2 
//display is updated with calculated value

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

  //using = is fine; works as intended
  //chaining operators breaks 
      //13 * 4 //expect 52
      // / 2 //expect 52 / 2 ; get 522

      //12 * 3 gets 36
      // + 4 gets 364 and = does nothing
  let intermedVal
  console.log(num1, operator, num2, intermedVal);
  
  if(operator === undefined && opBtn.textContent !== '=') {
    if(intermedVal) {
      num1 = intermedVal;
    } else {
      num1 = display.textContent;
    }
    operator = opBtn.textContent;
    //clear display to prep for num2
    display.textContent = 0;
    //if num1 and operator are defined, set num2 to what's in display
  } else if(num1 && operator) {
    num2 = display.textContent;
    display.textContent = operate(num1, operator, num2);
    intermedVal = operate(num1, operator, num2);
    clearInputs();

    //if num1 and op are already defined, and op is not =
    //set num1 to what's in display
    //set operator to btn's text content
    //set display to 0
  } 
}));

//if an operator was clicked instead of =, 
//what's in display is saved to num2
//operate is called
//display is updated 
//what's in display is passed/saved as num1 
//operation button pressed is saved as operator
//prepare for num2 by clearing textContent