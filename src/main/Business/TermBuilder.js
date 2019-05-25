'use strict';
import Term from "../data/Term.js"
import Calculator from "./calculator.js";
import AlertWindow from "../gui/AlertWindow.js";

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
     * Adds the input number from listener to term (Concatenate the last input to num1 or num2)
     * Checks if the user trys to input more than 1 seperator in one number and prevents it
     * Clears term if user starts with a new input after the last result
     * Changes flag to num2 if an operator is set
     * 
     * @param {*} num number from listener
     */
    consumeNumberEvent(num) {
        console.log("consumeNumberEvent: "+num);
        if (this.__term.flag === "result") {
            this.__term.clearTerm();
        }
        if (num === "SEP") {
            num = ".";
        }
        if (num === "." && this.__term.flag === "num1" && this.__term.num1.includes(".")) {
            this.__alertWindow.publishSeperatorAlreadySetAlert();
            this.__term.termToDisplay();
        } else if (num === "." && this.__term.flag === "num2" && this.__term.num2.includes(".")) {
            this.__alertWindow.publishSeperatorAlreadySetAlert();
            this.__term.termToDisplay();
        } else if (num === "ANS") {
            // TO BE FIXED ANS SUX!
            if (this.__term.flag === "num1" || this.__term.flag === "result") {
                this.__term.num1 = this.__term.ans;
            } else if (this.__term.flag === "num2" || this.__term.flag === "operator") {
                this.__term.num2 = this.__term.ans;
                this.__term.flag = "num2";
            }
        } else {
            if (this.__term.operator === "") {
                this.__term.num1 += num;
                this.__term.termToDisplay();
            } else {
                this.__term.num2 += num;
                this.__term.flag = "num2";
                this.__term.termToDisplay();
            }
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
        if (this.__term.flag === "num1" && this.__term.num1 != "") {
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
        } else if (this.__term.flag === "operator") {
            if (this.__term.operator === "subtract" && operator === "subtract") {
                this.__term.operator = "add";
                this.__alertWindow.publishMinusMinusIsPlusAlert();
                this.__term.termToDisplay();
            } else {
                this.__alertWindow.publishReplaceOperatorAlert(this.__term.operator, operator);
                this.__term.operator = operator;
                this.__term.termToDisplay();
            }
        } else if (operator === "calculate") {
            // Marco sagen, dass er evtl das = auf ein anderes Event mappt?
            this.consumeCalculateEvent();
        } else if (this.__term.flag === "result") {
            this.__term.clearTerm();
            this.__term.num1 = this.__term.ans;
            this.__term.operator = operator;
            this.__term.flag = "operator";
            this.__term.termToDisplay();
        } else {
            this.__alertWindow.publishTooManyOperatorAlert();
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
     * TODO:
     * fix ANS clear last
     * 
     * @param {*} special special buttons from listener
     */
    consumeSpecialEvent(special) {
        if (special === "CLEAR_ALL") {
            this.__term.clearTerm();
            this.__term.termToDisplay();
        } else if (special === "CLEAR_LAST") {
            if (this.__term.flag === "result") {
                this.__term.result =  this.__term.result.slice(0, this.__term.result.length-1);
                this.__term.ans =  this.__term.ans.slice(0, this.__term.ans.length-1);
                if (this.__term.result === "") {
                    this.__term.flag = "num2";
                    this.__term.termToDisplay();
                }
            } else if (this.__term.flag === "num2") {
                this.__term.num2 = this.__term.num2.slice(0, this.__term.num2.length-1);
                if (this.__term.num2 === "") {
                    this.__term.flag = "operator";
                    this.__term.termToDisplay();
                }
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