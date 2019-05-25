'use-strict';

import OnOffEventHandler from "../handler/OnOffEventHandler.js";
import CalculationEventHandler from "../handler/CalculationEventHandler.js"


/***
 * This class is used for catching calculator button events
 * It passes the button events to the calculation listener in case the listener is active.
 */
export default class CalculationEventListener {

    /**
     * A constructor which initializes an empty set of subscribers.
     * and defines an onOffEventHandler / calculationEventHandler
     */
    constructor(onOffEventHandler, calculationEventHandler) {
        this.__listenerIsActive = true;
        this.__onOffEventHandler;
        this.__calculationEventHandler;
    }

    /**
     * Publishes a new number event to every subscriber
     * @param {String} calledNumber number event retrieved from gui / keyboard
     */
    consumeNumberEvent(calledNumber) {
        if (this.__listenerIsActive) {
            this.__calculationEventHandler.handleNumberEvent(calledNumber);
        }
    }

    /**
     * Publishes a retrieved operator event to the calculation event handler
     * @param {String} calledOperator operator event retrieved from gui
     */
    consumeOperatorEvent(calledOperator) {
        if (this.__listenerIsActive) {
            this.__calculationEventHandler.handleOperatorEvent(calledOperator);
        }
    }

    /**
     * Publishes a retrieved special event to the calculation event handler
     * @param {String} calledEvent special event retrieved from gui / keyboard
     */
    consumeSpecialEvent(calledEvent) {
        if (this.__listenerIsActive) {
            this.__calculationEventHandler.handleSpecialEvent(calledEvent)
        }
    }

    /**
     * 
     */
    consumeOnOffEvent() {
        this.__onOffEventHandler.handleOnOffEvent();
    }

    // ****************************************************************************************** //
    // ************************* LISTENER MAINTENDANCE METHODS ********************************** // 

    /**
     * Activates the keyboard listener needed to process calculation events
     */
    activateCalculationListener() {
        this.__listenerIsActive = true;
    }

    /**
     * Deactivates the keyboard listener needed to process calculation events
     * If the listener is inactive, no more events will be published to the subscribers
     */
    deactivateCalculationListener() {
        this.__listenerIsActive = false;
    }

    /**
     * 
     */
    setCalculationEventHandler(calculationEventHandler) {
        this.__calculationEventHandler = calculationEventHandler;
    }

    /**
     * 
     */
    setOnOffEventHandler(onOffEventHandler) {
        this.__onOffEventHandler = onOffEventHandler;
    }
}