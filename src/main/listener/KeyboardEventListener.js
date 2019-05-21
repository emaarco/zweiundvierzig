'use strict'

import keyboardCalculatorOperationsEnum from "../enum/KeyboardCalculatorOperationsEnum.js";
import CalculationEventListener from "./CalculationEventListener.js";
import KeyboardEventToCalculatorEventMapper from "../mapper/KeyboardToCalculatorMapper.js";
import AlertWindow from "../gui/AlertWindow.js";

/***
 * This class is used for catching and filtering keyboard events
 * as it passes them on to the mainListener which is processing the keyboard events
 * as well as additional ButtonPressEvents from the HTML-frontend
 */
export default class KeyboardEventListener {

    /**
     * Initializes the mainListener, 
     * which will recieve the valid incoming keyboardEvents
     * @param {CalculationEventListener} mainListener 
     * @param {CalculatorOnOffEventListener} onOffListener
     * @param {AlertWindow} alertWindow
     */
    constructor(mainListener, onOffListener, alertWindow) {
        this.__mainListener = mainListener;
        this.__onOffListener = onOffListener;
        this.__alertWindow = alertWindow;
    }

    /**
     * Retrieves a buttonPressed-Event from the keyboard listener.
     * Checks wheter the event is a valid Calculator event or not.
     * Passes the event on to the main listener.
     * @param {String} buttonPressed contains the button pressed on the keyboard 
     */
    consumeButtonPressedEvent(buttonPressed) {
        if (this.__isValidCalculatorEvent(buttonPressed)) {
            let eventCategory = this.__determineEventCategory(buttonPressed);
            this.__passToMainListener(eventCategory, buttonPressed);
        }
    }

     /**
     * Checks if the buttonPressed-Event is a valid Calulator-Event
     * Filters out invalid buttonPressedEvents as it returns false for them.      
     * @param {String} buttonPressed contains the button pressed on the keyboard 
     * @returns true if buttonPressed-Event is a valid Calculator Event, false if not 
     */
    __isValidCalculatorEvent(buttonPressed) {
        if (keyboardCalculatorOperationsEnum.number.includes(buttonPressed)) {
            return true;
        }
        if (keyboardCalculatorOperationsEnum.operator.includes(buttonPressed)) {
            return true;
        }
        if (keyboardCalculatorOperationsEnum.seperator.includes(buttonPressed)) {
            return true;
        }
        if (keyboardCalculatorOperationsEnum.specialOps.includes(buttonPressed)) {
            return true;
        }
        if (keyboardCalculatorOperationsEnum.onOff.includes(buttonPressed)) {
            return true;
        }
        this.__alertWindow.publishInvalidKeyboardInputWarning(buttonPressed);
    }


    /***
     * Determines the event-category of the buttonPressed-Event.
     * The event category gets used to call the mainListener
     * @param {String} buttonPressed contains the button pressed on the keyboard 
     * @returns event category
     */
    __determineEventCategory(buttonPressed) {
        if (keyboardCalculatorOperationsEnum.number.includes(buttonPressed)) {
            return "numberEvent";
        } else if (keyboardCalculatorOperationsEnum.operator.includes(buttonPressed)) {
            return "operatorEvent";
        } else if (keyboardCalculatorOperationsEnum.seperator.includes(buttonPressed)) {
            return "numberEvent";
        } else if (keyboardCalculatorOperationsEnum.specialOps.includes(buttonPressed)) {
            return "specialEvent";
        } else if (keyboardCalculatorOperationsEnum.onOff.includes(buttonPressed)) {
            return "onOffEvent";
        } else {
            return "unknownEvent";
        }
    }

    /**
     * Passes the button pressed on the keyboard to his corresponding mainListener method.
     * @param {String} eventCategory category determining which mainListener method will be called
     * @param {String} buttonPressed contains the button pressed on the keyboard 
     */
    __passToMainListener(eventCategory, buttonPressed) {
        buttonPressed = KeyboardEventToCalculatorEventMapper.mapKeyboardToCalculatorEvent(buttonPressed);
        switch (eventCategory) {
            case "numberEvent": 
                this.__mainListener.numberEvent(buttonPressed);
                break;

            case "operatorEvent": 
                this.__mainListener.operatorEvent(buttonPressed);
                break; 

            case "specialEvent": 
                this.__mainListener.specialEvent(buttonPressed);
                break; 

            case "onOffEvent": 
                this.__onOffListener.consumeOnOffEvent();
                break;

            default: 
                throw new Error("no valid event category given. Check the determineEventCategory function");
        }
    }

}