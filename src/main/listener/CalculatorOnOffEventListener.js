'use strict'

import CalculatorWindow from "../gui/CalculatorWindow.js";
import AlertWindow from "../gui/AlertWindow.js"

export default class CalculatorOnOffEventListener {

    /**
     * 
     * @param {CalculatorWindow} calculatorWindow 
     * @param {AlertWindow} alertWindow 
     */
    constructor(calculatorWindow, alertWindow) {
        if (calculatorWindow instanceof CalculatorWindow && alertWindow instanceof AlertWindow) {
            this.__calculatorWindow = calculatorWindow;
            this.__alertWindow = alertWindow;
        }
        this.__calculatorIsOn = true;
    }

    /**
     * A method that consumes on / off-Events of the calculator
     * The events are used for turning the calculator on / shutting it off.
     */
    consumeOnOffEvent() {
        this.__calculatorIsOn = !this.__calculatorIsOn;
        this.__calculatorWindow.changeActivationStatus(this.__calculatorIsOn);
        if (!this.__calculatorIsOn) {
            this.__alertWindow.publishCalculatorOfflineAlert();
        } else {
            this.__alertWindow.publishCalculatorOnlineAlert();
        }
    }
}