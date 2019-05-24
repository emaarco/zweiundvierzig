'use strict';

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
        console.log("Empty Term Initialized");
    }

    // add enum for operator
    termToDisplay() {
        let op = "";
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
        console.log("current flag:" + this.flag);
        document.getElementById("calculationArea").innerHTML = this.num1 + op + this.num2;
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