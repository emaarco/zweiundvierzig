"use strict";

/**
 * testing the calculation event listener as the listener which listenes 
 * to all actions that are triggered by the gui calculator buttons
 */

import CalculationEventListener from "../../main/listener/CalculationEventListener.js";
import OnOffEventHandler from "../../main/handler/OnOffEventHandler.js";
import CalculationEventHandler from "../../main/handler/CalculationEventHandler";

jest.mock("../../main/handler/CalculationEventHandler.js");
jest.mock("../../main/handler/OnOffEventHandler.js");

const onOffEventHandler = new OnOffEventHandler();
const calculationEventHandler = new CalculationEventHandler();
const listenerUnderTest = new CalculationEventListener();

/**
 * Clear the mocks to reset the interaction counter / etc.
 */
afterEach(() => {
    calculationEventHandler.handleSpecialEvent.mockClear();
    calculationEventHandler.handleOperatorEvent.mockClear();
    calculationEventHandler.handleNumberEvent.mockClear();
    calculationEventHandler.handleCalculateEvent.mockClear();
    onOffEventHandler.handleOnOffEvent.mockClear();
});

/**
 * Initialize the handlers of the listener to ensure that the listener can pass the events to a handler
 */
test("initialize the handler of the listeners", () => {
    listenerUnderTest.setCalculationEventHandler(calculationEventHandler);
    listenerUnderTest.setOnOffEventHandler(onOffEventHandler);
    expect(listenerUnderTest.__calculationEventHandler).toBe(calculationEventHandler);
    expect(listenerUnderTest.__onOffEventHandler).toBe(onOffEventHandler);
});

/**
 * Verify that activation / deactivation of the listener is possible
 */
test("change activation status of the listener", () => {
    listenerUnderTest.deactivateCalculationListener();
    expect(listenerUnderTest.__listenerIsActive).toBe(false);

    listenerUnderTest.activateCalculationListener();
    expect(listenerUnderTest.__listenerIsActive).toBe(true);
});

/**
 * Pass events to the handler, when the listener is active
 */
test("push calculation events to handler, if listener is active", () => {
    listenerUnderTest.consumeNumberEvent("5");
    listenerUnderTest.consumeOperatorEvent("+");
    listenerUnderTest.consumeSpecialEvent("Clear");
    listenerUnderTest.consumeCalculateEvent();
    listenerUnderTest.consumeOnOffEvent();

    expect(calculationEventHandler.handleNumberEvent).toHaveBeenCalledTimes(1);
    expect(calculationEventHandler.handleOperatorEvent).toHaveBeenCalledTimes(1);
    expect(calculationEventHandler.handleSpecialEvent).toHaveBeenCalledTimes(1);
    expect(onOffEventHandler.handleOnOffEvent).toHaveBeenCalledTimes(1);
    expect(calculationEventHandler.handleCalculateEvent).toHaveBeenCalledTimes(1);
});

/**
 * Do not pass events to the handler, when the listener is inactive
 */
test("push no events to the handler, despite onOffEvents, if the listener is inactive", () => {
    listenerUnderTest.deactivateCalculationListener();
    listenerUnderTest.consumeNumberEvent("5");
    listenerUnderTest.consumeOperatorEvent("+");
    listenerUnderTest.consumeSpecialEvent("Clear");
    listenerUnderTest.consumeOnOffEvent();

    expect(listenerUnderTest.__listenerIsActive).toBe(false);
    expect(calculationEventHandler.handleNumberEvent).toHaveBeenCalledTimes(0);
    expect(calculationEventHandler.handleOperatorEvent).toHaveBeenCalledTimes(0);
    expect(calculationEventHandler.handleSpecialEvent).toHaveBeenCalledTimes(0);
    expect(onOffEventHandler.handleOnOffEvent).toHaveBeenCalledTimes(1);
});
