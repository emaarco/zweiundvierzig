'use strict'

import keyboardToCalculatorEventMappingEnum from "../enum/KeyboardToCalculatorEventMappingEnum.js";

export default class KeyboardToCalculatorEventMapper {
   
    /**
     * maps a keyboardEvent to a matching calculationEvent 
     * using an enum representations of all events which require a mapping
     * @param {*} keyboardEvent contains the button pressed on the keyboard 
     * @returns mapped keyboard event (keyboard -> calculatorListener)
     */
    static mapKeyboardToCalculatorEvent(keyboardEvent) {
        return keyboardToCalculatorEventMappingEnum[keyboardEvent] != null 
            ? keyboardToCalculatorEventMappingEnum[keyboardEvent] 
            : keyboardEvent;
    }
}