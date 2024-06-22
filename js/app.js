let buffer = "0"
let history = "";
const screen = document.querySelector(".screen");
const screenHistory = document.querySelector(".screen-history");
let runningTotal = 0;
let previousOperator;
function buttonClick(value){
  if(isNaN(parseInt(value))){
    handleSymbol(value);
  }
  else{
    handleNumber(value);
  }
  rerender();
}
function handleNumber(value){
  if(buffer === "0"){
    buffer = value;
  }
  else{
    buffer += value;
  }
}
function handleMath(value){
  if(buffer === "0"){
    return;
  }

  const intBuffer = parseInt(buffer);
  if(runningTotal === 0){
    runningTotal = intBuffer;
  }
  else{
    flushOperation(intBuffer);
  }

  previousOperator = value;
  history += buffer + " " + value + " ";
  buffer = "0";
}
function flushOperation(intBuffer){
  if(previousOperator === "+"){
    runningTotal += intBuffer;
  }
  else if(previousOperator === "-"){
    runningTotal -= intBuffer;
  }
  else if(previousOperator === "×"){
    runningTotal *= intBuffer;
  }
  else {
    runningTotal /= intBuffer;
  }
}
function handleSymbol(value) {
  switch (value) {
    case "C":
      buffer = "0";
      history = "";
      runningTotal = 0;
      break;
    case "=":
      if (previousOperator === null) {
        // need two numbers to do math
        return;
      }
      flushOperation(parseInt(buffer));
      history += buffer + " = " + runningTotal;
      previousOperator = null;
      // history += buffer + ""
      buffer = +runningTotal;
      // history += "" + buffer;
      runningTotal = 0;
      break;
    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    case "+":
    case "-":
    case "×":
    case "÷":
      handleMath(value);
      break;
  }
}
function rerender() {
  screen.innerText = buffer;
  screenHistory.innerText = history;
}
function init() {
  document
    .querySelector(".calc-buttons")
    .addEventListener("click", function (event) {
      buttonClick(event.target.innerText);
    });
}

init();
