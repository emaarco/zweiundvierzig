"use strict";

import KeyboardEventHandler from "../handler/KeyboardEventHandler.js"

/***
 * This class is used for catching keyboard events
 * It passes the keyboard events to the keyboard listener in case the listener is active.
 */
export default class KeyboardEventListener {

    /**
     * Constructor defining a keyboardEventHandler 
     * and setting the listener to be active
     */
    constructor() {
        this.__keyboardEventHandler;
        this.__listenerIsActive = true;
    }

    /**
     * Passes the recieved events to the keyboard event handler in case the listener is activated.
     * @param {String} buttonPressed contains the button pressed on the keyboard 
     */
    consumeButtonPressedEvent(buttonPressed) {
        if (this.__isShift(buttonPressed)) {
            return;
        }

        if (this.__listenerIsActive || this.__isESC(buttonPressed)) {
            this.__keyboardEventHandler.handleKeyboardEvent(buttonPressed);
        }
    }

    // ****************************************************************************************** //
    // ************************* LISTENER MAINTENDANCE METHODS ********************************** // 

    /**
     * Activates the keyboard listener needed to process calculation events
     */
    activateKeyboardListener() {
        this.__listenerIsActive = true;
    }

    /**
     * Deactivates the keyboard listener needed to process calculation events
     * If the listener is inactive, no more events will be published to the subscribers
     */
    deactivateKeyboardListener() {
        this.__listenerIsActive = false;
    }

    /**
     * Initializes the keyboardEventHandler, which retrieves keyboardEvents, when the listener is active.
     * @param {KeyboardEventHandler} keyboardEventHandler a keyboardEventHandler
     */
    setKeyboardEventHandler(keyboardEventHandler) {
        this.__keyboardEventHandler = keyboardEventHandler
    }

    /**
     * Determines wheter the key pressed was the shift key or not
     * @param {String} buttonPressed pressed key
     * @returns {boolean} true if the pressed key was the shift key, false if not
     */
    __isShift(buttonPressed) {
        return buttonPressed === "Shift" 
            ? true
            : false;
    }

    /**
     * Determines wheter the key pressed was the escape key or not.
     * needs to be checked in case the calculator is offline! 
     * -> in case the hole keyboard would be offline it wouldnt be possible to turn it on again
     * @param {String} buttonPressed pressed key
     * @returns {boolean} true if the pressed key was the escape key, false if not
     */
    __isESC(buttonPressed) {
        return buttonPressed === "Escape" 
            ? true
            : false;
    }
}