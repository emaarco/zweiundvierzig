"use strict";

import operatorEnum from "../enum/OperatorEnum.js";

export default class Term {

    /**
     * Constructor which initializes the term with empty strings
     * Possible flags:
     *  num1, operator, num2, result, ans1, ans2
     */
    constructor() {
        this.num1 = "";
        this.operator = "";
        this.num2 = "";
        this.result = "";
        this.ans = "";
        this.flag = "num1"; 
    }

    // add enum for operator
    termToDisplay() {
        let op = "";
        // add enum function
        switch (this.operator) {
            case "add":
                op = "+";
                break;
            case "subtract":
                op = "-";
                break;
            case "divide":
                op = "/";
                break;
            case "multiply":
                op = "*";
                break;
            default:
                break;
        }
        document.getElementById("calculationArea").innerHTML = this.num1 + op + this.num2;
    }

    resultToDisplay() {
        document.getElementById("calculationArea").innerHTML = this.result;
    }

    clearTerm() {
        this.num1 = "";
        this.operator = "";
        this.num2 = "";
        this.result = "";
        this.flag = "num1";
    }

    clearAns() {
        this.ans = "";
    }

    /**
     * returns the current term as a string representation
     * @returns {String} term as a string
     */
    toString() {
        return this.num1 + " " + operatorEnum(this.operator) + " " + this.num2 + " = " + this.result;
    }
}