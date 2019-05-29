"use strict";

import CalculationEventHandler from "../../main/handler/CalculationEventHandler.js";
import TermBuilder from "../../main/business/TermBuilder.js";

jest.mock("../../main/business/TermBuilder.js");

const termBuilder = new TermBuilder();
const handlerUnderTest = new CalculationEventHandler();

/**
 * add a valid subscriber to the list of subscribers
 */
test("add valid subscriber to the list of subscribers", () => {
    expect(handlerUnderTest.__subscribers.size === 0);
    handlerUnderTest.addSubscriber(termBuilder);
    expect(handlerUnderTest.__subscribers.size === 1);
});

/**
 * Do not add an invalid subscriber to the list of subscribers.
 * If a subscriber is invalid, is wouldn´t be possible for it to retrieve events
 */
test("do not add an invalid subscriber to the list of subscribers", () => {
    expect(handlerUnderTest.__subscribers.size === 1);
    handlerUnderTest.addSubscriber("bla");
    expect(handlerUnderTest.__subscribers.size === 1);
});

/**
 * Validate that handler publishes the event to every subscriber
 */
test("handle valid number / operator / specialEvents", () => {
    handlerUnderTest.handleNumberEvent("5");
    handlerUnderTest.handleOperatorEvent("*");
    handlerUnderTest.handleSpecialEvent("CLEAR_ALL");
    handlerUnderTest.handleCalculateEvent();

    expect(termBuilder.consumeNumberEvent).toHaveBeenCalledTimes(1);
    expect(termBuilder.consumeOperatorEvent).toHaveBeenCalledTimes(1);
    expect(termBuilder.consumeSpecialEvent).toHaveBeenCalledTimes(1);
    expect(termBuilder.consumeCalculateEvent).toHaveBeenCalledTimes(1);
});




