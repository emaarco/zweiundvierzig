"use strict";

import AlertWindow from "./src/main/gui/AlertWindow.js";
import CalculatorWindow from "./src/main/gui/CalculatorWindow.js";
import CalculatorLogWindow from "./src/main/gui/CalculatorLogWindow.js";

import CalculationEventListener from "./src/main/listener/CalculationEventListener.js";
import KeyboardEventListener from "./src/main/listener/KeyboardEventListener.js";
import LogWindowEventListener from "./src/main/listener/LogWindowEventListener.js";

import OnOffEventHandler from "./src/main/handler/OnOffEventHandler.js";
import KeyboardEventHandler from "./src/main/handler/KeyboardEventHandler.js"
import CalculationEventHandler from "./src/main/handler/CalculationEventHandler.js";

import CalculatorSetup from "./src/main/setup/CalculatorSetup.js";
import Calculator from "./src/main/business/Calculator.js";
import Term from "./src/main/data/Term.js";
import TermBuilder from "./src/main/business/TermBuilder.js";
import CalculatorLogService from "./src/main/business/CalculatorLogService.js";
import LogWindowEventHandler from "./src/main/handler/LogWindowEventHandler.js";

// Create GUI accessor
const calculatorWindow = new CalculatorWindow();
const alertWindow = new AlertWindow();
const calculatorLogWindow = new CalculatorLogWindow();

// Initialize calculation logic
const calculatorLogService = new CalculatorLogService(calculatorLogWindow);
const calculator = new Calculator(calculatorLogService);
const term = new Term();
const termBuilder = new TermBuilder(term, calculator, alertWindow);

// Create listeners 
const logWindowEventListener = new LogWindowEventListener(calculatorLogWindow);
const calculationEventListener = new CalculationEventListener();
const keyboardEventListener = new KeyboardEventListener();

// Create Event Handler
const calculationEventHandler = new CalculationEventHandler();
const logWindowEventHandler = new LogWindowEventHandler(calculationEventHandler, calculatorLogWindow);
const onOffEventHandler = new OnOffEventHandler(calculatorWindow, alertWindow, calculationEventListener, keyboardEventListener, logWindowEventListener, termBuilder);
const keyboardEventHandler = new KeyboardEventHandler(onOffEventHandler, calculationEventHandler, alertWindow);

// Define handlers of the listeners
calculationEventListener.setCalculationEventHandler(calculationEventHandler);
calculationEventListener.setOnOffEventHandler(onOffEventHandler);
keyboardEventListener.setKeyboardEventHandler(keyboardEventHandler);
logWindowEventListener.setLogWindowEventHandler(logWindowEventHandler);

// Define further listeners of gui-objects
calculatorLogWindow.setLogWindowEventListener(logWindowEventListener);

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
    calculatorSetup.setupLogWindowEventListener(logWindowEventListener);

    console.log("Calculator Set-Up completed");
}