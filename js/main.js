/* Global Variable Declaration */
let expressionScreenValue = "";
let resultScreenValue = "0";
let clearButtonState = "CE";
let sumValidation = true;

/* Array Declaration */
const numbers = Array.from("1234567890");
const operators = Array.from("+-*/%");
const functions = Array.from("()=.").concat("Delete", "Backspace", "Enter");

/* Query Selectors */
const buttons = document.querySelectorAll(".jsButton");
const resultScreen = document.querySelector(".jsResultScreen");
const expressionScreen = document.querySelector(".jsExpressionScreen");

/* Event Listeners */
buttons.forEach(button => button.addEventListener("click", eventHandler));
document.addEventListener("keydown", eventHandler);

/* Functions */

/**
 * Gets called when a event happens, this either can be a keyboard press (keydown) or an button click (click).
 *
 * @param {*} e 
 */
function eventHandler(e) {
    let keyValue = e.key; //see e nodelist, e.key = equal to the value of the key that was pressed
    let buttonValue = e.target.value; //see e nodelist, e.target.value = equal to the value of the button that was clicked

    let inputValue = (e.type === "click") ? buttonValue : keyValue; //decide if input was a mouse click or an keyboard click

    // add a n, o or an f to the inputValue so later handleValues() can decide if the inputValue is a number, an operator or a function
    inputValue = (numbers.includes(inputValue)) ? "n" + inputValue : 
                 (operators.includes(inputValue)) ? "o" + inputValue : 
                 (functions.includes(inputValue)) ? "f" + inputValue : "";

    handleInputValue(inputValue);

    updateClearButton(clearButtonState);
    updateExpressionScreen(expressionScreenValue);
    updateResultScreen(resultScreenValue);
}

/**
 * This function handles the inputValue from that gets passed by the eventHandler.
 * 
 * @param {*} input 
 */
function handleInputValue(input) {
    let type = input.charAt(0); //type is n, o or f
    let operandors = input.substr(1, input.length); //operandors is a collective name of operators and operands so this value can either be an operator or an operand

    //This is equivalent to a switch-case see object literals
    const value = {
        "o": handleOperators,
        "n": handleOperands, 
        "f": handleFunctions,
        "default": handleDefault, 
    };

    (value[type] || value["default"])(operandors);
} 
/**
 * When the inputValue is equal to an operand this function gets called, it adds the inputValue to the resultScreenValue.
 * @param {*} operand 
 */
function handleOperands(operand) {
    sumValidation = true; //Validates if the sum can be processed see handleEnter()

    checkforZero(); //see function
    checkforPercent(); //see function

    resultScreenValue += operand; 
}

/**
 * When the inputValue is equal to an operator this function gets called.
 * @param {*} operator 
 */
function handleOperators(operator) {
    let lastChar = resultScreenValue.charAt(resultScreenValue.length - 1); //get the last character from the resultScreenValue

    sumValidation = false;

    //Conditions that decide what has to happen to resultScreenValue before operator gets added
    if((operator === "-") && ((lastChar === "*") || (lastChar === "/") || (lastChar === "("))) {
        resultScreenValue += operator;
    } else if(operators.includes(lastChar)) {
        resultScreenValue = resultScreenValue.slice(0, -1);
        resultScreenValue += operator;
    } else if(lastChar != "("){
        resultScreenValue += operator;
    }
}

/**
 * When the inputValue is equal to a function this function gets called.
 * @param {*} operator 
 */
function handleFunctions(operator) {
    const operators = {
        "(": handleOpenParenthese,
        ")": handleCloseParenthese,
        ".": handleDot,
        "Enter": handleEnter,
        "Backspace": handleBackspace,
        "Delete": handleDelete,
        "default": handleDefault,
    };

    (operators[operator] || operators["default"])(operator);
}
        
/**
 * Handler for when the input is equal to a closing parenthese
 * @param {*} operator 
 */
function handleCloseParenthese(operator) {
    let lastChar = resultScreenValue.charAt(resultScreenValue.length - 1);

    //Checks if the last character from resultScreenValue is equal to an operator
    if(operators.includes(lastChar)) {
        sumValidation = false; 
    } else {
        sumValidation = true;
        resultScreenValue += operator;
    }
}

/**
 * Handler for when the input is equal to an open parenthese
 * @param {*} operator 
 */
function handleOpenParenthese(operator) {
    let lastChar = resultScreenValue.charAt(resultScreenValue.length - 1);
    sumValidation = false;

    //Checks if the last character from resultScreenValue is equal to a number
    if(numbers.includes(lastChar)) {
        resultScreenValue += "*" + operator;
    } else {
        resultScreenValue += operator;
    }
}

/**
 * Handler for when the input is equal to a dot
 * @param {*} operator 
 */
function handleDot(operator) {
    checkforZero();
    let sumArray = resultScreenValue.split(/([-+*/=%()])/g).filter(el => el.length != 0); //splits the resultScreenValue on given regex
    let lastNumbers = sumArray[sumArray.length - 1]; //Takes the last element from sumArray

    //Checks if lastNumbers has doesn't includes a dot
    if(!lastNumbers.includes(".")) {
        resultScreenValue += operator;
    }
}

/**
 * Handler for when the input is equal to enter
 */
function handleEnter() {
    clearButtonState = "AC";

    checkforParentheses();
    
    //Checks if the sum is valid, if so the sum can be calculated
    if(sumValidation === true) {
        expressionScreenValue = resultScreenValue;
        resultScreenValue = calculateSum(resultScreenValue);
    }
}

/**
 * Handler for when the input is equal to backspace
 */
function handleBackspace() {
    let lastChar = resultScreenValue.charAt(resultScreenValue.length - 1);

    resultScreenValue = resultScreenValue.slice(0, -1);  //Deletes the last character from the resultScreenValue string
    resultScreenValue = (resultScreenValue === "") ? "0" : resultScreenValue; //Checks if resultScreenValue is empty if so resultScreenValue is equal to 0

        //Checks if the deleted char was an open parenthese if so the sum validator has to be set to true
        if(lastChar === "(") {
        sumValidation = true;
    }
}

/**
 *  Handler for when the input is equal to delete
 */
function handleDelete() {
    clearButtonState = "CE";
    sumValidation = true;
    expressionScreenValue = resultScreenValue; //pushes the resultScreenValue to the expressionScreenValue
    resultScreenValue = "0"; //Resets resultScreenValue (to 0)
}

function handleDefault() {
    console.log("You pressed an invalid key");
}   

/**
 * Checks if resultScreenValue is equal to 0 if so the resultScreenValue will be set to empty
 */
function checkforZero() {
    if(resultScreenValue === "0") {
        resultScreenValue = "";
    }
}

/**
 * Checks if the last character was an percentage if so a multiplier gets added
 */
function checkforPercent() {
    let lastChar = resultScreenValue.charAt(resultScreenValue.length - 1);

    if(lastChar === "%") {
        resultScreenValue += "*";
    }
}
/**
 * Checks if resultScreenValue contains unmatching parentheses if so the sumValidation gets set to false
 */
function checkforParentheses() {
    let parenthesesOpenCount = 0;
    let parenthesesCloseCount = 0;

    for(let i = 0; i < resultScreenValue.length; i++) {
        console.log(resultScreenValue.charAt(i));

        if(resultScreenValue.charAt(i) === "(") {
            parenthesesOpenCount++;
        } else if(resultScreenValue.charAt(i) === ")") {
            parenthesesCloseCount++;
        }
    }

    if(parenthesesCloseCount != parenthesesOpenCount) {
        sumValidation = false;
    }
}

/**
 * Gets called when enter is pressed and the sum is valid. The function calculates the sum given up by the user
 * @param {*} sumString 
 */
function calculateSum(sumString) {
    let sumArray = sumString.split(/([-+*/=%()])/g).filter(el => el.length != 0); //Split the sum on the regex

    checkforNegative(sumArray); //see checkForNegative

    calculateParenthesesSum(sumArray); //see calculateParenthesesSum

    result = calculateSingleSum(sumArray)
    result = Math.round(result * 100000)/100000; //Round result to 5 decimals

    return String(result);
}

/**
 * Checks if the sumArray includes a negative number if so it modifies the array
 * @param {*} sumArray 
 */
function checkforNegative(sumArray) {
    for (let i = 0; i < sumArray.length; i++) {
        //Checks if there is a minus (-) with an operator in front of it
        if(operators.includes(sumArray[i]) && (sumArray[i+1] === "-")) {
            sumArray[i+2] = "-" + sumArray[i+2];
            sumArray.splice(i + 1, 1); 
        } else if(sumArray[i] === "-"){ //Checks if the first value of sumArray is a minus (this also can be placed outside of the for loop?) 
            sumArray[i+1] = "-" + sumArray[i+1];
            sumArray.splice(i, 1);
        }
    }
}

/**
 * Checks if sumArray contains any parentheses, if so it calculates them and inserts them back in the right place of sumArray
 * @param {*} sumArray 
 */
function calculateParenthesesSum(sumArray) {
    let sum;
    let i = 0;
    let parenthesesIndex = sumArray.map((elm, idx) => (elm === "(" || elm === ")") ? idx : "").filter(String); //Checks if sumArray contains any Parentheses

    while (parenthesesIndex.length > 0) {

        parenthesesIndex = sumArray.map((elm, idx) => (elm === "(" || elm === ")") ? idx : "").filter(String); //Keep on checking because the parentheses gets deleted when the sum is calculated

        if(i >= parenthesesIndex.length) {
            i = 0;
        }

        if((sumArray[parenthesesIndex[i]] === "(") && (sumArray[parenthesesIndex[i + 1]] === ")")) { //Check for an parentheses pair
            sum = sumArray.slice(parenthesesIndex[i], parenthesesIndex[i + 1] + 1); // optional method: sum = sumArray.splice(parenthesisIndex[i], ((parenthesisIndex[i + 1] - parenthesisIndex[i]) + 1));
            sum = sum.slice(1, -1); //Slice of the parentheses
            calculateSingleSum(sum); //calculate the sum
            sumArray.splice(parenthesesIndex[i], (parenthesesIndex[i + 1] - parenthesesIndex[i] + 1), String(sum[0])); //add result of the sum back on old place, this is done by using splice
        }

        i++
    }
}

/**
 * Calculates a given sum, think about 1*2 or 3.789/6.4. So a sum with 2 operands and an operator
 * @param {*} sumArray 
 */
function calculateSingleSum (sumArray) {
    let operators = sumArray.map((elm) => (elm === "+" || elm === "-" || elm === "*" || elm === "/" || elm === "%") ? elm : "").filter(String); //Get al operators from the sumArray

    if (operators.length === 0) { //If there is no operator 
        result = parseFloat(sumArray[0]); //Return input
    } else {
        //Loops through for amount of operators, this decide how many operation must be done
        for (i = 0; i < operators.length; i++) {
            if(operators[i] === "%") { //if the operator is a percent only 2 values get passes like 100 and %
                result = operate(parseFloat(sumArray[0]), sumArray[1]);
                sumArray.splice(0, 2, String(result)); // has to be variable because of parenthesis
            }else {
                result = operate(parseFloat(sumArray[0]), sumArray[1], parseFloat(sumArray[2]));
                sumArray.splice(0, 3, String(result)); // has to be variable because of parenthesis
            }
        };
    }

    return String(result);
}

/**
 * Decides which operation has to be done
 * @param {*} num1 
 * @param {*} operator 
 * @param {*} num2 
 */
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

/* Button Updaters */
const updateClearButton = (buttonValue) => buttons[30].innerHTML = buttonValue;

/* Math Operations */
const add      = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide   = (a, b) => a / b; //Evt. add error detection, can't divide by 0