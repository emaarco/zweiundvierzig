"use strict";

import CalculatorLogService from "../../main/business/CalculatorLogService.js";
import CalculatorLogWindow from "../../main/gui/CalculatorLogWindow.js"; 

jest.mock("../../main/gui/CalculatorLogWindow.js");

const calculatorLogWindow = new CalculatorLogWindow();
const serviceUnderTest = new CalculatorLogService(calculatorLogWindow);


/**
 * Clear the mocks to reset the interaction counter / etc.
 */
afterEach(() => {
    calculatorLogWindow.addNewTermListEntry.mockClear();
    calculatorLogWindow.modifyTermListEntries.mockClear();
});

/**
 * Test, if new list entries will be generated.
 */
test("Generate new list entries, at the first 5 logging-calls", () => {
    for (let index = 0; index < 5; index++) {
        serviceUnderTest.logCalculatedTerm("1+1=2");   
    }
    expect(calculatorLogWindow.addNewTermListEntry).toHaveBeenCalledTimes(5);
    expect(calculatorLogWindow.modifyTermListEntries).toHaveBeenCalledTimes(0);
});

/**
 * Overwrite the existing logged entries, if five entries have been generated
 */
test("Overwrite existing logged entries, as soon as allready five calculations have been logged", () => {
    serviceUnderTest.logCalculatedTerm("1+1=2");
    expect(calculatorLogWindow.modifyTermListEntries).toHaveBeenCalledTimes(1);
    expect(calculatorLogWindow.addNewTermListEntry).toHaveBeenCalledTimes(0);
});