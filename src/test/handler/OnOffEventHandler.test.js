"use strict";

import CalculatorWindow from "../../main/gui/CalculatorWindow.js";
import AlertWindow from "../../main/gui/AlertWindow.js";
import CalculationEventListener from "../../main/listener/CalculationEventListener.js";
import KeyboardEventListener from "../../main/listener/KeyboardEventListener.js";
import LogWindowEventListener from "../../main/listener/LogWindowEventListener.js";
import TermBuilder from "../../main/business/TermBuilder.js";
import OnOffEventHandler from "../../main/handler/OnOffEventHandler.js";

// Mocking of the classes used in the class underTest;
jest.mock("../../main/gui/AlertWindow.js");
jest.mock("../../main/gui/CalculatorWindow.js");
jest.mock("../../main/listener/CalculationEventListener.js");
jest.mock("../../main/listener/KeyboardEventListener.js");
jest.mock("../../main/business/TermBuilder.js");
jest.mock("../../main/listener/LogWindowEventListener.js");

// Initializing the test instances / mocks
const alertWindowMock = new AlertWindow();
const calculatorWindowMock = new CalculatorWindow();
const calculationEventListenerMock = new CalculationEventListener();
const keyboardEventListenerMock = new KeyboardEventListener();
const logWindowEventListenerMock = new LogWindowEventListener();
const termBuilderMock = new TermBuilder();
const handlerUnderTest = new OnOffEventHandler(
    calculatorWindowMock, alertWindowMock, calculationEventListenerMock
, keyboardEventListenerMock, logWindowEventListenerMock, termBuilderMock
    );

/**
 * When calling the method the first time, the calculator will be turned off is active.
 * When calling the method the seond time, the calculator will be turned on.
 */
test("Turning of the calculator", () => {
    handlerUnderTest.handleOnOffEvent();
    expect(alertWindowMock.publishCalculatorOfflineAlert).toHaveBeenCalledTimes(1);
    expect(calculatorWindowMock.turnCalculatorOff).toHaveBeenCalledTimes(1);
    expect(calculationEventListenerMock.deactivateCalculationListener).toHaveBeenCalledTimes(1);
    expect(keyboardEventListenerMock.deactivateKeyboardListener).toHaveBeenCalledTimes(1);
    expect(termBuilderMock.consumeSpecialEvent).toHaveBeenCalledTimes(1);
});

/**
 * Turning the calculator on. Checks if all activation methods are getting called
 */
test("Turning on the calculator", () => {
    handlerUnderTest.handleOnOffEvent();
    expect(alertWindowMock.publishCalculatorOnlineAlert).toHaveBeenCalledTimes(1);
    expect(calculatorWindowMock.turnCalculatorOn).toHaveBeenCalledTimes(1);
    expect(calculationEventListenerMock.activateCalculationListener).toHaveBeenCalledTimes(1);
    expect(keyboardEventListenerMock.activateKeyboardListener).toHaveBeenCalledTimes(1);
});
