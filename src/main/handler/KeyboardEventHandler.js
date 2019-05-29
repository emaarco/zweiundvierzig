"use strict";

import OnOffEventHandler from "./OnOffEventHandler.js";
import CalculationEventHandler from "./CalculationEventHandler.js";
import AlertWindow from "../gui/AlertWindow.js";
import keyboardCalculatorOperationsEnum from "../enum/KeyboardCalculatorOperationsEnum.js";
import KeyboardEventToCalculatorEventMapper from "../mapper/KeyboardToCalculatorMapper.js";

/**
 * A class that handles keyboard events - 
 * it checks every event on its validity.
 * passes valid events to a corresponding handler.
 */
export default class KeyboardEventHandler {

    /**
     * Constructor initializing the keyboard event handler
     * @param {OnOffEventHandler} onOffEventHandler 
     * @param {CalculationEventHandler} calculationEventHandler 
     * @param {AlertWindow} alertWindow 
     */
    constructor(onOffEventHandler, calculationEventHandler, alertWindow) {
        this.__onOffEventHandler = onOffEventHandler;
        this.__calculationEventHandler = calculationEventHandler;
        this.__alertWindow = alertWindow;
    }

    /**
     * Passes the keyboard event to the corresponding event handler.
     * Maps every valid event to a generalized event
     * @param {String} buttonPressed the key pressed on the keyboard
     */
    handleKeyboardEvent(buttonPressed) {
        if (this.__isValidCalculatorEvent(buttonPressed)) {
            let eventCategory = this.__determineEventCategory(buttonPressed);
            buttonPressed = KeyboardEventToCalculatorEventMapper.mapKeyboardToCalculatorEvent(buttonPressed);
            this.__passToCorrespondingHandler(eventCategory, buttonPressed);
        } else {
            this.__alertWindow.publishInvalidKeyboardInputWarning(buttonPressed);
        }
    }

    // ****************************************************************************************** //
    // ***************************** PRIVATE HELPER METHODS ************************************* // 

     /**
     * Checks if the buttonPressed-Event is a valid Calulator-Event
     * Filters out invalid buttonPressedEvents as it returns false for them.      
     * @param {String} buttonPressed contains the button pressed on the keyboard 
     * @returns {boolean} true if buttonPressed-Event is a valid Calculator Event, false if not 
     */
    __isValidCalculatorEvent(buttonPressed) {
        if (keyboardCalculatorOperationsEnum.number.includes(buttonPressed)) {
            return true;
        }
        if (keyboardCalculatorOperationsEnum.operator.includes(buttonPressed)) {
            return true;
        }
        if (keyboardCalculatorOperationsEnum.calculate.includes(buttonPressed)) {
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
        return false;
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
        } else if (keyboardCalculatorOperationsEnum.calculate.includes(buttonPressed)) {
            return "calculateEvent";
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
     * Passes the button pressed on the keyboard to his corresponding handler.
     * @param {String} eventCategory category determining which mainListener method will be called
     * @param {String} buttonPressed contains the button pressed on the keyboard 
     */
    __passToCorrespondingHandler(eventCategory, buttonPressed) {
        switch (eventCategory) {
            case "numberEvent": 
                this.__calculationEventHandler.handleNumberEvent(buttonPressed);
                break;

            case "operatorEvent": 
                this.__calculationEventHandler.handleOperatorEvent(buttonPressed);
                break;
                
            case "calculateEvent": 
                this.__calculationEventHandler.handleCalculateEvent();
                break;

            case "specialEvent": 
                console.log(buttonPressed);
                this.__calculationEventHandler.handleSpecialEvent(buttonPressed);
                break; 

            case "onOffEvent": 
                this.__onOffEventHandler.handleOnOffEvent();
                break;

            default: 
                throw new Error("no valid event category given. Check the determineEventCategory function");
        }
    }


}