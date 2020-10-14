/* Variable Declaration */
let expressionScreenValue = "";
let resultScreenValue = "";
let clearButtonState = "CE";
let parenthesesOpenCount = 0;
let parenthesesOpenToggle = 0;
let parenthesesCloseCount = 0;
let parenthesesCloseToggle = 0;

// const keys = Array.from("1234567890%*()-+=/.").concat("Delete", "Backspace", "Enter");
const numbers = Array.from("1234567890");
const operators = Array.from("+-*/%");
const functions = Array.from("()=.").concat("Delete", "Backspace", "Enter");


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
    let buttonValue = e.target.value;

    let inputValue = (e.type === "click") ? buttonValue : keyValue;
    // inputValue = (keys.includes(inputValue)) ? inputValue : "u";
    inputValue = (numbers.includes(inputValue)) ? "n" + inputValue : 
                 (operators.includes(inputValue)) ? "o" + inputValue : 
                 (functions.includes(inputValue)) ? "f" + inputValue : "";

    handleValues(inputValue);

    updateClearButton(clearButtonState);
    updateExpressionScreen(expressionScreenValue);
    updateResultScreen(resultScreenValue);
}

function handleValues(input) {
    let type = input.charAt(0);
    let operandors = input.substr(1, input.length); //operandors is a collective name of operators and operands so this value can either be an operator or an operand

    // console.log(type);
    // console.log(operandors);

    checkforZero();

    const value = {
        "o": handleOperators,
        "n": handleOperands, 
        "f": handleFunctions,
        "default": handleDefault, 
    };

    (value[type] || value["default"])(operandors);
}

function checkforZero() {
    if(resultScreenValue === "0") {
        resultScreenValue = "";
    }
}

function handleOperands(operand) {
    let secLastCharIndex = resultScreenValue.length - 1;
    let lastChar = resultScreenValue.charAt(resultScreenValue.length - 1);
    console.log(lastChar);

    let lastOpenParentheses = resultScreenValue.lastIndexOf("(");
    console.log(lastOpenParentheses);

    let firstCloseParentheses = resultScreenValue.indexOf("]");
    console.log(firstCloseParentheses);
    

    // if(parenthesesOpenToggle === 1 && parenthesesCloseToggle === 0) {
    //     resultScreenValue += ")";
    //     resultScreenValue = [resultScreenValue.slice(0, secLastCharIndex), operand, resultScreenValue.slice(secLastCharIndex)].join("");
    //     parenthesesOpenToggle = 0;
    // } else {
    //     resultScreenValue += operand;
    // }
    let firstPart;
    let secondPart;

    if(firstCloseParentheses > 0) {
        firstPart = resultScreenValue.substr(0, (firstCloseParentheses));
        console.log("firstPart: " + firstPart);
        secondPart = resultScreenValue.substr(firstCloseParentheses, resultScreenValue.length);
        console.log("secondPart: " + secondPart);
        resultScreenValue = firstPart + operand + secondPart;
        // resultScreenValue = [resultScreenValue.slice(0, firstCloseParentheses), operand, resultScreenValue.slice(firstCloseParentheses, resultScreenValue.length)].join("");



        // resultScreenValue = [resultScreenValue.slice(0, lastOpenParentheses + 1), operand, resultScreenValue.slice(lastOpenParentheses + 1)].join("");
        // lastOpenParentheses++;
    } else {
        resultScreenValue += operand; 
    }

    console.log("firstPart: " + firstPart);

    // for (let i = 0; i < parenthesesOpenCount; i++) {
    //     resultScreenValue += ")";
    // }

    // if(lastChar === "(" && parenthesesCloseToggle === 0) {
    //     console.log("if");
    //     operand += ")"; //temporary closing bracket
    //     resultScreenValue += operand;
    //     // resultScreenValue = [resultScreenValue.slice(0, secLastCharIndex ), operand, resultScreenValue.slice(secLastCharIndex)].join("");
    // } else if(parenthesesOpenCount > 0) {
    //     console.log("else if");
    //     resultScreenValue = [resultScreenValue.slice(0, secLastCharIndex ), operand, resultScreenValue.slice(secLastCharIndex)].join("");
    // } else {
    //     console.log("else");
    //     resultScreenValue += operand;
    // };

    console.log(resultScreenValue);

    
}

function handleOperators(operator) {
    let lastChar = resultScreenValue.charAt(resultScreenValue.length - 1);
    let operators = Array.from("+-*/%");

    if((operator === "-") && ((lastChar === "*") || (lastChar === "/"))) {
        console.log("test");
    } else if(operators.includes(lastChar)) {
        resultScreenValue = resultScreenValue.slice(0, -1);
    }

    resultScreenValue += operator;
}

function handleFunctions(operator) {
    const operators = {
        "(": handleOpenParenthese,
        ")": handleCloseParenthese,
        ".": ".",
        "Enter": handleEnter,
        "Backspace": handleBackspace,
        "Delete": handleDelete,
        "default": handleDefault,
    };

    (operators[operator] || operators["default"])(operator);
}


function handleCloseParenthese() {

}


function handleOpenParenthese() {
    
}

function handleDot() {

}

function handleParentheses(operator) {

    console.log(operator);
    console.log(resultScreenValue);

    let firstCloseParentheses = resultScreenValue.indexOf("]");
    console.log(firstCloseParentheses);

    const regex = /(["("])/g;
    let parcount = [...resultScreenValue.matchAll(regex)];
    console.log(parcount);

    let firstPart;
    let secondPart;

    console.log(parenthesesOpenCount);
    console.log(parenthesesCloseCount);

    if(firstCloseParentheses > 0 && operator === "(") {
        parenthesesOpenCount++;
        firstPart = resultScreenValue.substr(0, (firstCloseParentheses));
        console.log("firstPart: " + firstPart);
        secondPart = resultScreenValue.substr(firstCloseParentheses, resultScreenValue.length);
        console.log("secondPart: " + secondPart);
        resultScreenValue = firstPart + operator + "]" + secondPart;
    } else if((firstCloseParentheses > 0) && (operator === ")")) {
        parenthesesCloseCount++;
        firstPart = resultScreenValue.substr(0, (firstCloseParentheses));
        // firstPart.charAt(firstPart.length) = operator;
        console.log("firstPart: " + firstPart);
        secondPart = resultScreenValue.substr(firstCloseParentheses + 1, resultScreenValue.length);  
        console.log("secondPart: " + secondPart);
        resultScreenValue = firstPart + operator + secondPart;
    } else {
        resultScreenValue += operator + "]";
    }


    // if(operator === "("){
    //     resultScreenValue += operator + "]";
    //     // parenthesesOpenCount++;
    //     // parenthesesOpenToggle = 1;
    // } else {
    //     // parenthesesOpenCount--;
    //     parenthesesCloseCount++;
    //     parenthesesCloseToggle = 1;
    //     resultScreenValue += operator;
    // }

}

function handleEnter() {
    clearButtonState = "AC";
    // for(let i = 0; i < parenthesesOpenCount; i++) {
    //     resultScreenValue += ")";
    // }
    console.log(resultScreenValue);
    expressionScreenValue = resultScreenValue;
    resultScreenValue = calculateSum(resultScreenValue);
}

function handleBackspace() {
    resultScreenValue = resultScreenValue.slice(0, -1);
    resultScreenValue = (resultScreenValue === "") ? "0" : resultScreenValue;
}

function handleDelete() {
    clearButtonState = "CE";
    expressionScreenValue = resultScreenValue;
    resultScreenValue = "0";
}

function handleDefault() {
    console.log("You pressed an invalid key");
}

function calculateSum(sumString) {
    let sumArray = sumString.split(/([-+*/=%()])/g).filter(el => el.length != 0);

    calculateParenthesesSum(sumArray);

    result = calculateSingleSum(sumArray)

    return String(result);
}

function calculateParenthesesSum(sumArray) {
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