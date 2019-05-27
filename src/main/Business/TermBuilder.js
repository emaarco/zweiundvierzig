"use strict";

export default class TermBuilder {

    /**
     * Constructor which initializes the needed classes Term, Calculator and AlertWindows
     * 
     * @param {Term} term 
     * @param {Calculator} calculator 
     * @param {AlertWindow} alertWindow 
     */ 
    constructor(term, calculator, alertWindow) {
        this.__term = term;
        this.__calculator = calculator
        this.__alertWindow = alertWindow;
        this.__voidCount = 0;
        console.log("Initialized TermBuilder");
    }

    /**
     * Transforms SEP to a "."
     * Calls methods for handling the number event depending on current flag
     * 
     * @param {STRING} num number from listener
     */
    consumeNumberEvent(num) {
        console.log("consumeNumberEvent: "+num);
        if (this.__term.flag === "result") {
            this.__term.clearTerm();
        }
        if (num === "SEP") {
            num = ".";
        } else if (num === "ANS" && this.__term.ans == "") {
            this.__alertWindow.publishAnsEmpty();
        }
        switch (this.__term.flag) {
            case "num1":
                this.numEventFlagNum1(num);
                break;
            case "operator":
                this.numEventFlagOperator(num);
                break;
            case "num2":
                this.numEventFlagNum2(num);
                break;
            case "result":
                this.numEventFlagResult(num);
                break;
            default:
                console.log("Invalid flag" + this.__term.flag);
                break;
        }
    }

    /**
     * Handles number events with flag num1
     * Checks for multiple seperator
     * Checks for ANS button
     * Concats num to Term.num1
     * 
     * @param {STRING} num 
     */
    numEventFlagNum1(num) {
        if (num === "." && this.__term.num1.includes(".")) {
            this.__alertWindow.publishSeperatorAlreadySetAlert();
            this.__term.termToDisplay();
        } else if (num === "ANS") {
            if (this.__term.num1 === "") {
                this.__term.num1 = this.__term.ans;
                this.__term.termToDisplay();
            } else {
                this.__alertWindow.publishAnsAlert();
                this.__term.termToDisplay();
            }
        } else {
            this.__term.num1 += num;
            this.__term.termToDisplay();
        }
    }

    /**
     * Handles number events with flag operator 
     * Checks for ANS button
     * Concats to num2 if a operator is set
     * 
     * @param {STRING} num 
     */
    numEventFlagOperator(num) {
        if (num === "ANS") {
            if (this.__term.num2 === "") {
                this.__term.num2 = this.__term.ans;
                this.__term.termToDisplay();
            } else {
                this.__alertWindow.publishAnsAlert();
                this.__term.termToDisplay();
            }
        } else {
            this.__term.num2 += num;
            this.__term.flag = "num2";
            this.__term.termToDisplay();
        }
    }

    /**
     * Handles number events with flag num2
     * Checks for multiple seperator
     * 
     * @param {STRING} num 
     */
    numEventFlagNum2(num) {
        if (num === "." && this.__term.num2.includes(".")) {
            this.__alertWindow.publishSeperatorAlreadySetAlert();
            this.__term.termToDisplay();
        } else if (num === "ANS") {
            if (this.__term.num2 === "") {
                this.__term.num2 = this.__term.ans;
                this.__term.termToDisplay();
            } else {
                this.__alertWindow.publishAnsAlert();
                this.__term.termToDisplay();
            }
        } else {
            this.__term.num2 += num;
            this.__term.termToDisplay();
        }
    }

    /**
     * Handles number events with flag result
     * Checks for multiple seperator in result (needed when you want to add floating points to a result without clearing or using ANS)
     * If no seperator, you can add one (resets the term and sets last result as num1)
     * Checks for ANS (resets the term and sets last result as num1)
     * Clears term when inserting new numbers after a result
     * 
     * @param {STRING} num 
     */
    numEventFlagResult(num) {
        if (num === "." && this.__term.result.includes(".")) {
            this.__alertWindow.publishSeperatorAlreadySetAlert();
            this.__term.resultToDisplay();
        } else if (num === ".") {
            this.__term.clearTerm();
            this.__term.num1 = this.__term.ans + ".";
            this.__term.termToDisplay();
        } else if (num === "ANS") {
            this.__term.clearTerm();
            this.__term.num1 = this.__term.ans;
            this.__term.termToDisplay();
        } else {
            this.__term.clearTerm();
            this.__term.num1 += num;
            this.__term.termToDisplay();
        }
    }
   
    /**
     * Adds the operator from listener to term
     * Checks if the user tries to add multiple inputs consecutive times, if so only the last operator is used
     * Checks if the user already entered the second number and then rejects the new operator
     * Easteregg: if you enter minus minus you get plus
     * Change flag to operator
     * 
     * @param {*} operator operator from listener
     */
    consumeOperatorEvent(operator) {
        console.log("current operator: " + operator);
        if (operator === "divide" && parseFloat(this.__term.num1) === 0) {
            this.__alertWindow.publishDivisionZero();
            this.__term.termToDisplay();
        } else if (this.__term.num1 === ".") {
            this.__alertWindow.publishInvalidTerm();
            this.__term.termToDisplay();
        } else {
            switch (this.__term.flag) {
                case "num1":
                    this.opEventFlagNum1(operator);
                    break;
                case "operator":
                    this.opEventFlagOperator(operator);
                    break;
                case "num2":
                    this.opEventFlagNum2();
                    break;
                case "result":
                    this.opEventFlagResult(operator);
                    break;
                default:
                    console.log("invalid flag" + this.__term.flag);
                    break;
            }
        }
    }

    /**
     * Handles operator Events with flag Num1
     * If num1 populated set operator
     * If operator is already set, overwrite it
     * If num1 empty and operator "-", input negative number
     * 
     * @param {STRING} operator 
     */
    opEventFlagNum1 (operator) {
        if (this.__term.num1 != "") {
            this.__term.flag = "operator";
            this.__term.operator = operator;
            this.__term.termToDisplay();
        } else if (this.__term.num1 === "") {
            if (operator === "subtract") {
                this.__term.num1 += "-";
                this.__term.termToDisplay();
            } else {
                this.__alertWindow.publishMissingFirstNumberAlert();
                this.__term.termToDisplay();
            }
        }
    }

    /**
     * Handles operator Events with flag operator
     * 
     * 
     * @param {STRING} operator 
     */
    opEventFlagOperator (operator) {
        if (this.__term.operator === "subtract" && operator === "subtract") {
            this.__term.operator = "add";
            this.__alertWindow.publishMinusMinusIsPlusAlert();
            this.__term.termToDisplay();
        } else if (operator === "calculate") {
            this.__alertWindow.publishInvalidTerm();
            this.__term.termToDisplay();
        } else {
            this.__alertWindow.publishReplaceOperatorAlert(this.__term.operator, operator);
            this.__term.operator = operator;
            this.__term.termToDisplay();
        }
    }

    opEventFlagNum2 () {
        this.__alertWindow.publishTooManyOperatorAlert();
        this.__term.termToDisplay();
    }

    opEventFlagResult (operator) {
        if (operator === "calculate") {
            this.__term.resultToDisplay();
        } else {
            this.__term.clearTerm();
            this.__term.num1 = this.__term.ans;
            this.__term.operator = operator;
            this.__term.flag = "operator";
            this.__term.termToDisplay();
        }
    }

    /**
     * If user hits the equal sign, check if the term is valid 
     * If its Valid run the calculator
     * Change flag to result
     * 
     */
    consumeCalculateEvent() {
        if (this.__term.num1 === "") {
            this.__alertWindow.publishMissingFirstNumberAlert();
            this.__term.termToDisplay();
        } else if (this.__term.operator === "") {
            this.__alertWindow.publishMissingOperatorAlert();
            this.__term.termToDisplay();
        } else if (this.__term.num2 === "") {
            this.__alertWindow.publishMissingSecondNumberAlert();
            this.__term.termToDisplay();
        } else {
            // call calculator
            this.__calculator.calculate(this.__term);
            this.__term.flag = "result";
            this.__term.resultToDisplay();
        }
    }
    
    /**
     * Executes special events like CLEAR_ALL and CLEAR_LAST
     * CLEAR_ALL deletes the whole term
     * CLEAR_LAST deletes the last input
     * 
     * @param {*} special special buttons from listener
     */
    consumeSpecialEvent(special) {
        if (special === "CLEAR_ALL") {
            this.__term.clearTerm();
            this.__alertWindow.publishClearAllAlert();
            this.__term.termToDisplay();
            this.__alertWindow.publishClearAllAlert();
        } else if (special === "CLEAR_LAST") {
            if (this.__term.flag === "result") {
                this.__term.result =  this.__term.result.slice(0, this.__term.result.length-1);
                this.__term.ans =  this.__term.ans.slice(0, this.__term.ans.length-1);
                this.__term.resultToDisplay();
                if (this.__term.result === "") {
                    this.__term.flag = "num2";
                    this.__term.termToDisplay();
                }
            } else if (this.__term.flag === "num2") {
                this.__term.num2 = this.__term.num2.slice(0, this.__term.num2.length-1);
                if (this.__term.num2 === "") {
                    this.__term.flag = "operator";
                }
                this.__term.termToDisplay();
            } else if (this.__term.flag === "operator") {
                this.__term.operator = "";
                this.__term.flag = "num1";
                this.__term.termToDisplay();
            } else if (this.__term.flag === "num1") {
                if (this.__term.num1 === "") {
                    this.__voidCount += 1;
                    this.__alertWindow.publishEnterTheVoidAlert(this.__voidCount);
                    this.__term.termToDisplay();
                } else {
                    this.__term.num1 = this.__term.num1.slice(0, this.__term.num1.length-1);
                    this.__term.termToDisplay();
                }
            }
        }
    }
}