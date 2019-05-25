'use strict'

import AlertWindow from "./src/main/gui/AlertWindow.js";
import CalculatorWindow from "./src/main/gui/CalculatorWindow.js";
import CalculationLogWindow from "./src/main/gui/CalculationLogWindow.js";

import CalculationEventListener from "./src/main/listener/CalculationEventListener.js";
import KeyboardEventListener from "./src/main/listener/KeyboardEventListener.js";
import NavigationEventListener from "./src/main/listener/NavigationEventListener.js"

import OnOffEventHandler from "./src/main/handler/OnOffEventHandler.js";
import KeyboardEventHandler from "./src/main/handler/KeyboardEventHandler.js"
import CalculationEventHandler from "./src/main/handler/CalculationEventHandler.js";

import CalculatorSetup from "./src/main/setup/CalculatorSetup.js";
import Calculator from "./src/main/business/calculator.js";
import Term from "./src/main/data/Term.js";
import TermBuilder from "./src/main/business/TermBuilder.js";

// Create GUI accessor
const calculatorWindow = new CalculatorWindow();
const alertWindow = new AlertWindow();
const calculationLogWindow = new CalculationLogWindow();

// Initialize calculation logic
const calculator = new Calculator();
const term = new Term();
const termBuilder = new TermBuilder(term, calculator, alertWindow);

// Create listeners 
const calculationEventListener = new CalculationEventListener();
const keyboardEventListener = new KeyboardEventListener();
const navigationEventListener = new NavigationEventListener(calculationLogWindow);

// Create Event Handler
const calculationEventHandler = new CalculationEventHandler();
const onOffEventHandler = new OnOffEventHandler(calculatorWindow, alertWindow, calculationEventListener, keyboardEventListener, termBuilder);
const keyboardEventHandler = new KeyboardEventHandler(onOffEventHandler, calculationEventHandler, alertWindow);

// Define handlers of the listeners
calculationEventListener.setCalculationEventHandler(calculationEventHandler);
calculationEventListener.setOnOffEventHandler(onOffEventHandler);
keyboardEventListener.setKeyboardEventHandler(keyboardEventHandler);

// Set subscriber of handler-verified events
calculationEventHandler.addSubscriber(termBuilder);

// Initialize setUp class
const calculatorSetup = new CalculatorSetup();

// This code will run after the window loading process finished
// Otherwise it wouldn´t be possible to initialize the eventListeners, as the html-elements havent been created till then.
window.onload = () => {

    calculatorSetup.setupCalculatorButtonListeners(calculationEventListener, calculatorWindow);
    calculatorSetup.setupKeyboardListener(keyboardEventListener);
    calculatorSetup.setupCalculatorDisplay();
    calculatorSetup.setupAlertWindows(alertWindow);
    calculatorSetup.setupCalculatorWindow(calculatorWindow);
    calculatorSetup.setupNavigationEventListener(navigationEventListener);

    console.log("Calculator Set-Up completed");
}