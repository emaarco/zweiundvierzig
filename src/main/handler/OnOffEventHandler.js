'use strict'

import CalculatorWindow from "../gui/CalculatorWindow.js";
import AlertWindow from "../gui/AlertWindow.js"
import CalculationEventListener from "../listener/CalculationEventListener.js";
import KeyboardEventListener from "../listener/KeyboardEventListener.js";
import TermBuilder from "../business/TermBuilder.js";

/**
 * 
 */
export default class OnOffEventHandler {

    /**
     * Constructor initializing the instances needed to process on/off events of the calculator
     * @param {AlertWindow} alertWindow 
     */
    constructor(calculatorWindow, alertWindow, calculationEventListener, keyboardEventListener, termBuilder) {
        if (calculatorWindow instanceof CalculatorWindow
            && alertWindow instanceof AlertWindow
            && calculationEventListener instanceof CalculationEventListener
            && keyboardEventListener instanceof KeyboardEventListener
            && termBuilder instanceof TermBuilder) {
            this.__calculatorWindow = calculatorWindow;
            this.__alertWindow = alertWindow;
            this.__calculationEventListener = calculationEventListener;
            this.__keyboardEventListener = keyboardEventListener;
            this.__termBuilder = termBuilder
        }
        this.__calculatorIsOn = true;
    }

    /**
     * A method that handles on / off-Events of the calculator
     * The events are used for turning the calculator on / shutting it off.
     */
    handleOnOffEvent() {
        this.__calculatorIsOn = !this.__calculatorIsOn;

        if (this.__calculatorIsOn) {
            this.__calculatorWindow.turnCalculatorOn();
            this.__alertWindow.publishCalculatorOnlineAlert();
            this.__calculationEventListener.activateCalculationListener();
            this.__keyboardEventListener.activateKeyboardListener();
        } else {
            this.__calculatorWindow.turnCalculatorOff();
            this.__alertWindow.publishCalculatorOfflineAlert();
            this.__calculationEventListener.deactivateCalculationListener();
            this.__keyboardEventListener.deactivateKeyboardListener();
            this.__termBuilder.consumeSpecialEvent("CLEAR_ALL");
        }
    }
}