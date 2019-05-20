'use strict';

class Calculator {

    constructor(term) {
        this.term = term;
        // build log of last 5 terms
        this.log = [];
    }

    /**
     * Calculate result of term
     */
    calculate () {       
        if (this.term.operator === 'add') {
            this.term.result = parseFloat(this.term.num1) + parseFloat(this.term.num2);
        } else if (this.term.operator === 'multiply') {
            this.term.result = parseFloat(this.term.num1) * parseFloat(this.term.num2);
        } else if (this.term.operator === 'subtract') {
            this.term.result = parseFloat(this.term.num1) - parseFloat(this.term.num2);
        } else if (this.term.operatoren === 'divide') {
            this.term.result = parseFloat(this.term.num1) / parseFloat(this.term.num2);
        }
        // push to log to save the last 5 logs
        // build intelligence to containt only last 5
        this.log.push(term);
        return term;
    }
}
