'use strict'

import LogWindowEventListener from "../../main/listener/LogWindowEventListener.js";
import LogWindowEventHandler from "../../main/handler/LogWindowEventHandler.js";

jest.mock("../../main/handler/LogWindowEventHandler.js");

const listenerUnderTest = new LogWindowEventListener();
const logWindowEventHandler = new LogWindowEventHandler();

/**
 * Clear the mocks to reset the interaction counter / etc.
 */
afterEach(() => {
    logWindowEventHandler.handleClickedOnLoggedTermEvent.mockClear();
    logWindowEventHandler.handlePressedLastCalculationsTabEvent.mockClear();
    logWindowEventHandler.handlePressedLogOptionsTabEvent.mockClear();
});

/**
 * Initialize the handlers of the listener to ensure that the listener can pass the events to a handler
 */
test("Initialize event handler to listener", () => {
    listenerUnderTest.setLogWindowEventHandler(logWindowEventHandler);
    expect(listenerUnderTest.__logWindowEventHandler).toBe(logWindowEventHandler);
});

/**
 * Verify that activation / deactivation of the listener is possible
 */
test("Set listener active / inactive", () => {
    listenerUnderTest.deactivateListener();
    expect(listenerUnderTest.__listenerIsActive).toBe(false);

    listenerUnderTest.activateListener();
    expect(listenerUnderTest.__listenerIsActive).toBe(true);
});

/**
 * Verify that events, will be passed to a handler, if the listener is active
 */
test("consume events, if the listener is active", () => {
    listenerUnderTest.consumeClickedOnLoggedTermEvent();
    listenerUnderTest.consumePressedLastCalcuationTabEvent("dummy");
    listenerUnderTest.consumePressedOnLogOptionsTabEvent();

    expect(logWindowEventHandler.handleClickedOnLoggedTermEvent).toHaveBeenCalledTimes(1);
    expect(logWindowEventHandler.handlePressedLastCalculationsTabEvent).toHaveBeenCalledTimes(1);
    expect(logWindowEventHandler.handlePressedLogOptionsTabEvent).toHaveBeenCalledTimes(1);
});

/**
 * Verify that no events will be passed to a handler, if the listener is inactive
 */
test("do not consume events, if the listener is inactive", () => {
    listenerUnderTest.deactivateListener();
    listenerUnderTest.consumeClickedOnLoggedTermEvent();
    listenerUnderTest.consumePressedLastCalcuationTabEvent("dummy");
    listenerUnderTest.consumePressedOnLogOptionsTabEvent();
    
    expect(listenerUnderTest.__listenerIsActive).toBe(false);
    expect(logWindowEventHandler.handleClickedOnLoggedTermEvent).toHaveBeenCalledTimes(0);
    expect(logWindowEventHandler.handlePressedLastCalculationsTabEvent).toHaveBeenCalledTimes(0);
    expect(logWindowEventHandler.handlePressedLogOptionsTabEvent).toHaveBeenCalledTimes(0);
});