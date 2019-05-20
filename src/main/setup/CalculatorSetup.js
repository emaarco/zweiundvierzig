'use strict'

import CalculatorEventListener from "../listener/CalculationEventListener.js";
import CalculatorOnOffEventListener from "../listener/CalculatorOnOffEventListener.js";
import CalculatorWindow from "../gui/CalculatorWindow.js";
import AlertWindow from "../gui/AlertWindow.js";
import CalculationLogWindow from "../gui/CalculationLogWindow.js";
import KeyboardEventListener from "../listener/KeyboardEventListener.js";

/***
 * We use this class for initializing the event-listeners of the calculator 
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
     * @param {CalculatorEventListener} onClickListener listener to be called in onClick-Events
     * @param {CalculatorOnOffListener} calculatorOnOffListener listener to be called in on/off-Events
     */
    setupCalculatorButtonListeners(onClickListener, calculatorOnOffListener) {
        if (onClickListener instanceof CalculatorEventListener
            && calculatorOnOffListener instanceof CalculatorOnOffEventListener) {

            // Setting up the buttons representing a number
            document.getElementById("bttn0").addEventListener("click", () => onClickListener.numberEvent(0), false);
            document.getElementById("bttn1").addEventListener("click", () => onClickListener.numberEvent(1), false);
            document.getElementById("bttn2").addEventListener("click", () => onClickListener.numberEvent(2), false);
            document.getElementById("bttn3").addEventListener("click", () => onClickListener.numberEvent(3));
            document.getElementById("bttn4").addEventListener("click", () => onClickListener.numberEvent(4));
            document.getElementById("bttn5").addEventListener("click", () => onClickListener.numberEvent(5));
            document.getElementById("bttn6").addEventListener("click", () => onClickListener.numberEvent(6));
            document.getElementById("bttn7").addEventListener("click", () => onClickListener.numberEvent(7));
            document.getElementById("bttn8").addEventListener("click", () => onClickListener.numberEvent(8));
            document.getElementById("bttn9").addEventListener("click", () => onClickListener.numberEvent(9));
            document.getElementById("bttnAns").addEventListener("click", () => onClickListener.numberEvent("ANS"));
            document.getElementById("bttnSep").addEventListener("click", () => onClickListener.numberEvent("SEP"));

            // Setting up the buttons representing calculation operators
            document.getElementById("bttnMultiply").addEventListener("click", () => onClickListener.operatorEvent("multiply"));
            document.getElementById("bttnSubtract").addEventListener("click", () => onClickListener.operatorEvent("subtract"));
            document.getElementById("bttnAdd").addEventListener("click", () => onClickListener.operatorEvent("add"));
            document.getElementById("bttnDivide").addEventListener("click", () => onClickListener.operatorEvent("divide"));
            document.getElementById("bttnCalc").addEventListener("click", () => onClickListener.operatorEvent("calculate"));

            // Setting up the buttons representing special operations
            document.getElementById("bttnClearAll").addEventListener("click", () => onClickListener.specialEvent("CLEAR_ALL"));
            document.getElementById("bttnClearLast").addEventListener("click", () => onClickListener.specialEvent("CLEAR_LAST"));
            document.getElementById("bttnOnOff").addEventListener("click", () => calculatorOnOffListener.consumeOnOffEvent());
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
     * 
     * @param {CalculationLogWindow} calculationLogWindow 
     */
    setupCalculationLogWindow(calculationLogWindow) {

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
     * @param {NavigationEventListener} navigationEventListener 
     */
    setupNavigationEventListener(navigationEventListener) {
        document.getElementById("calculationLogTab").addEventListener("click", () => navigationEventListener.pressedLastCalculationsTab());
        document.getElementById("saveAndLoadTab").addEventListener("click", () => navigationEventListener.pressedSaveAndLoadTab());
    }

}