'use strict' 

import CalculationEventListener from "../../main/listener/CalculationEventListener.js";
import AlertWindow from "../../main/gui/AlertWindow.js"
import CalculatorOnOffEventListener from "../../main/listener/CalculatorOnOffEventListener.js";
import KeyboardEventListener from "../../main/listener/KeyboardEventListener.js";
import CalculatorWindow from "../../main/gui/CalculatorWindow.js";

// Mocking the required classes
jest.mock("../../main/gui/AlertWindow.js");
jest.mock("../../main/mapper/KeyboardToCalculatorMapper.js");
jest.mock("../../main/listener/CalculationEventListener.js");
jest.mock("../../main/listener/CalculatorOnOffEventListener.js");
jest.mock("../../main/gui/CalculatorWindow.js");


// Create mock instances
let alertWindowMock = new AlertWindow();
let calculatorWindowMock = new CalculatorWindow();
let calculatorOnOffEventListener = new CalculatorOnOffEventListener(calculatorWindowMock, alertWindowMock);
let calculationEventListener = new CalculationEventListener();

// create instances underTest
let listenerUnderTest = new KeyboardEventListener(
    calculationEventListener, calculatorOnOffEventListener, alertWindowMock
);

test("retrieve and publish numberEvent", () => {
    listenerUnderTest.consumeButtonPressedEvent("5");
    expect(listenerUnderTest.__mainListener.numberEvent).toHaveBeenCalledTimes(1);
});

test("retrieve and publish operatior event", () => {
    listenerUnderTest.consumeButtonPressedEvent("+");
    expect(listenerUnderTest.__mainListener.operatorEvent).toHaveBeenCalledTimes(1);
});

test("retrieve and publish specialEvent", () => {
    listenerUnderTest.consumeButtonPressedEvent("Backspace");
    expect(listenerUnderTest.__mainListener.specialEvent).toHaveBeenCalledTimes(1);
});

test("retrieve and publish seperatorEvent", () => {
    listenerUnderTest.consumeButtonPressedEvent(",");
    // called 2 times, as it allready got called one time in another test (result still cached)
    expect(listenerUnderTest.__mainListener.numberEvent).toHaveBeenCalledTimes(2);
});

test("retrieve and publish onOffEvent", () => {
    listenerUnderTest.consumeButtonPressedEvent("Escape");
    expect(listenerUnderTest.__onOffListener.consumeOnOffEvent).toHaveBeenCalledTimes(1);
});