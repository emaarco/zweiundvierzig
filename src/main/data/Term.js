'use strict';

import operatorEnum from "../enum/OperatorEnum.js";

export default class Term {

    /**
     * Constructor which initializes the term with empty strings
     * Possible flags:
     *  num1, operator, num2, result
     */
    constructor() {
        this.num1 = "";
        this.operator = "";
        this.num2 = "";
        this.result = "";
        this.ans = "";
        this.flag = "num1"; 
        console.log("Empty Term Initialized");
    }

    termToDisplay() {
        console.log("current flag:" + this.flag);
        document.getElementById("calculationArea").innerHTML = this.num1 + operatorEnum(this.operator) + this.num2;
    }

    resultToDisplay() {
        console.log("current flag:" + this.flag);
        document.getElementById("calculationArea").innerHTML = this.result;
    }

    clearTerm() {
        this.num1 = "";
        this.operator = "";
        this.num2 = "";
        this.result = "";
        this.flag = "num1";
    }
}