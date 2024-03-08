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

//EVENT LISTENER HELPER FUNCTIONS
//checks for selected class in the operator buttons
const opBtns = document.querySelectorAll('.operation');
function checkSelected() {
  //turn a node list into a proper array to iterate
  let btns = [...opBtns];
  //for every button, check for the selected class and remove if found
  for(let btn in btns) {
    if(btns[btn].classList.contains('selected')) {
      btns[btn].classList.remove('selected');
      display.textContent = 0;
    }
  }
}

//helper function to clear user inputs
function clearInputs() {
  num1 = 0;
  operator = '';
  num2 = 0;
  return num1, operator, num2;
}

//if display shows 0, clicking any number except 0 replaces 0 
//if it's not 0, the clicked number gets added onto the end of what's already there
numbers.forEach(num => num.addEventListener('click', () => {
  checkSelected();

  return display.textContent == 0 
  ? display.textContent = num.textContent 
  : display.textContent += num.textContent;
}));

document.addEventListener('keydown', (e) => {
  checkSelected();

  if(e.key.match(/\d/)) {
    return display.textContent == 0 
    ? display.textContent = e.key 
    : display.textContent += e.key;
  }
});

//remove what's in display, all saved inputs, and any additional classes
const clear = document.querySelector('.clear');
clear.addEventListener('click', () => {
  display.textContent = 0;
  clearInputs();
  checkSelected();
});

document.addEventListener('keydown', (e) => {
  if(e.key == 'Backspace') display.textContent = 0;
  clearInputs();
  checkSelected();
});

//add event listener to operator buttons, including =
opBtns.forEach(opBtn => opBtn.addEventListener('click', () => {
  //when a button is clicked, add selected class
  opBtn.classList.add('selected');

  //if operator is undefined, save what's in display to num1 and button's content to operator
  if(!operator) {
    num1 = display.textContent;
    operator = opBtn.textContent;
    //if num1 and operator are defined, set num2 to what's in display
  } else {
    num2 = display.textContent;
    display.textContent = operate(num1, operator, num2);
    clearInputs();

    //if the button clicked isn't =, save what's in display to num1 and button to operator
    if(opBtn.textContent !== '=') {
      num1 = display.textContent;
      operator = opBtn.textContent;
    }
  } 
}));
