"use strict";

import Term from "../data/Term.js";
import CalculatorLogService from "../business/CalculatorLogService.js";

export default class Calculator {
    /**
     * Constructor which initializes the needed term and an array so save the last entries
     * @param {CalculatorLogService} calculatorLogService log service
     */
    constructor(calculatorLogService) {
        if (calculatorLogService instanceof CalculatorLogService) {
            this.__calculatorLogService = calculatorLogService;
        }
    }

    /**
     * Calculate result of term depending on operator
     * Push the calculated term to log
     * Trims to 15 digits, because of precision issues when longer
     * @param {Term} term input term to be calculated
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
        this.__calculatorLogService.logCalculatedTerm(term);
    }
}
