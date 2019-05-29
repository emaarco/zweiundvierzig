"use strict";

import CalculationEventHandler from "../../main/handler/CalculationEventHandler.js";
import AlertWindow from "../../main/gui/AlertWindow.js"
import KeyboardEventHandler from "../../main/handler/KeyboardEventHandler.js";
import OnOffEventHandler from "../../main/handler/OnOffEventHandler.js";

// Mocking the required classes
jest.mock("../../main/gui/AlertWindow.js");
jest.mock("../../main/handler/OnOffEventHandler.js");
jest.mock("../../main/handler/CalculationEventHandler.js");

// Create mock instances
const alertWindowMock = new AlertWindow();
const onOffEventHandler = new OnOffEventHandler();
const calculationEventHandler = new CalculationEventHandler();
const handlerUnderTest = new KeyboardEventHandler(onOffEventHandler, calculationEventHandler, alertWindowMock);

/**
 * Resets the handleNumberEvent mock, as it will be called more than one time
 */
afterEach(() => {
    calculationEventHandler.handleNumberEvent.mockClear();
    calculationEventHandler.handleCalculateEvent.mockClear();
    calculationEventHandler.handleOperatorEvent.mockClear();
    calculationEventHandler.handleSpecialEvent.mockClear();
    onOffEventHandler.handleOnOffEvent.mockClear();
});

/**
 * Retrieves a number event from the keyboard and passes it to the calculationEventHandler
 */
test("retrieve and pass numberEvent", () => {
    handlerUnderTest.handleKeyboardEvent("5");
    expect(calculationEventHandler.handleNumberEvent).toHaveBeenCalledTimes(1);
});

/**
 * Retrieves an operator event from the keyboard and passes it to the calculationEventHandler
 */
test("retrieve and pass operator event", () => {
    handlerUnderTest.handleKeyboardEvent("+");
    expect(calculationEventHandler.handleOperatorEvent).toHaveBeenCalledTimes(1);
});

/**
 * Retrieves a special event from the keyboard and passes it to the calculationEventHandler
 */
test("retrieve and pass specialEvent", () => {
    handlerUnderTest.handleKeyboardEvent("Backspace");
    expect(calculationEventHandler.handleSpecialEvent).toHaveBeenCalledTimes(1);
});

/**
 * Retrieve a calculateEvent from the keyboard and passes it to the calculationEventHandler
 */
test("retrieve and pass calculateEvent", () => {
    handlerUnderTest.handleKeyboardEvent("=");
    handlerUnderTest.handleKeyboardEvent("Enter");
    expect(calculationEventHandler.handleCalculateEvent).toHaveBeenCalledTimes(2);
    expect(calculationEventHandler.handleNumberEvent).toHaveBeenCalledTimes(0);
    expect(calculationEventHandler.handleSpecialEvent).toHaveBeenCalledTimes(0);
    expect(calculationEventHandler.handleSpecialEvent).toHaveBeenCalledTimes(0);
    expect(onOffEventHandler.handleOnOffEvent).toHaveBeenCalledTimes(0);
});

/**
 * Retrieves a seperatorEvent from the keyboard and passes it to the calculationEventHandler
 */
test("retrieve and publish seperatorEvent", () => {
    handlerUnderTest.handleKeyboardEvent(",");
    expect(calculationEventHandler.handleNumberEvent).toHaveBeenCalledTimes(1);
});

/**
 * Retrieves an onoffEvent from the keyboard and passes it to the calculationEventHandler
 */
test("retrieve and publish onOffEvent", () => {
    handlerUnderTest.handleKeyboardEvent("Escape");
    expect(onOffEventHandler.handleOnOffEvent).toHaveBeenCalledTimes(1);
});

/**
 * Retrieves and invalid event. The mehtod should detect the event as invalid and publish an alert to the gui
 */
test("retrieve invalid keyboard event and publish alert", () => {
    handlerUnderTest.handleKeyboardEvent("f");
    expect(alertWindowMock.publishInvalidKeyboardInputWarning).toHaveBeenCalledTimes(1);
});