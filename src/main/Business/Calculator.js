'use strict';

export default class Calculator {
    /**
     * Constructor which initializes the needed term and an array so save the last entries
     * 
     * 
     */
    constructor() {
        // build log of last 5 terms
        this.__log = [];
    }

    /**
     * Calculate result of term depending on operator
     * Push the calculated term to log
     */
    calculate (term) {       
        if (term.operator === 'add') {
            term.result = (parseFloat(term.num1) + parseFloat(term.num2)).toString();
        } else if (term.operator === 'multiply') {
            term.result = (parseFloat(term.num1) * parseFloat(term.num2)).toString();
        } else if (term.operator === 'subtract') {
            term.result = (parseFloat(term.num1) - parseFloat(term.num2)).toString();
        } else if (term.operator === 'divide') {
            term.result = (parseFloat(term.num1) / parseFloat(term.num2)).toString();
        }
        term.ans = term.result;
        // push to log to save the last 5 logs
        // build intelligence to containt only last 5
        this.__log.push(term);
    }
}
