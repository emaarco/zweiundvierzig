"use strict";

import calculatorButtonIdEnum from "../enum/CalculatorButtonIdEnum.js";
import Term from "../data/Term.js";

export default class CalculatorWindow {

    constructor() {}

    /**
     * 
     * @param {Term} termToBePublished 
     */
    publishCalculationToDisplay(termToBePublished, isResult) {
        let operator = "";
        // add enum function
        switch (termToBePublished.operator) {
            case "add":
                operator = "+";
                break;
            case "subtract":
                operator = "-";
                break;
            case "divide":
                operator = "/";
                break;
            case "multiply":
                operator = "*";
                break;
            default:
                break;
        }

        const boxContent = isResult 
            ? "" + termToBePublished.result
            : "" + termToBePublished.numberOne + operator + termToBePublished.numberTwo; 
            
        document.getElementById("calculationArea").innerHTML = boxContent;
    }
    
    /**
     * 
     */
    turnCalculatorOn() {
        this.__changeButtonEnablementStatus(false);
        this.__changeColorOfOnOffButton(true);
    }

    /**
     * 
     */
    turnCalculatorOff() {
        this.__changeButtonEnablementStatus(true);
        this.__changeColorOfOnOffButton(false);
        this.__clearWindow();
    }

    /**
     * 
     */
    setupCalculatorButtonColors() {  
        calculatorButtonIdEnum.numberButton.forEach((bttnId) => {
            document.getElementById(bttnId)
        });
        calculatorButtonIdEnum.operationButton.forEach((bttnId) => {
            document.getElementById(bttnId).style.backgroundColor = "#ffebcc";
        });
        calculatorButtonIdEnum.clearButton.forEach((bttnId) => {
            document.getElementById(bttnId).style.backgroundColor = "#ffd6cc"
        });
        this.__changeColorOfOnOffButton(true);
    }

    // ****************************************************************************************** //
    // ***************************** PRIVATE HELPER METHODS ************************************* // 

    /**
     * 
     * @param {Boolean} calculatorIsOn 
     */
    __changeColorOfOnOffButton(calculatorIsOn) {
        if (calculatorIsOn) {
            calculatorButtonIdEnum.onOffButton.forEach((bttnId) => {
                document.getElementById(bttnId).style.backgroundColor = "#ffd6cc";
            });
        } else {
            calculatorButtonIdEnum.onOffButton.forEach((bttnId) => {
                document.getElementById(bttnId).style.backgroundColor = "#e5ffe5";
            });
        }
    }

    /**
     * 
     * @param {*} isDisabled 
     */
    __changeButtonEnablementStatus(isDisabled) {
        calculatorButtonIdEnum.numberButton.forEach((bttnId) => {
            document.getElementById(bttnId).disabled = isDisabled;
        });
        calculatorButtonIdEnum.operationButton.forEach((bttnId) => {
            document.getElementById(bttnId).disabled = isDisabled;
        });
        calculatorButtonIdEnum.seperatorButton.forEach((bttnId) => {
            document.getElementById(bttnId).disabled = isDisabled;
        });
        calculatorButtonIdEnum.clearButton.forEach((bttnId) => {
            document.getElementById(bttnId).disabled = isDisabled;
        });
        calculatorButtonIdEnum.lastResultButton.forEach((bttnId) => {
            document.getElementById(bttnId).disabled = isDisabled;
        });
    }

    /**
     * 
     */
    __clearWindow() {
        document.getElementById("calculationArea").innerHTML = "";
    }

}