"use strict";

/**
 * Testing the keyboard listener 
 * - setting it active / inactive and check the behaviour. 
 */

import KeyboardEventHandler from "../../main/handler/KeyboardEventHandler.js";
import KeyboardEventListener from "../../main/listener/KeyboardEventListener.js";

 jest.mock("../../main/handler/KeyboardEventHandler.js");

 const keyboardEventHandler = new KeyboardEventHandler();
 const listenerUnderTest = new KeyboardEventListener();
 listenerUnderTest.setKeyboardEventHandler(keyboardEventHandler);

 /**
  * Resets the handleKeyboardEvent mock, as it gets called more than one time
  */
 afterEach(() => {
    keyboardEventHandler.handleKeyboardEvent.mockClear();
 });

 /**
  * Pass valid keyboard events to the keyboard event handler
  */
 test("pass valid keyboard event to the handler", () => {
    listenerUnderTest.consumeButtonPressedEvent("5");
    listenerUnderTest.consumeButtonPressedEvent("Backspace");
    listenerUnderTest.consumeButtonPressedEvent(".");
    listenerUnderTest.consumeButtonPressedEvent("*");
    listenerUnderTest.consumeButtonPressedEvent("=");

    expect(keyboardEventHandler.handleKeyboardEvent).toHaveBeenCalledTimes(5);
 });

 /**
  * Do not pass valid events, when the listener is inactive.
  * Just onOffEvents are allowed to pass, as they are needed to turn the calculator on again
  */
 test("do not pass valid events, when listener is inactive", () => {
    listenerUnderTest.deactivateKeyboardListener();
    expect(listenerUnderTest.__listenerIsActive).toBe(false);
    listenerUnderTest.consumeButtonPressedEvent("5");
    expect(keyboardEventHandler.handleKeyboardEvent).toHaveBeenCalledTimes(0);
 });

 /**
  * Do pass onOffEvents, despite the listener is inactive
  */
 test("do pass onOffEvent, when listener is inactive", () => {
    listenerUnderTest.deactivateKeyboardListener();
    expect(listenerUnderTest.__listenerIsActive).toBe(false);
    listenerUnderTest.consumeButtonPressedEvent("Escape");
    expect(keyboardEventHandler.handleKeyboardEvent).toHaveBeenCalledTimes(1);
 });