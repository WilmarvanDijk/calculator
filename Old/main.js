/* Variable Declaration */
// let regex = "/([+*/-]\w+/g";
let expressionValue = "0";
let clearButtonState = "CE"

/* Query Selectors */
const buttons = document.querySelectorAll(".jsButton");
const resultScreen = document.querySelector(".jsResultScreen");
const expressionScreen = document.querySelector(".jsExpressionScreen");

buttons.forEach(button => button.addEventListener("click", eventHandler));
document.addEventListener("keydown", eventHandler);

/* Functions */

/**
 * Function can still be cleaned up, especially the switch-case
 * @param {*} e 
 */
function eventHandler(e) {
    let keyValue = e.key;
    let buttonValue = e.target.textContent; 
    // let keyValue = ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) ? e.key : "";

    let keyValidator = /(?:^|\s)Enter(?=\s|$)|[\d\+\-\*\/\=\.\(\)\%\c]/.test(keyValue); //f keys still needs to be disabled //(?:^|\W)Enter(?:$|\W)

    let singleValue = (e.type === "click") ? buttonValue 
                                     : (keyValidator && keyValue != "Enter") ? keyValue
                                     : (keyValue === "Enter") ? "="
                                     : "";

    switch(singleValue) {
        case "=":  
        case "Enter": clearButtonState = "AC";
                   resultValue = calculateSum(expressionValue);
                   updateExpressionScreen(expressionValue);
                   expressionValue = resultValue;
                   break;
        case "AC": 
        case "c" :
                   clearButtonState = "CE";
                // expressionValue = expressionValue.slice(0, -1);
                   updateExpressionScreen(expressionValue);
                   expressionValue = "0";
                   break;
        case "CE": 
        case "Backspace":
                   expressionValue = expressionValue.slice(0, -1);
                   if(expressionValue === "") {
                       expressionValue = "0";
                   }
                   break;
        // case ".":  console.log(expressionValue.length);
        //            break;
        default:   if (expressionValue.charAt(0) === "0") {
                        expressionValue = singleValue
                    } else {    
                        expressionValue += singleValue;
                    }
                   clearButtonState = "CE";
                   break;
    }      

    console.log(expressionValue);

    updateClearButton(clearButtonState);
    // updateExpressionScreen(expression);
    updateResultScreen(expressionValue);
}

function calculateSum(sumString) {
    let sumArray = sumString.split(/([-+*/=%()])/g).filter(el => el.length != 0);

    handleParentheses(sumArray);

    result = calculateSingleSum(sumArray)

    return String(result);
}

function handleParentheses(sumArray) {
    let sum;
    let i = 0;
    let parenthesisIndex = sumArray.map((elm, idx) => (elm === "(" || elm === ")") ? idx : "").filter(String);

    while (parenthesisIndex.length > 0) {

        parenthesisIndex = sumArray.map((elm, idx) => (elm === "(" || elm === ")") ? idx : "").filter(String);

        if(i >= parenthesisIndex.length) {
            i = 0;
        }

        if((sumArray[parenthesisIndex[i]] === "(") && (sumArray[parenthesisIndex[i + 1]] === ")")) {
            sum = sumArray.slice(parenthesisIndex[i], parenthesisIndex[i + 1] + 1);
            // sum = sumArray.splice(parenthesisIndex[i], ((parenthesisIndex[i + 1] - parenthesisIndex[i]) + 1));
            sum.shift();
            sum.pop();
            calculateSingleSum(sum);
            sumArray.splice(parenthesisIndex[i], (parenthesisIndex[i + 1] - parenthesisIndex[i] + 1), String(sum[0]));
        }

        i++
    }

}


function calculateSingleSum (sumArray) {
    let operators = sumArray.map((elm) => (elm === "+" || elm === "-" || elm === "*" || elm === "/" || elm === "%") ? elm : "").filter(String);

    if (operators.length === 0) {
        result = parseFloat(sumArray[0]);
    } else {
        for (i = 0; i < operators.length; i++) {
            result = operate(parseFloat(sumArray[0]), sumArray[1], parseFloat(sumArray[2]));
            sumArray.splice(0, 3, String(result)); // has to be variable because of parenthesis
        };
    }

    return String(result);
}

function operate(num1, operator, num2) {
    let result; 

    switch(operator) {
        case "+": result = add(num1, num2); break;
        case "-": result = subtract(num1, num2); break;
        case "*": result = multiply(num1, num2); break;
        case "/": result = divide(num1, num2); break;
        case "%": result = divide(num1, 100); break;
    }

    return result;
}

/* Screen Updaters */
const updateResultScreen = (screenValue) => resultScreen.innerHTML = screenValue;
const updateExpressionScreen = (screenValue) => expressionScreen.innerHTML = screenValue;

/* Btutton Updaters */
const updateClearButton = (buttonValue) => buttons[30].innerHTML = buttonValue;

/* Math Operations */
const add      = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide   = (a, b) => a / b; //add error detection, can't divide by 0