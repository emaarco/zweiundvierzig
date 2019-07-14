"use strict";

import Calculator from "../../main/business/Calculator.js"
import Term from "../../main/data/Term.js"

// Mocking the required classes
jest.mock("../../main/data/Term.js");

// Create mock instances
const testCalculator = new Calculator();
const term = new Term();

/**
 * addition of num1 and num2
 */
test.only("term addition", () => {
    term.num1 = 1;
    term.operator = "add";
    term.num2 = 2;

    testCalculator.calculate(term);
    
    expect(term.result).toBe("3");
});

/**
 * multiplication of num1 and num2
 */
test("term multiplication", () => {
    term.num1 = 2;
    term.operator = "multiply";
    term.num2 = 2;

    testCalculator.calculate(term);
    
    expect(term.result).toBe("4");
});

/**
 * subtraction of num1 and num2
 */
test("term subtraction", () => {
    term.num1 = 5;
    term.operator = "subtract";
    term.num2 = 2;

    testCalculator.calculate(term);
    
    expect(term.result).toBe("3");
});

/**
 * division of num1 and num2
 */
test("term division", () => {
    term.num1 = 6;
    term.operator = "divide";
    term.num2 = 2;

    testCalculator.calculate(term);
    
    expect(term.result).toBe("3");
});

/**
 * precision on 14 digits
 */
test("term precision", () => {
    term.num1 = 6.00000000000000000001;
    term.operator = "add";
    term.num2 = 0.12345678912345;

    testCalculator.calculate(term);
    
    expect(term.result).toBe("6.12345678912345");
});

/**
 * size of log is maximum 5
 */
test("log size", () => {
    term.num1 = 6;
    term.operator = "add";
    term.num2 = 1;

    testCalculator.calculate(term);
    testCalculator.calculate(term);
    testCalculator.calculate(term);
    testCalculator.calculate(term);
    testCalculator.calculate(term);
    testCalculator.calculate(term);
    
    expect(testCalculator.__log.length).toBe("5");
});

/**
 * Transform the term to a string
 */
test("transform term to a string", () => {
    term.num1 = 1;
    term.operator = "add";
    term.num2 = 2;
    term.result = 3;

    expect(testCalculator.termAsString(term)).toBe("1 + 2 = 3");
});
