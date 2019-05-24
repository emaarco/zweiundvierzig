'use strict'

import CalculationEventListener from "./src/main/listener/CalculationEventListener.js";
import CalculatorSetup from "./src/main/setup/CalculatorSetup.js";
import KeyboardEventListener from "./src/main/listener/KeyboardEventListener.js";
import CalculatorWindow from "./src/main/gui/CalculatorWindow.js";
import CalculatorOnOffEventListener from "./src/main/listener/CalculatorOnOffEventListener.js";
import AlertWindow from "./src/main/gui/AlertWindow.js";
import NavigationEventListener from "./src/main/listener/NavigationEventListener.js"
import CalculationLogWindow from "./src/main/gui/CalculationLogWindow.js";

    //TODO: add subscribers to the listener
    //TODO: add the keyboard listener

// Start calculator setup
let calculatorWindow = new CalculatorWindow();
let alertWindow = new AlertWindow();
let calculationLogWindow = new CalculationLogWindow();
let calculatorOnOffEventListener = new CalculatorOnOffEventListener(calculatorWindow, alertWindow);
let calculationEventListener = new CalculationEventListener();
let keyboardEventListener = new KeyboardEventListener(calculationEventListener, calculatorOnOffEventListener, alertWindow);
let navigationEventListener = new NavigationEventListener(calculationLogWindow);
let calculatorSetup = new CalculatorSetup();

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