//when user clicks a number button, an operator, and another number
//do that mathematical operation on those 2 numbers
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



//calculator display 
const display = document.querySelector('.display');
display.textContent = 0;

const numbers = document.querySelectorAll('.number');

//if display shows 0, clicking any number except 0 replaces 0 
//if you keep clicking, the clicked number gets added onto the end of what's already there
numbers.forEach(num => num.addEventListener('click', () => {
  return display.textContent == 0 
  ? display.textContent = num.textContent 
  : display.textContent += num.textContent;
}));

const clear = document.querySelector('.clear');
clear.addEventListener('click', () => display.textContent = 0);