//when user clicks a number button, an operator, and another number
//do that mathematical operation on those 2 numbers

//CALCULATOR FUNCTIONALITY
const operations = {
  '+': (n1, n2) => n1 + n2,
  '-': (n1, n2) => n1 - n2,
  '*': (n1, n2) => n1 * n2,
  '/': (n1, n2) => n2 == 0 ? display.textContent = 'Div by 0?!' : n1 / n2,
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
const opBtns = document.querySelectorAll('.operation');

//remove selected class from operation buttons
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
  removeSelected();

  return display.textContent == 0 
  ? display.textContent = num.textContent 
  : display.textContent += num.textContent;
}));

document.addEventListener('keydown', (e) => {
  removeSelected();

  if(e.key.match(/^\d/)) {
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
  removeSelected();
});

document.addEventListener('keydown', (e) => {
  if(e.key == 'Backspace' || e.key == 'Delete') {
    display.textContent = 0;
    clearInputs();
    removeSelected();
  };  
});

//add event listener to operator buttons, including =
opBtns.forEach(btn => btn.addEventListener('click', () => {
  //when a button is clicked, add selected class
  btn.classList.add('selected');

  //if operator is undefined, save what's in display to num1 and button's content to operator
  if(btn.textContent !== '=' && !operator) {
    num1 = display.textContent;
    operator = btn.textContent;
    //if num1 and operator are defined, set num2 to what's in display
    console.log(num1, operator, num2, 'n1, op, n2 => 1')

  } else {
    num2 = display.textContent;
    console.log(num1, operator, num2, 'n1, op, n2 => 2')
    display.textContent = operate(num1, operator, num2);
    clearInputs();

    //if the button clicked isn't =, save what's in display to num1 and button to operator
    if(btn.textContent !== '=') {
      num1 = display.textContent;
      operator = btn.textContent;
    }
  }
}));
