"use strict";

import operatorEnum from "../enum/OperatorEnum.js";

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
     * Trims to 15 digits, because of precision issues when longer
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
     * @param {Term} term 
     */
    logLastFive(term) {
        if (this.__log.length < 5) {
            this.__log.push(term);
            this.createListItem(term);
        } else if (this.logCounter < 5) {
            this.__log[this.logCounter] = term;
            this.logCounter += 1;
            this.modifyListItem(term);
        } else {
            this.logCounter = 0;
            this.__log[this.logCounter] = term;
            this.logCounter += 1;
            this.modifyListItem(term);
        }
    }

    /**
     * Returns the complete term as a string
     * @param {Term} term 
     */
    termAsString(term) {
        return term.num1 + " " + operatorEnum(term.operator) + " " + term.num2 + " = " + term.result;
    }
 
    /**
     * Create the HTML list items
     * Set termAsString as text
     * Set class "list-group-item"
     * set id log+length
     * @param {Term} term 
     */
    createListItem(term) {
        const node = document.createElement("li");
        const textnode = document.createTextNode(this.termAsString(term));
        node.appendChild(textnode);
        node.className = "list-group-item";
        node.id = "log" + (this.__log.length);
        document.getElementById("calculationLogList").appendChild(node);
    }

    /**
     * Change text of log+length element to new term
     * @param {Term} term 
     */
    modifyListItem(term) {
        const logid = "log" + this.logCounter;
        const node = document.getElementById(logid);
        node.innerText = this.termAsString(term);
    }

    /**
     * Save log to server
     * EXAMPLE CODE FROM exam.md NOT TESTED
     */
    save(data, callback) {
        setTimeout(() => {
            let err = null;
    
            try {
                localStorage.setItem("myData", JSON.stringify(data));
            } catch (e) {
                err = e;
            }
            callback(err);
        }, 1000); // fake a response delay with 1000ms    
    }

    /**
     * Load log from server
     * EXAMPLE CODE FROM exam.md NOT TESTED
     */
    load(callback) {
        setTimeout(() => {
            let err = null;
            let data;
    
            try {
                data = JSON.parse(localStorage.getItem("myData"));
            } catch (e) {
                err = e;
            }
            callback(err, data);
        }, 1000); // fake a response delay with 1000ms    
    }
}
