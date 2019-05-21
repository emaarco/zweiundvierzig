'use-strict';

export default class CalculationEventListener {

    /**
     * A constructor which initializes an empty set of subscribers.
     */
    constructor() {
        this.subscribers = new Set(null);
    }

    /**
     * Adds a new subscriber to the list of subscribers
     * if he has not allready subscribed. 
     * Also checks if a subscriber is a valid subscriber
     * @param {} newSubscriber subscriber to be added
     */
    addSubscriber(newSubscriber) {
        if (this.__isSubscriberValid(newSubscriber)) {
            if (this.subscribers.has(newSubscriber)) {
                console.log("Consumer allready subscribed to the events");
            } else {
                this.subscribers.add(newSubscriber);
                this.subscribers.has(newSubscriber)
                    ? console.log("Subscriber successfully added to the list")
                    : console.log("An error occured while adding the new subscriber to the list")
            }
        } else {
            console.log("Given subscriber is not valid! Subscriber could not be added");
        }
    }

    removeSubscriber(subscriberToBeRemoved) {
        if (this.subscribers.has(subscriberToBeRemoved)) {
            console.log("Removing subscriber from the list of subscribers");
            this.subscribers.delete(subscriberToBeRemoved);
        } else {
            console.log("No subscriber known by this name");
        }
    }

    /**
     * Publishes a new number event to every subscriber
     * @param {*} calledNumber 
     */
    numberEvent(calledNumber) {
        document.getElementById("calculationArea").innerHTML += calledNumber;
        console.log(calledNumber);
        this.subscribers.forEach((subscriber => {
            subscriber.consumeNumberEvent(calledNumber); 
        }));
    }

    /**
     * Publishes a new operator event to every subscriber
     * @param {*} calledOperator 
     */
    operatorEvent(calledOperator) {
        console.log(calledOperator);
        document.getElementById("calculationArea").innerHTML += calledOperator;
        this.subscribers.forEach((subscriber) => {
            subscriber.consumeOperatorEvent(calledOperator);
        })
    }

    /**
     * Publishes a new special event to every subscriber
     * @param {*} calledEvent 
     */
    specialEvent(calledEvent) {
        console.log(calledEvent);
        let doc = document.getElementById("calculationArea");
        doc.innerHTML = doc.innerHTML.substr(0, doc.innerHTML.length-1);
        this.subscribers.forEach((subscriber) => {
            subscriber.consumeSpecialEvent(calledEvent);
        });
    }

    /**
     * private method, checking if a subscriber to be added is valid.
     * A subscriber is valid if he inherits from the CalculatorConsumerBase
     * @param {*} subscriberToBeChecked
     */
    __isSubscriberValid(subscriberToBeChecked) {
        return true;
        // return subscriberToBeChecked instanceof CalculatorConsumerBase;
    }
}