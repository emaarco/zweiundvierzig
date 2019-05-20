'use strict';

export default class TermBuilder {

    /**
     * Constructor which initializes the needed classes Term, Calculator and AlertWindows
     * 
     * @param {*} term 
     * @param {*} calculator 
     * @param {*} alertWindow 
     */ 
    constructor(term, calculator, alertWindow) {
        this.__term = term;
        this.__calculator = calculator
        this.__alertWindow = alertWindow;
    }


    /**
     * TODO: 
     * add proper return to display > need marco
     * insert alerts into alertWindow class:
     *      publishSeperatorAlreadySetAlert
     *      publishMinusMinusIsPlusAlert
     *      publishReplaceOperatorAlert ("Replaced operator {} with {}", this.__term.operator, operator); // insert mapping from add to + etc
     *      publishTooManyOperatorAlert
     *      publishMissingFirstNumberAlert
     *      publishMissingOperatorAlert
     *      publishMissingSecondNumberAlert
     *      publishEnterTheVoidAlert       Build in easteregg for EnterTheVoid
     * 
     */

    /**
     * Adds the input number from listener to term (Concatenate the last input to num1 or num2)
     * Checks if the user trys to input more than 1 seperator in one number and prevents it
     * Clears term if user starts with a new input after the last result
     * Changes flag to num2 if an operator is set
     * 
     * @param {*} num number from listener
     */
    consumeNumberEvent(num) {
        if (this.__term.flag === "result") {
            this.__term.clearTerm();
        }
        if (this.__term.num1.slice(-1) === "." || this.__term.num2.slice(-1)) {
            this.__alertWindow.publishSeperatorAlreadySetAlert();
        } else if (num === "." && this.__term.flag === "num1" && this.__term.num1.includes(".")) {
            this.__alertWindow.publishSeperatorAlreadySetAlert();
        } else if (num === "." && this.__term.flag === "num2" && this.__term.num2.includes(".")) {
            this.__alertWindow.publishSeperatorAlreadySetAlert();
        } else {
            if (operator === "") {
                this.__term.num1.concat(num);
            } else {
                this.__term.num2.concat(num);
                this.__term.flag = "num2";
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
        if (this.__term.flag === "num1") {
            this.__term.flag = "operator";
            if (this.__term.operator === "subtract" && operator === "subtract") {
                this.__term.operator = "add";
                this.__alertWindow.publishMinusMinusIsPlusAlert();
            } else if (this.__term.operator !== "") {
                this.__term.operator = operator;
                this.__alertWindow.publishReplaceOperatorAlert();
            } else {
                this.__term.operator = operator;
            }
        } else {
            this.__alertWindow.publishTooManyOperatorAlert();
        }       
    }

    /**
     * If user hits the equal sign, check if the term is valid 
     * If its Valid run the calculator
     * Change flag to result
     * 
     * @param {*} calculate equal sign from listener
     */
    consumeCalculateEvent(calculate) {
        if (this.__term.num1 === "") {
            this.__alertWindow.publishMissingFirstNumberAlert();
        } else if (this.__term.operator === "") {
            this.__alertWindow.publishMissingOperatorAlert();
        } else if (this.__term.num2 === "") {
            this.__alertWindow.publishMissingSecondNumberAlert();
        } else {
            // call calculator
            calculator.calculate(this.__term);
            this.__term.flag = "result";
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
        } else if (special === "CLEAR_LAST") {
            if (this.__term.flag === "result") {
                this.__term.result =  this.__term.result.slice(0, this.__term.result.length-1);
                if (this.__term.result === "") {
                    this.__term.flag === "num2";
                }
            } else if (this.__term.flag === "num2") {
                this.__term.num2 = this.__term.num2.slice(0, this.__term.num2.length-1);
                if (this.__term.num2 === "") {
                    this.__term.flag === "operator";
                }
            } else if (this.__term.flag === "operator") {
                this.__term.operator = "";
                this.__term.flag = "num1";
            } else if (this.__term.flag === "num1") {
                if (this.__term.num1 === "") {
                    this.__alertWindow.publishEnterTheVoidAlert();
                } else {
                    this.__term.num1 = this.__term.num1.slice(0, this.__term.num1.length-1);
                }
            }
        }
    }
}