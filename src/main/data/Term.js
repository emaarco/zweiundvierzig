"use strict";

import operatorEnum from "../enum/OperatorEnum.js";

export default class Term {

    /**
     * Constructor which initializes the term with empty strings
     * Possible flags:
     *  num1, operator, number2, result, ans1, ans2
     */
    constructor() {
        this.numberOne = "";
        this.operator = "";
        this.numberTwo = "";
        this.result = "";
        this.ans = "";
        this.flag = "numberOne";
    }

    clearTerm() {
        this.numberOne = "";
        this.operator = "";
        this.numberTwo = "";
        this.result = "";
        this.flag = "numberOne";
    }

    clearAns() {
        this.ans = "";
    }

    /**
     * returns the current term as a string representation
     * @returns {String} term as a string
     */
    toString() {
        return this.numberOne + " " + operatorEnum(this.operator) + " " + this.numberTwo + " = " + this.result;
    }
}