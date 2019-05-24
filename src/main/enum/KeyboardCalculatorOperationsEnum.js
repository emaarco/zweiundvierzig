'use strict'

const validNumbers = ["0","1","2","3","4","5","6","7","8","9"];

/***
 * An enum representation containing all valid Calculator-Operations
 * which can be retrieved by the keyboard.
 */
const keyboardCalculatorOperationsEnum = {
    number: validNumbers,
    operator: ["+","-","*","/","=", "Enter"],
    seperator: [".", ","],
    specialOps: ["Backspace"],
    onOff: ["Escape"]
};

export default keyboardCalculatorOperationsEnum;