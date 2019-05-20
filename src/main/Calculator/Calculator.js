'use strict';

export default class Calculator {
    /**
     * Constructor which initializes the needed term and an array so save the last entries
     * 
     * @param {*} term Term to calculate
     */
    constructor(term) {
        this.__term = term;
        // build log of last 5 terms
        this.__log = [];
    }

    /**
     * Calculate result of term depending on operator
     * Push the calculated term to log
     */
    calculate () {       
        if (this.__term.operator === 'add') {
            this.__term.result = parseFloat(this.__term.num1) + parseFloat(this.__term.num2);
        } else if (this.__term.operator === 'multiply') {
            this.__term.result = parseFloat(this.__term.num1) * parseFloat(this.__term.num2);
        } else if (this.__term.operator === 'subtract') {
            this.__term.result = parseFloat(this.__term.num1) - parseFloat(this.__term.num2);
        } else if (this.__term.operatoren === 'divide') {
            this.__term.result = parseFloat(this.__term.num1) / parseFloat(this.__term.num2);
        }
        // push to log to save the last 5 logs
        // build intelligence to containt only last 5
        this.__log.push(term);
    }
}
