const keyboard = document.querySelector('.keyboard');
const clearBtn = document.querySelector('.clear div');
const screen = document.querySelector('.screen p');

let operator = "";
let prevNum = "";
let presNum = "";
let result = null;

const handleKeyboard = (e) => {
    const content = e.target.textContent;
    if (
        operator !== "" &&
        prevNum !== "" &&
        presNum !== "" &&
        content !== "=" &&
        content !== "." &&
        isNaN(content * 1) === true
    ) {
        handleOperation();
        prevNum = result;
        presNum = "";
        operator = content;
        result = null;
    } else if (
        !isNaN(content * 1) &&
        operator === "" &&
        prevNum !== "" &&
        result === null
    ) {
        prevNum = "";
        presNum += content;
        screen.textContent = presNum;
    } else if (!isNaN(content * 1)) {
        presNum += content;
        screen.textContent = presNum;
    } else if (content === ".") {
        presNum += content;
        screen.textContent = presNum;
    } else if (content === "=") {
        if (
            operator !== "" &&
            prevNum !== "" &&
            presNum !== ""
        ) {
            handleOperation()
            operator = "";
            prevNum = result;
            presNum = "";
            result = null;
        }
    } else {
        operator = content;
        if (prevNum === "") {
            prevNum = presNum;
            presNum = "";
        }
    }
}

const handleClear = () => {
    operator = "";
    prevNum = "";
    presNum = "";
    result = null;
    screen.textContent = "0";
}

const handleOperation = () => {
    switch (operator) {
        case "+":
            result = (prevNum * 1) + (presNum * 1);
            break;
        case "-":
            result = (prevNum * 1) - (presNum * 1);
            break;
        case "*":
            result = (prevNum * 1) * (presNum * 1);
            break;
        case "/":
            result = (prevNum * 1) / (presNum * 1);
            break;
    }
    screen.textContent = Number.isInteger(result) ? result : result.toFixed(1);
}

keyboard.addEventListener('click', handleKeyboard);
clearBtn.addEventListener('click', handleClear);