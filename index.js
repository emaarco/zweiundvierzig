'use strict'

import CalculationEventListener from "./src/main/listener/CalculationEventListener.js";
import CalculatorSetup from "./src/main/setup/CalculatorSetup.js";
import KeyboardEventListener from "./src/main/listener/KeyboardEventListener.js";
import CalculatorWindow from "./src/main/gui/CalculatorWindow.js";
import CalculatorOnOffEventListener from "./src/main/listener/CalculatorOnOffEventListener.js";
import AlertWindow from "./src/main/gui/AlertWindow.js";
import NavigationEventListener from "./src/main/listener/NavigationEventListener.js"
import CalculationLogWindow from "./src/main/gui/CalculationLogWindow.js";
import Calculator from "./src/main/Business/Calculator.js";
import Term from "./src/main/data/Term.js";
import TermBuilder from "./src/main/Business/TermBuilder.js";

    //TODO: add subscribers to the listener
    //TODO: add the keyboard listener

// Start calculator setup
const calculatorWindow = new CalculatorWindow();
const alertWindow = new AlertWindow();
const calculationLogWindow = new CalculationLogWindow();
const calculatorOnOffEventListener = new CalculatorOnOffEventListener(calculatorWindow, alertWindow);
const calculationEventListener = new CalculationEventListener();
const keyboardEventListener = new KeyboardEventListener(calculationEventListener, calculatorOnOffEventListener, alertWindow);
const navigationEventListener = new NavigationEventListener(calculationLogWindow);
const calculatorSetup = new CalculatorSetup();
const calculator = new Calculator();
const term = new Term();
const termBuilder = new TermBuilder(term, calculator, alertWindow);
calculationEventListener.addSubscriber(termBuilder);

// This code will run after the window loading process finished
// Otherwise it wouldn´t be possible to initialize the eventListeners, as the html-elements havent been created till then.
window.onload = () => {

    calculatorSetup.setupCalculatorButtonListeners(calculationEventListener, calculatorOnOffEventListener, calculatorWindow);
    calculatorSetup.setupKeyboardListener(keyboardEventListener);
    calculatorSetup.setupCalculatorDisplay();
    calculatorSetup.setupAlertWindows(alertWindow);
    calculatorSetup.setupCalculatorWindow(calculatorWindow);
    calculatorSetup.setupNavigationEventListener(navigationEventListener);

    console.log("Calculator Set-Up completed");
}