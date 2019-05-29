"use strict";

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
    constructor() {
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

    consumeCalculateEvent() {
        if (this.__listenerIsActive) {
            this.__calculationEventHandler.handleCalculateEvent();
        }
    }

    /**
     * Consumes an onOffEvent from the calculator gui buttons and publishes
     * it to the onOffEventHandler. (also if the listener is inactive!)
     */
    consumeOnOffEvent() {
        this.__onOffEventHandler.handleOnOffEvent();
    }

    // ****************************************************************************************** //
    // ************************* LISTENER MAINTENDANCE METHODS ********************************** // 

    /**
     * Activates the keyboard listener needed to process calculation events
     * If the listener is active, all kind of events will be pushed to the handlers
     */
    activateCalculationListener() {
        this.__listenerIsActive = true;
    }

    /**
     * Deactivates the keyboard listener needed to process calculation events
     * If the listener is inactive, no more events will be published to the handlers
     * (except onOffEvents, as without them it wouldn´t be possible to turn the calculator on again)
     */
    deactivateCalculationListener() {
        this.__listenerIsActive = false;
    }

    /**
     * Initializes the calculationEventHandler of the CalculationEventListener
     * The calculationEventHandler retrieves all calculation related gui button events
     * (numberEvents / specialEvents / operatorEvents)
     * @param {calculationEventHandler} calculationEventHandler a calculation event handler
     */
    setCalculationEventHandler(calculationEventHandler) {
        if (calculationEventHandler instanceof CalculationEventHandler) {
            this.__calculationEventHandler = calculationEventHandler;
        }
    }

    /**
     * Initializes the onOffEventHandler of the CalculationEventListener
     * The onOffEventHandler retrieves all on / off relates gui button events
     * @param {OnOffEventHandler} onOffEventHandler an onOffEventHandler
     */
    setOnOffEventHandler(onOffEventHandler) {
        if (onOffEventHandler instanceof OnOffEventHandler) { 
            this.__onOffEventHandler = onOffEventHandler;
        }
    }
}