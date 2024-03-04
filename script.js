//when user clicks a number button, an operator, and another number
//do that mathematical operation on those 2 numbers

//four basic operations of math
function add(n1, n2) {
  return n1 + n2;
}

function subtract(n1, n2) {
  return n1 - n2;
}

function multiply(n1, n2) {
  return n1 * n2;
}

function divide(n1, n2) {
  //can't divide by 0, so set a special message to show if user is dividing by 0
  if (Number(n2) === 0) {
    return "Div by 0?!"
  }
  return n1 / n2;
}