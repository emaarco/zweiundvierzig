"use strict";

import Term from "../data/Term.js";
import CalculatorWindow from "../gui/CalculatorWindow.js";
import Calculator from "./Calculator.js";
import AlertWindow from "../gui/AlertWindow.js";

export default class TermBuilder {

    /**
     * Constructor which initializes the needed classes Term, Calculator and AlertWindows
     * @param {Term} term 
     * @param {Calculator} calculator 
     * @param {AlertWindow} alertWindow 
     * @param {CalculatorWindow} calculatorWindow 
     */
    constructor(term, calculator, alertWindow, calculatorWindow) {
        this.__term = term;
        this.__calculator = calculator
        this.__alertWindow = alertWindow;
        this.__calculatorWindow = calculatorWindow;
        this.__voidCount = 0;
    }

    /***************************************************************************************/
    /************************************ NUMBER EVENTS ************************************/

    /**
     * Transforms SEP to a "."
     * Calls methods for handling the number event depending on current flag
     * @param {String} numberToBeAdded number retrieved from listener
     */
    consumeNumberEvent(numberToBeAdded) {
        this.__alertWindow.publishValidCalculationAlert();
        if (numberToBeAdded === "SEP") {
            numberToBeAdded = ".";
        } else if (numberToBeAdded === "ANS" && this.__term.ans == "") {
            this.__alertWindow.publishAnsEmpty();
        }
        switch (this.__term.flag) {
            case "numberOne":
                this.tryToAddNumberToNumberOne(numberToBeAdded);
                break;
            case "operator":
                this.tryToAddNumberAfterOperator(numberToBeAdded);
                break;
            case "numberTwo":
                this.tryToAddNumberToNumberTwo(numberToBeAdded);
                break;
            case "result":
                this.tryToAddNumberToResult(numberToBeAdded);
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
     * @param {String} numberToBeAdded 
     */
    tryToAddNumberToNumberOne(numberToBeAdded) {
        if (numberToBeAdded === "." && this.__term.numberOne.includes(".")) {
            this.__alertWindow.publishSeperatorAlreadySetAlert();
        } else if (numberToBeAdded === "ANS") {
            if (this.__term.ans.includes(".") && this.__term.numberOne.includes(".")) {
                this.__alertWindow.publishAnsAlert();
            } else {
                this.__term.numberOne += this.__term.ans;
                this.__term.flag = "numberOne";
            }
        } else {
            this.__term.numberOne += numberToBeAdded;
        }
        this.__calculatorWindow.publishCalculationToDisplay(this.__term, false);
    }

    /**
     * Handles number events with flag operator 
     * Checks for ANS button
     * Concats to num2 if a operator is set
     * @param {String} numberToBeAdded 
     */
    tryToAddNumberAfterOperator(numberToBeAdded) {
        if (numberToBeAdded === "ANS") {
            if (this.__term.ans.includes(".") && this.__term.numberTwo.includes(".")) {
                this.__alertWindow.publishAnsAlert();
            } else {
                this.__term.numberTwo += this.__term.ans;
                this.__term.flag = "numberTwo";
            }
        } else {
            this.__term.numberTwo += numberToBeAdded;
            this.__term.flag = "numberTwo";
        }
        this.__calculatorWindow.publishCalculationToDisplay(this.__term, false);
    }

    /**
     * Handles number events with flag num2
     * Checks for multiple seperator
     * @param {String} numberToBeAdded 
     */
    tryToAddNumberToNumberTwo(numberToBeAdded) {
        if (numberToBeAdded === "." && this.__term.numberTwo.includes(".")) {
            this.__alertWindow.publishSeperatorAlreadySetAlert();
        } else if (numberToBeAdded === "ANS") {
            if (this.__term.ans.includes(".") && this.__term.numberTwo.includes(".")) {
                this.__alertWindow.publishAnsAlert();
            } else {
                this.__term.numberTwo += this.__term.ans;
                this.__term.flag = "numberTwo";
            }
        } else {
            this.__term.numberTwo += numberToBeAdded;
        }
        this.__calculatorWindow.publishCalculationToDisplay(this.__term, false);
    }

    /**
     * Handles number events with flag result
     * Checks for multiple seperator in result (needed when you want to add floating points to a result without clearing or using ANS)
     * If no seperator, you can add one (resets the term and sets last result as num1)
     * Checks for ANS (resets the term and sets last result as num1)
     * Clears term when inserting new numbers after a result
     * @param {String} numberToBeAdded 
     */
    tryToAddNumberToResult(numberToBeAdded) {
        let isResult = false;
        if (numberToBeAdded === "." && this.__term.result.includes(".")) {
            this.__alertWindow.publishSeperatorAlreadySetAlert();
            isResult = true;
        } else if (numberToBeAdded === ".") {
            this.__term.clearTerm();
            this.__term.numberOne = this.__term.ans + ".";
        } else if (numberToBeAdded === "ANS") {
            this.__term.clearTerm();
            this.__term.numberOne = this.__term.ans;
        } else {
            this.__term.clearTerm();
            this.__term.numberOne += numberToBeAdded;
        }
        this.__calculatorWindow.publishCalculationToDisplay(this.__term, isResult);
    }
   
    /***************************************************************************************/
    /********************************** OPERATOR EVENTS ************************************/

    /**
     * Adds the operator from listener to term
     * Checks if the user tries to add multiple inputs consecutive times, if so only the last operator is used
     * Checks if the user already entered the second number and then rejects the new operator
     * Easteregg: if you enter minus minus you get plus
     * Change flag to operator
     * @param {String} operatorToBeAdded operator from listener
     */
    consumeOperatorEvent(operatorToBeAdded) {
        if (operatorToBeAdded === "divide" && parseFloat(this.__term.numberOne) === 0) {
            this.__alertWindow.publishDivisionZero();
        } else if (this.__term.numberOne === ".") {
            this.__alertWindow.publishInvalidTerm();
        } else {
            switch (this.__term.flag) {
                case "numberOne":
                    this.tryToAddOperatorAfterNumberOne(operatorToBeAdded);
                    break;
                case "operator":
                    this.tryToAddOperatorForExistingOperator(operatorToBeAdded);
                    break;
                case "numberTwo":
                    this.tryToAddOperatorAfterNumberTwo(operatorToBeAdded);
                    break;
                case "result":
                    this.tryToAddOperatorAfterResult(operatorToBeAdded);
                    break;
                default:
                    console.log("invalid flag" + this.__term.flag);
                    break;
            }
        }
        this.__calculatorWindow.publishCalculationToDisplay(this.__term, false);
    }

    /**
     * Handles operator Events with flag Num1
     * If num1 populated set operator
     * If operator is already set, overwrite it
     * If num1 empty and operator "-", input negative number
     * @param {String} operatorToBeAdded 
     */
    tryToAddOperatorAfterNumberOne(operatorToBeAdded) {
        if (this.__term.numberOne != "") {
            this.__term.flag = "operator";
            this.__term.operator = operatorToBeAdded;
        } else if (this.__term.numberOne === "") {
            if (operator === "subtract") {
                this.__term.numberOne += "-";
            } else {
                this.__alertWindow.publishMissingFirstNumberAlert();
            }
        }
    }

    /**
     * Handles operator Events with flag: operator
     * - and - is +
     * replaces last operator with current operator     
     * @param {String} operatorToBeAdded 
     */
    tryToAddOperatorForExistingOperator(operatorToBeAdded) {
        if (this.__term.operator === "subtract" && operatorToBeAdded === "subtract") {
            this.__term.operator = "add";
            this.__alertWindow.publishMinusMinusIsPlusAlert();
        } else {
            this.__alertWindow.publishReplaceOperatorAlert(this.__term.operator, operatorToBeAdded);
            this.__term.operator = operatorToBeAdded;
        }
    }

    /**
     * Handles operator events with flag: num2
     * if an operator is pressed and there is a num2, calculate
     * @param {String} operatorToBeAdded 
     */
    tryToAddOperatorAfterNumberTwo(operatorToBeAdded) {
        this.consumeCalculateEvent();
        this.__term.clearTerm();
        this.__term.numberOne = this.__term.ans;
        this.__term.operator = operatorToBeAdded;
        this.__term.flag = "operator";
    }

    /**
     * Handles operator events with flag: result
     * if an operator is pressed and there is already a result, set result as num1 and insert pressed operator
     * @param {String} operatorToBeAdded 
     */
    tryToAddOperatorAfterResult(operatorToBeAdded) {
        this.__term.clearTerm();
        this.__term.numberOne = this.__term.ans;
        this.__term.operator = operatorToBeAdded;
        this.__term.flag = "operator";
    }

    /***************************************************************************************/
    /*************************************** CONSUME CALCULATE EVENT ***********************/

    /**
     * If user hits the equal sign, check if the term is valid 
     * If its Valid run the calculator
     * Change flag to result
     */
    consumeCalculateEvent() {
        let isResult = false;
        if (this.__term.numberOne === "" || this.__term.numberOne === ".") {
            this.__alertWindow.publishMissingFirstNumberAlert();
        } else if (this.__term.operator === "") {
            this.__alertWindow.publishMissingOperatorAlert();
        } else if (this.__term.numberTwo === "" || this.__term.numberTwo === ".") {
            this.__alertWindow.publishMissingSecondNumberAlert();
        } else {
            this.__calculator.calculate(this.__term);
            this.__term.flag = "result";
            isResult = true;
        }
        this.__calculatorWindow.publishCalculationToDisplay(this.__term, isResult);
    }
    
    /***************************************************************************************/
    /************************************ SPECIAL EVENTS ***********************************/


    /**
     * Executes special events like CLEAR_ALL and CLEAR_LAST
     * CLEAR_ALL deletes the whole term
     * CLEAR_LAST deletes the last input
     * @param {String} specialEvent special buttons from listener
     */
    consumeSpecialEvent(specialEvent) {
        if (specialEvent === "CLEAR_ALL") {
            this.__term.clearTerm();
            this.__alertWindow.publishClearAllAlert();
            this.__calculatorWindow.publishCalculationToDisplay(this.__term, true);
        } else if (specialEvent === "CLEAR_LAST") {
            switch (this.__term.flag) {
                case "result":
                    this.removeLastDigitFromResult();
                    break;
                case "numberTwo":
                    this.removeLastDigitFromNumberTwo();
                    break;
                case "operator":
                    this.removeLastDigitFromOperator();
                    break;
                case "numberOne":
                    this.removeLastDigitFromNumberOne();
                    break;
                default:
                    console.error("Invalid flag: {} ", this.__term.flag);
                    break;
            }
        }
    }

    /**
     * handles special event "Clear Last" with flag: result
     * delete the last digit of __term.result and .ans 
     */
    removeLastDigitFromResult() {
        let isResult = true;
        this.__term.result =  this.__term.result.slice(0, this.__term.result.length-1);
        this.__term.ans = this.__term.ans.slice(0, this.__term.ans.length-1);
        if (this.__term.result === "") {
            this.__term.flag = "numberTwo";
            isResult = false;
        }
        this.__calculatorWindow.publishCalculationToDisplay(this.__term, isResult);
    }

    /**
     * handles special event "Clear Last" with flag: result
     * delete the last digit of __term.num2 
     */
    removeLastDigitFromNumberTwo() {
        this.__term.numberTwo = this.__term.numberTwo.slice(0, this.__term.numberTwo.length-1);
        if (this.__term.numberTwo === "") {
            this.__term.flag = "operator";
        }
        this.__calculatorWindow.publishCalculationToDisplay(this.__term, false);
    }

    /**
     * handles special event "Clear Last" with flag: result
     * delete __term.operator
     */
    removeLastDigitFromOperator() {
        this.__term.operator = "";
        this.__term.flag = "numberOne";
        this.__calculatorWindow.publishCalculationToDisplay(this.__term, false);
    }

    /**
     * handles special event "Clear Last" with flag: result
     * delete the last digit of __term.num1
     * Void easteregg
     */
    removeLastDigitFromNumberOne() {
        if (this.__term.numberOne === "") {
            this.__voidCount += 1;
            this.__alertWindow.publishEnterTheVoidAlert(this.__voidCount);
        } else {
            this.__term.numberOne = this.__term.numberOne.slice(0, this.__term.numberOne.length-1);
        }
        this.__calculatorWindow.publishCalculationToDisplay(this.__term, false);
    }
} 