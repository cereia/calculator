//when user clicks a number button, an operator, and another number
//do that mathematical operation on those 2 numbers

const operations = {
  '+': (n1, n2) => n1 + n2,
  '-': (n1, n2) => n1 - n2,
  '*': (n1, n2) => n1 * n2,
  '/': (n1, n2) => {
    if(Number(n2) === 0) {
      return 'Div by 0?!'
    }
    return n1 / n2;
  }
}

//create variables for the 3 user inputs
let num1;
let operator;
let num2; 

//takes 3 variables, 2 nums and an operation 
//uses one of the above function based on the operation to perform the operation
function operate(n1, op, n2) {
  num1 = n1;
  operator = op;
  num2 = n2;
  console.log(num1, operator, num2)

  return operations[operator](num1, num2);
}
