"use strict";

export default class Calculator {
    /**
     * Constructor which initializes the needed term and an array so save the last entries
     * 
     * 
     */
    constructor() {
        // build log of last 5 terms
        this.__log = [];
        this.logCounter = 0;
    }

    /**
     * Calculate result of term depending on operator
     * Push the calculated term to log
     * Trims to 9 digits after seperator
     */
    calculate (term) {
        if (term.operator === "add") {
            term.result = (parseFloat(term.num1) + parseFloat(term.num2)).toString();
        } else if (term.operator === "multiply") {
            term.result = (parseFloat(term.num1) * parseFloat(term.num2)).toString();
        } else if (term.operator === "subtract") {
            term.result = (parseFloat(term.num1) - parseFloat(term.num2)).toString();
        } else if (term.operator === "divide") {
            term.result = (parseFloat(term.num1) / parseFloat(term.num2)).toString();
        }

        if (term.result.includes(".")) {
            const floatingLength = term.result.substring(term.result.indexOf(".") + 1).length;
            if (floatingLength > 14) {
                term.result = parseFloat(term.result).toPrecision(15);
            }
        }

        term.ans = term.result;

        this.logLastFive(term);
    }

    /**
     * Save the last 5 terms to array
     * 
     * @param {Term} term 
     */
    logLastFive(term) {
        if (this.__log.length < 5) {
            this.__log.push(term);
        } else if (this.logCounter < 5) {
            this.__log[this.logCounter] = term;
            this.logCounter += 1;
        } else {
            this.logCounter = 0;
            this.__log[this.logCounter] = term;
            this.logCounter += 1;
        }
    }

    /**
     * Save log to server
     *
     */
    save() {

    }

    /**
     * Load log from server
     * 
     */
    load() {

    }
}
