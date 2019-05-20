'use strict';

export default class Term {

    /**
     * Constructor which initializes the term with empty strings
     * Possible flags:
     *  num1, operator, num2, result
     */
    constructor() {
        this.__num1 = "";
        this.__operator = "";
        this.__num2 = "";
        this.__result = "";
        this.__flag = "num1"; 
    }

    clearTerm() {
        this.__term.num1 = "";
        this.__term.operator = "";
        this.__term.num2 = "";
        this.__term.result = "";
        this.__term.flag = "num1";
    }
}