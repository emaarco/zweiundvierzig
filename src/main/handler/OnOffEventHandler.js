"use strict";

import CalculatorWindow from "../gui/CalculatorWindow.js";
import AlertWindow from "../gui/AlertWindow.js"
import CalculationEventListener from "../listener/CalculationEventListener.js";
import KeyboardEventListener from "../listener/KeyboardEventListener.js";
import LogWindowEventListener from "../listener/LogWindowEventListener.js";
import TermBuilder from "../business/TermBuilder.js";

/**
 * A class which is processing onOffEvents from the keyboard / the calculator gui buttons.
 * Deactivates all kind of needed objects to make calculations, when the calculator was turned off
 * Activates all kind of needed objects to make calculations, when the calculator is turned on
 */
export default class OnOffEventHandler {

    /**
     * Constructor initializing the instances needed to process on/off events of the calculator
     * @param {AlertWindow} alertWindow 
     */
    constructor(calculatorWindow, alertWindow, calculationEventListener, keyboardEventListener, logWindowEventListener, termBuilder) {
        if (calculatorWindow instanceof CalculatorWindow
            && alertWindow instanceof AlertWindow
            && calculationEventListener instanceof CalculationEventListener
            && keyboardEventListener instanceof KeyboardEventListener
            && logWindowEventListener instanceof LogWindowEventListener
            && termBuilder instanceof TermBuilder) {
            this.__calculatorWindow = calculatorWindow;
            this.__alertWindow = alertWindow;
            this.__calculationEventListener = calculationEventListener;
            this.__keyboardEventListener = keyboardEventListener;
            this.__logWindowEventListener = logWindowEventListener;
            this.__termBuilder = termBuilder
        }
        this.__calculatorIsOn = true;
    }

    /**
     * A method that handles on / off-Events from the keyboard / the calculation gui buttons
     * The events are used for turning the calculator on / shutting it off.
     */
    handleOnOffEvent() {
        this.__calculatorIsOn = !this.__calculatorIsOn;

        if (this.__calculatorIsOn) {
            this.__calculatorWindow.turnCalculatorOn();
            this.__alertWindow.publishCalculatorOnlineAlert();
            this.__calculationEventListener.activateCalculationListener();
            this.__keyboardEventListener.activateKeyboardListener();
            this.__logWindowEventListener.activateListener();
        } else {
            this.__calculatorWindow.turnCalculatorOff();
            this.__termBuilder.consumeSpecialEvent("CLEAR_ALL");
            this.__alertWindow.publishCalculatorOfflineAlert();
            this.__calculationEventListener.deactivateCalculationListener();
            this.__keyboardEventListener.deactivateKeyboardListener();
            this.__logWindowEventListener.deactivateListener();
        }
    }
}