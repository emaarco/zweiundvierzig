'use strict'

import CalculatorLogWindow from "../gui/CalculatorLogWindow.js";
import CalculationEventHandler from "./CalculationEventHandler.js";

export default class LogWindowEventHandler {


    /**
     * 
     * @param {CalculationEventHandler} calculationEventHandler 
     * @param {CalculationLogWindow} calculatorLogWindow 
     */
    constructor(calculationEventHandler, calculatorLogWindow) {
        this.__calculatorLogWindow = calculatorLogWindow;
        this.__calculationEventHandler = calculationEventHandler; 
    }

    /**
     * 
     */
    handlePressedLastCalculationsTabEvent() {
        this.__calculatorLogWindow.switchToLastCalculationsTab();
    }

    /**
     * 
     */
    handlePressedLogOptionsTabEvent() {
        this.__calculatorLogWindow.switchToLogOptionsTab();
    }

    /**
     * 
     * @param {*} loggedTerm 
     */
    handleClickedOnLoggedTermEvent(loggedTerm) {
        const splittedTerm = loggedTerm.split("=");
        const calculationResult = splittedTerm[1];
        if (splittedTerm.length === undefined || splittedTerm.length != 2) {
            console.error("could not retrieve a result for the logged term. That should never happen!")
        } else {
            const resultAsFloat = parseFloat(calculationResult);
            this.__calculationEventHandler.handleNumberEvent(resultAsFloat);
        }
    }
}