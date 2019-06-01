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
     * Retrieves an pressedLastCalculationTabEvent. 
     * Passes this event to logWindowEventHandler, if it is active.
     */
    consumePressedLastCalcuationTabEvent() {
        if (this.__listenerIsActive) {
            this.__logWindowEventHandler.handlePressedLastCalculationsTabEvent();
        }
    }

    /**
     * Retrieves an pressedLastCalculationTabEvent. 
     * Passes this event to logWindowEventHandler, if it is active.
     */
    consumePressedOnLogOptionsTabEvent() {
        if (this.__listenerIsActive) {    
            this.__logWindowEventHandler.handlePressedLogOptionsTabEvent();
        }
    }

    /**
     * Retrieves a pressedLastCalculationTabEvent. 
     * The event contains the term, the user pressed on. 
     * Passes this event to logWindowEventHandler, if it is active.
     * @param {String} loggedTerm 
     */
    consumeClickedOnLoggedTermEvent(loggedTerm) {
        if (this.__listenerIsActive) {
            this.__logWindowEventHandler.handleClickedOnLoggedTermEvent(loggedTerm);
        }
    }

    /**
     * Retrieves an event to save a current log under a specific file name on a fake server.
     * Extracts the file name from the current document
     * Passes the event to the log´s main handler
     */
    consumeSaveLogEvent() {
        const fileName = document.getElementById("saveLogContent").value;
        this.__logWindowEventHandler.handleSaveLogEvent(fileName);
    }

    /**
     * Retrieves an event to load a current log which is saved under a specific file name on the fake server.
     * Extracts the file name from the current document
     * Passes the event to the log´s main handler
     */
    consumeLoadLogEvent() {
        const fileName = document.getElementById("loadLogOptions").value;
        this.__logWindowEventHandler.handleLoadLogEvent(fileName);
    }

    /**
     * Retrieves an event to delete a current log under which is saved under a specific file name on a fake server.
     * Extracts the file name from the current document
     * Passes the event to the log´s main handler
     */
    consumeDeleteLogEvent() {
        const fileName = document.getElementById("deleteLogOptions").value;
        this.__logWindowEventHandler.handleDeleteLogEvent(fileName);
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
     * Setter method to initialize the log´s main event handler
     * @param {LogWindowEventHandler} logWindowEventHandler  log-main event handler
     */
    setLogWindowEventHandler(logWindowEventHandler) {
        this.__logWindowEventHandler = logWindowEventHandler;
    }
}