"use strict";

import LogWindowEventHandler from "../handler/LogWindowEventHandler.js";

/**
 * Class listening to all kind of events corresponding to the log-window
 */
export default class LogWindowEventListener {

    /**
     * Constructor defining a listener-activation state and a handler,
     * which will recieve the event to further process them.
     */
    constructor() {
        this.__logWindowEventHandler;
        this.__listenerIsActive = true;
    }

    /**
     * 
     */
    consumePressedLastCalcuationTabEvent() {
        if (this.__listenerIsActive) {
            this.__logWindowEventHandler.handlePressedLastCalculationsTabEvent();
        }
    }

    /**
     * 
     */
    consumePressedOnLogOptionsTabEvent() {
        if (this.__listenerIsActive) {    
            this.__logWindowEventHandler.handlePressedLogOptionsTabEvent();
        }
    }

    /**
     * 
     * @param {*} loggedTerm 
     */
    consumeClickedOnLoggedTermEvent(loggedTerm) {
        if (this.__listenerIsActive) {
            this.__logWindowEventHandler.handleClickedOnLoggedTermEvent(loggedTerm);
        }
    }
    

   // ****************************************************************************************** //
    // ************************* LISTENER MAINTENDANCE METHODS ********************************* // 

    /**
     * Activates the keyboard listener needed to process calculation events
     */
    activateListener() {
        this.__listenerIsActive = true;
    }

    /**
     * Deactivates the keyboard listener needed to process calculation events
     * If the listener is inactive, no more events will be published to the subscribers
     */
    deactivateListener() {
        this.__listenerIsActive = false;
    }

    /**
     * 
     * @param {LogWindowEventHandler} logWindowEventHandler 
     */
    setLogWindowEventHandler(logWindowEventHandler) {
        this.__logWindowEventHandler = logWindowEventHandler;
    }
}