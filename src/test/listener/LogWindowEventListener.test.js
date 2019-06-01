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
    logWindowEventHandler.handleDeleteLogEvent.mockClear();
    logWindowEventHandler.handleSaveLogEvent.mockClear();
    logWindowEventHandler.handleDeleteLogEvent.mockClear();
    logWindowEventHandler.handleLoadLogEvent.mockClear();
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
    listenerUnderTest.consumeDeleteLogEvent();
    listenerUnderTest.consumeSaveLogEvent();
    listenerUnderTest.consumeLoadLogEvent();

    expect(logWindowEventHandler.handleClickedOnLoggedTermEvent).toHaveBeenCalledTimes(1);
    expect(logWindowEventHandler.handlePressedLastCalculationsTabEvent).toHaveBeenCalledTimes(1);
    expect(logWindowEventHandler.handlePressedLogOptionsTabEvent).toHaveBeenCalledTimes(1);
    expect(logWindowEventHandler.handleDeleteLogEvent).toHaveBeenCalledTimes(1);
    expect(logWindowEventHandler.handleSaveLogEvent).toHaveBeenCalledTimes(1);
    expect(logWindowEventHandler.handleLoadLogEvent).toHaveBeenCalledTimes(1);
});

/**
 * Verify that no events will be passed to a handler, if the listener is inactive
 */
test("do not consume events, if the listener is inactive", () => {
    listenerUnderTest.deactivateListener();
    listenerUnderTest.consumeClickedOnLoggedTermEvent();
    listenerUnderTest.consumePressedLastCalcuationTabEvent("dummy");
    listenerUnderTest.consumePressedOnLogOptionsTabEvent();
    listenerUnderTest.consumeDeleteLogEvent();
    listenerUnderTest.consumeSaveLogEvent();
    listenerUnderTest.consumeLoadLogEvent();
    
    expect(listenerUnderTest.__listenerIsActive).toBe(false);
    expect(logWindowEventHandler.handleClickedOnLoggedTermEvent).toHaveBeenCalledTimes(0);
    expect(logWindowEventHandler.handlePressedLastCalculationsTabEvent).toHaveBeenCalledTimes(0);
    expect(logWindowEventHandler.handlePressedLogOptionsTabEvent).toHaveBeenCalledTimes(0);
    expect(logWindowEventHandler.handleDeleteLogEvent).toHaveBeenCalledTimes(1);
    expect(logWindowEventHandler.handleSaveLogEvent).toHaveBeenCalledTimes(1);
    expect(logWindowEventHandler.handleLoadLogEvent).toHaveBeenCalledTimes(1);
});