"use strict";

import CalculatorLogService from "../../main/business/CalculatorLogService.js";
import AlertWindow from "../../main/gui/AlertWindow.js";
import CalculatorLogWindow from "../../main/gui/CalculatorLogWindow.js";

jest.mock("../../main/gui/CalculatorLogWindow.js");
jest.mock("../../main/gui/AlertWindow.js");

const calculatorLogWindowMock = new CalculatorLogWindow();
const alertWindowMock = new AlertWindow();
const serviceUnderTest = new CalculatorLogService(calculatorLogWindowMock, alertWindowMock);

/**
 * Clear the mocks to reset the interaction counter / etc.
 */
afterEach(() => {
    calculatorLogWindowMock.addNewTermListEntry.mockClear();
    calculatorLogWindowMock.modifyTermListEntries.mockClear();
    calculatorLogWindowMock.addLogToSelectableLogs.mockClear();
    calculatorLogWindowMock.removeLogFromSelectableLogs.mockClear();
    alertWindowMock.publishLogSuccessfullyDeletedAlert.mockClear();
    alertWindowMock.publishLogSuccessfullyLoadedAlert.mockClear();
    alertWindowMock.publishLogSuccessfullySavedAlert.mockClear();
    jest.useFakeTimers();
});

/**
 * Test, if new list entries will be generated.
 */
test("Generate new list entries, at the first 5 logging-calls", () => {
    for (let index = 0; index < 5; index++) {
        serviceUnderTest.logCalculatedTerm("1+1=2");
    }
    expect(calculatorLogWindowMock.addNewTermListEntry).toHaveBeenCalledTimes(5);
    expect(calculatorLogWindowMock.modifyTermListEntries).toHaveBeenCalledTimes(0);
});

/**
 * Overwrite the existing logged entries, if five entries have been generated
 */
test("Overwrite existing logged entries, as soon as allready five calculations have been logged", () => {
    serviceUnderTest.logCalculatedTerm("1+1=2");
    expect(calculatorLogWindowMock.modifyTermListEntries).toHaveBeenCalledTimes(1);
    expect(calculatorLogWindowMock.addNewTermListEntry).toHaveBeenCalledTimes(0);
});

test("save an existing log under a specific name", () => {
    serviceUnderTest.saveCurrentLogToServer("myDummyLog", () => {});
    jest.runAllTimers();
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 2500);
    expect(calculatorLogWindowMock.addLogToSelectableLogs).toHaveBeenCalledTimes(1);    
    expect(alertWindowMock.publishLogSuccessfullySavedAlert).toHaveBeenCalledTimes(1);
});

test("overwrite a log, because there is allready an existing one", () => {
    serviceUnderTest.saveCurrentLogToServer("myDummyLog", () => {});
    jest.runAllTimers();
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 2500);
    expect(calculatorLogWindowMock.addLogToSelectableLogs).toHaveBeenCalledTimes(0);
    expect(alertWindowMock.publishLogSuccessfullySavedAlert).toHaveBeenCalledTimes(1);
    expect(alertWindowMock.publishLogSuccessfullySavedAlert).toHaveBeenLastCalledWith(expect.any(String), true);
});

test("delete an existing log with a specific name", () => {
    serviceUnderTest.loadLogFromServer("myDummyLog", () => {});
    jest.runAllTimers();
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 2500);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(alertWindowMock.publishLogSuccessfullyLoadedAlert).toHaveBeenCalledTimes(1);
});

test("delete an existing log with a specific name", () => {
    serviceUnderTest.deleteLogFromServer("myDummyLog", () => {});
    jest.runAllTimers();
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 2500);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(alertWindowMock.publishLogSuccessfullyDeletedAlert).toHaveBeenCalledTimes(1);
    expect(calculatorLogWindowMock.removeLogFromSelectableLogs).toHaveBeenCalledTimes(1);
});