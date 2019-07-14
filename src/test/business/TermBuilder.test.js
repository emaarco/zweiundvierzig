"use strict";

import TermBuilder from "../../main/business/TermBuilder.js"
import Calculator from "../../main/business/Calculator.js"
import Term from "../../main/data/Term.js"
import AlertWindow from "../../main/gui/AlertWindow.js"

// Mocking the required classes
jest.mock("../../main/data/Term.js");
jest.mock("../../main/data/Calculator.js");
jest.mock("../../main/gui/AlertWindow.js");

// Create mock instances
const term = new Term();
const calculator = new Calculator();
const alertWindowMock = new AlertWindow();
const testTermBuilder = new TermBuilder(term, calculator, alertWindowMock);

/**
 * simulate number event seperator
 */
test.only("number event num1", () => {
    //testTermBuilder.consumeNumberEvent("SEP");
    
    //expect(term.result).toBe("3");
});
