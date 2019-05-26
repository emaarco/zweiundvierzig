'use-strict';

import TermBuilder from "../business/TermBuilder.js";

/**
 * Handler, processing calculationEvents retrieved from the keyboard / the calculator gui buttons
 * Passes the events to every registered subscriber.
 */
export default class CalculationEventHandler {

    /**
     * A constructor which initializes an empty set of subscribers.
     */
    constructor() {
        this.__subscribers = new Set(null);
    }

    /**
     * Publishes a new number event to every subscriber
     * @param {String} calledNumber number event retrieved from gui / keyboard
     */
    handleNumberEvent(calledNumber) {
        this.__subscribers.forEach((subscriber) => {
            subscriber.consumeNumberEvent(calledNumber); 
        });
    }

    /**
     * Publishes a new operator event to every subscriber
     * @param {String} calledOperator operator event retrieved from gui / keyboard
     */
    handleOperatorEvent(calledOperator) {
        this.__subscribers.forEach((subscriber) => {
            subscriber.consumeOperatorEvent(calledOperator);
        });
    }

    /**
     * Publishes a new special event to every subscriber
     * @param {String} calledEvent special event retrieved from gui / keyboard
     */
    handleSpecialEvent(calledEvent) {
        this.__subscribers.forEach((subscriber) => {
            subscriber.consumeSpecialEvent(calledEvent);
        });
    }

    // ****************************************************************************************** //
    // ************************* HANDLER MAINTENDANCE METHODS ********************************** // 

    /**
     * Adds a new subscriber to the list of subscribers
     * if he has not allready subscribed. 
     * Also checks if a subscriber is a valid subscriber
     * @param {TermBuilder} newSubscriber subscriber to be added to the list
     */
    addSubscriber(newSubscriber) {
        if (this.__isSubscriberValid(newSubscriber)) {
            if (this.__subscribers.has(newSubscriber)) {
                console.log("Consumer allready subscribed to the events");
            } else {
                this.__subscribers.add(newSubscriber);
                this.__subscribers.has(newSubscriber)
                    ? console.log("Subscriber successfully added to the list")
                    : console.log("An error occured while adding the new subscriber to the list")
            }
        } else {
            console.log("Given subscriber is not valid! Subscriber could not be added");
        }
    }

    /**
     * Removes a given subscriber from the list of all subscribers.
     * @param {TermBuilder} subscriberToBeRemoved subscrier to be removed from the list
     */
    removeSubscriber(subscriberToBeRemoved) {
        if (this.__subscribers.has(subscriberToBeRemoved)) {
            console.log("Removing subscriber from the list of subscribers");
            this.__subscribers.delete(subscriberToBeRemoved);
        } else {
            console.log("No subscriber known by this name");
        }
    }

    // ****************************************************************************************** //
    // ***************************** PRIVATE HELPER METHODS ************************************* // 

    /**
     * private method, checking if a subscriber to be added is valid.
     * A subscriber is valid if he is an instance of 'TermBuilder' 
     * In this case it can be guaranteed that the subscriber will recieve the events
     * @param {TermBuilder} subscriberToBeChecked given subscriber
     * @returns {boolean} true if the subscriber is an instance of the term builder class
     */
    __isSubscriberValid(subscriberToBeChecked) {
        if (subscriberToBeChecked instanceof TermBuilder) {
            return true;
        }
        return false;
    }
}