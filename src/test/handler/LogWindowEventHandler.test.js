'use strict'

import LogWindowEventHandler from "../../main/handler/LogWindowEventHandler.js";
import CalculatorLogWindow from "../../main/gui/CalculatorLogWindow.js";
import CalculationEventHandler from "../../main/handler/CalculationEventHandler.js";
import CalculatorLogService from "../../main/business/CalculatorLogService.js";

jest.mock("../../main/handler/CalculationEventHandler.js");
jest.mock("../../main/gui/CalculatorLogWindow.js");
jest.mock("../../main/business/CalculatorLogService.js");

const calculatorlogServiceMock = new CalculatorLogService();
const calculatorLogWindowMock = new CalculatorLogWindow();
const calculationEventHandlerMock = new CalculationEventHandler();
const handlerUnderTest = new LogWindowEventHandler(calculationEventHandlerMock, calculatorLogWindowMock, calculatorlogServiceMock);

/**
 * Clear the mocks to reset the interaction counter / etc.
 */
afterEach(() => {
    calculatorLogWindowMock.switchToLastCalculationsTab.mockClear();
    calculatorLogWindowMock.switchToLogOptionsTab.mockClear();
    calculationEventHandlerMock.handleNumberEvent.mockClear();
    calculatorlogServiceMock.deleteLogFromServer.mockClear();
    calculatorlogServiceMock.loadLogFromServer.mockClear();
    calculatorlogServiceMock.saveCurrentLogToServer.mockClear();
});

test("pass 'switch to specific tab' events to calculatorLogWindow", () => {
    handlerUnderTest.handlePressedLastCalculationsTabEvent();
    handlerUnderTest.handlePressedLogOptionsTabEvent();

    expect(calculatorLogWindowMock.switchToLastCalculationsTab).toHaveBeenCalledTimes(1);
    expect(calculatorLogWindowMock.switchToLogOptionsTab).toHaveBeenCalledTimes(1);
});

test("pass 'logEvents' to main handler", () => {
    handlerUnderTest.handleLoadLogEvent("bla");
    handlerUnderTest.handleSaveLogEvent("bla");
    handlerUnderTest.handleDeleteLogEvent("bla");

    expect(calculatorlogServiceMock.deleteLogFromServer).toHaveBeenCalledTimes(1);
    expect(calculatorlogServiceMock.loadLogFromServer).toHaveBeenCalledTimes(1);
    expect(calculatorlogServiceMock.saveCurrentLogToServer).toHaveBeenCalledTimes(1);
});

test("extract result out of term and pass it to the calculationEventHandler", () => {
    handlerUnderTest.handleClickedOnLoggedTermEvent("1+1=2");
    expect(calculationEventHandlerMock.handleNumberEvent).toHaveBeenCalledTimes(1);
});

test("do not pass the event, if the result cannot be extracted out of the logEntry", () => {
    handlerUnderTest.handlePressedLogOptionsTabEvent("1+1");
    expect(calculationEventHandlerMock.handleNumberEvent).toHaveBeenCalledTimes(0);
}); 