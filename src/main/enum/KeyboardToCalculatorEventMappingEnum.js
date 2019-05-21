'use strict'

/***
 * An enum representation containing all keyboard events
 * which require a mapping from key to calculator-Event
 */
const keyboardToCalculatorEventMappingEnum = {
    "Backspace": "CLEAR_LAST",
    "Enter": "calculate",
    "Escape": "ON_OFF",
    ".": ",",
    "+": "add", 
    "-": "subtract",
    "/": "divide",
    "*": "multiply",
    "=": "calculate"
}

export default keyboardToCalculatorEventMappingEnum;