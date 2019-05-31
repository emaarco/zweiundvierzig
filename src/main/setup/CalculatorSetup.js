"use strict";

import CalculationEventListener from "../listener/CalculationEventListener.js";
import CalculatorWindow from "../gui/CalculatorWindow.js";
import AlertWindow from "../gui/AlertWindow.js";
import KeyboardEventListener from "../listener/KeyboardEventListener.js";
import LogWindowEventListener from "../listener/LogWindowEventListener.js";

/**
 * We use this class for the initial setup of the event-listeners of the calculator 
 * and enabling / disabling other components
 */
export default class CalculatorSetup {

    /***
     * Representing an empty constructor.
     */
    constructor() {}

    /**
     * Setting up the onclick-Events of the html-document calculator buttons
     * addEventListener expects a function as parameter. () => returns the needed function
     * @param {CalculationEventListener} calculatorButtonListener listener to be called in onClick-Events
     * @param {CalculatorOnOffListener} calculatorOnOffListener listener to be called in on/off-Events
     */
    setupCalculatorButtonListeners(calculatorButtonListener) {
        if (calculatorButtonListener instanceof CalculationEventListener) {
            // Setting up the buttons representing a number
            document.getElementById("bttn0").addEventListener("click", () => calculatorButtonListener.consumeNumberEvent(0), false);
            document.getElementById("bttn1").addEventListener("click", () => calculatorButtonListener.consumeNumberEvent(1), false);
            document.getElementById("bttn2").addEventListener("click", () => calculatorButtonListener.consumeNumberEvent(2), false);
            document.getElementById("bttn3").addEventListener("click", () => calculatorButtonListener.consumeNumberEvent(3));
            document.getElementById("bttn4").addEventListener("click", () => calculatorButtonListener.consumeNumberEvent(4));
            document.getElementById("bttn5").addEventListener("click", () => calculatorButtonListener.consumeNumberEvent(5));
            document.getElementById("bttn6").addEventListener("click", () => calculatorButtonListener.consumeNumberEvent(6));
            document.getElementById("bttn7").addEventListener("click", () => calculatorButtonListener.consumeNumberEvent(7));
            document.getElementById("bttn8").addEventListener("click", () => calculatorButtonListener.consumeNumberEvent(8));
            document.getElementById("bttn9").addEventListener("click", () => calculatorButtonListener.consumeNumberEvent(9));
            document.getElementById("bttnAns").addEventListener("click", () => calculatorButtonListener.consumeNumberEvent("ANS"));
            document.getElementById("bttnSep").addEventListener("click", () => calculatorButtonListener.consumeNumberEvent("SEP"));

            // Setting up the buttons representing calculation operators
            document.getElementById("bttnMultiply").addEventListener("click", () => calculatorButtonListener.consumeOperatorEvent("multiply"));
            document.getElementById("bttnSubtract").addEventListener("click", () => calculatorButtonListener.consumeOperatorEvent("subtract"));
            document.getElementById("bttnAdd").addEventListener("click", () => calculatorButtonListener.consumeOperatorEvent("add"));
            document.getElementById("bttnDivide").addEventListener("click", () => calculatorButtonListener.consumeOperatorEvent("divide"));
            document.getElementById("bttnCalc").addEventListener("click", () => calculatorButtonListener.consumeCalculateEvent());

            // Setting up the buttons representing special operations
            document.getElementById("bttnClearAll").addEventListener("click", () => calculatorButtonListener.consumeSpecialEvent("CLEAR_ALL"));
            document.getElementById("bttnClearLast").addEventListener("click", () => calculatorButtonListener.consumeSpecialEvent("CLEAR_LAST"));
            document.getElementById("bttnOnOff").addEventListener("click", () => calculatorButtonListener.consumeOnOffEvent());
        }
    }

    /**
     * 
     * @param {CalculatorWindow} calculatorWindow 
     */
    setupCalculatorWindow(calculatorWindow) {
        calculatorWindow.setupCalculatorButtonColors();
    }

    /**
     * 
     * @param {AlertWindow} alertWindow 
     */
    setupAlertWindows(alertWindow) {
        alertWindow.publishCalculatorOnlineAlert();
    }

    /**
     * Setting up the keyboard listener, which retrieves buttonPressed-Events from the keyboard.
     * The Keyboard Listener filters them and passes them to the mainListener
     * @param {KeyboardEventListener} keyboardListener 
     */
    setupKeyboardListener(keyboardListener) {
        document.addEventListener('keydown', (bttnPressedEvent) => {
            keyboardListener.consumeButtonPressedEvent(bttnPressedEvent.key);
        });
    }

    /**
     * Disables the Calculator display, in order to prevent from user-input
     */
    setupCalculatorDisplay() {
        document.getElementById("calculationArea").disabled = true;
    }

    /**
     * 
     * @param {LogWindowEventListener} logWindowEventListener 
     */
    setupLogWindowEventListener(logWindowEventListener) {
        document.getElementById("calculationLogTab").addEventListener("click", () => logWindowEventListener.consumePressedLastCalcuationTabEvent());
        document.getElementById("logOptionsTab").addEventListener("click", () => logWindowEventListener.consumePressedOnLogOptionsTabEvent());
    }

}