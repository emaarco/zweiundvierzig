'use strict'

import CalculatorOnOffEventListener from "../../main/listener/CalculatorOnOffEventListener.js";
import CalculatorWindow from "../../main/gui/CalculatorWindow.js";
import AlertWindow from "../../main/gui/AlertWindow.js";

// Mocking of the classes used in the class underTest;
jest.mock("../../main/gui/AlertWindow.js");
jest.mock("../../main/gui/CalculatorWindow.js");

// Initializing the test instances / mocks
const alertWindowMock = new AlertWindow();
const calculatorWindowMock = new CalculatorWindow();
let listenerUnderTest = new CalculatorOnOffEventListener(calculatorWindowMock, alertWindowMock);

test("assert that the constructor detects invalid input", () => {
    listenerUnderTest = new CalculatorOnOffEventListener("dummy1", NaN);
    expect(listenerUnderTest.__alertWindow).toBe(undefined);
    expect(listenerUnderTest.__calculatorWindow).toBe(undefined);
});

test("assert that the constructor detects valid input", () => {
    listenerUnderTest = new CalculatorOnOffEventListener(calculatorWindowMock, alertWindowMock);
    expect(listenerUnderTest.__alertWindow).toBe(alertWindowMock);
    expect(listenerUnderTest.__calculatorWindow).toBe(calculatorWindowMock);
});


test("assert that online and offline alerts get called" , () => {
    listenerUnderTest.consumeOnOffEvent();
    listenerUnderTest.consumeOnOffEvent();
    expect(calculatorWindowMock.changeActivationStatus).toHaveBeenCalledTimes(2);
    expect(alertWindowMock.publishCalculatorOfflineAlert).toHaveBeenCalledTimes(1);
    expect(alertWindowMock.publishCalculatorOnlineAlert).toHaveBeenCalledTimes(1);
});