function operate(sum) {
    let result = stringValue.split(/([-+x/=])/g).filter(el => el.length != 0);
     // let result = stringValue.match(/^[0-9]*$/gm);
     console.log(stringValue);
     console.log(result);

    console.log(sum);
    let joinedArray;
    let indexOfArray;
    let includesArray;
    let filterArray;
    let spliceArray;
    let testArray = [];
    let mapArray;
    let operatorArray = [];
    let numberArray = [];
    let indexArray;

    console.log("normalArray");
    console.log(sum);
    joinedArray = memExpArray.join("");
    console.log("joinedArray");
    console.log(joinedArray);
    indexOfArray = memExpArray.indexOf("+");
    indexOfArray = memExpArray.indexOf("+");
    console.log("indexOfArray");
    console.log(indexOfArray);
    // spliceArray = memExpArray.splice(indexOfArray, 1);
    // console.log("spliceArray");
    // console.log(spliceArray);
    // console.log(memExpArray);
    let operators = ["+", "-", "/", "x", "="];

    // filterArray = memExpArray.findIndex(operator => operators.includes(operator));
    filterArray = memExpArray.map(operator => memExpArray.indexOf(operator, 0));
    console.log("filterArray");
    console.log(filterArray);
    console.log(memExpArray);

    // let indexes = memExpArray.map((el, idx) => operators.includes(el))

    // for(let i = 0; i <= memExpArray.length; i++) {
        
    // }

    // if(filterArray)

    // while

    // console.log(memExpArray);

    // indexOfArray = memExpArray.indexOf("+");
    // indexArray = memExpArray.filter(operator => operators.indexOf(operator));
    // console.log("indexArray");
    // console.log(indexArray);
    
    // for(let i = 0; i <= memExpArray)

    let indexes = memExpArray.map((elm, idx) => (elm === "+" || elm === "-" || elm === "x" || elm === "/" || elm === "=") ? idx : "").filter(String);
    // indexes.unshift(0);
    console.log("indexes");
    console.log(indexes);

    for(let i = 0; i < indexes.length; i++) {
        // console.log(i);
        console.log(numberArray.length);
        console.log(indexes[i]);
        // console.log(indexes[i + 1]);
       

        numberArray[i] = memExpArray.splice(0 + numberArray.length, indexes[i]);
        // numberArray[i+1] = memExpArray.splice(indexes[i], 5);
        console.log(numberArray);

        // testArray = memExpArray.splice((indexes[i] + 1), memExpArray.length);
        // console.log(testArray);
        // operatorArray = memExpArray.pop();
        // console.log(operatorArray);
        // numberArray = memExpArray.join("");
        // console.log(numberArray);
    }

    // console.log(numberArray);

    // testArray = memExpArray.splice((indexOfArray + 1), memExpArray.length);
 
    // console.log("testArray");
    // console.log(testArray);
    // console.log(numberArray);
    // console.log(operatorArray);
    // console.log(memExpArray);
   



    // switch(operator) {
    //     case "+": add(a, b); break;
    //     case "-": subtract(a, b); break;
    //     case "x": multiply(a, b); break;
    //     case "/": divide(a, b); break;
    // }
}


switch(buttonValue) {
    case "=": updateClearButton("AC");
              result = calculateSum(expression);
              updateExpressionScreen(expression);
              updateResultScreen(result);
              expression = result;
              break;
    case "AC": updateClearButton("CE");
               expression = expression.slice(0, -3);
               updateResultScreen(expression);
               break;
    case "CE": console.log("CE is pressed");
               expression = expression.slice(0, -3);
               break;
    default: updateClearButton("CE");
             updateResultScreen(expression);
             break;
}   





while



while parenthesisindex > 0 {
    if i === parenthesesindex.length {
        i = 0
    }

    if((sumarray[parenthesesIndex[i]] === "(") && (sumarray[parenthesesIndex[i]] === ")") {
        //reken som uit tussen deze twee en kreeg waarde terug
        //stop de waarde terug op oude positie en verwijder ook de oude haakjes 
        //verwijder ook de waarde van de haakjes uit de parenthesisIndex array
    } 
    
    i++
}

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
    //            break;0
    default:   if (expressionValue.charAt(0) === "0") {
                    expressionValue = singleValue
                } else {    
                    expressionValue += singleValue;
                }
               clearButtonState = "CE";
               break;
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

}

   // for(let i = 0; i < parenthesesOpenCount; i++) {
    //     resultScreenValue += ")";
    // }