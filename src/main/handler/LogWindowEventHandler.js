'use strict'

import CalculatorLogWindow from "../gui/CalculatorLogWindow.js";
import CalculationEventHandler from "./CalculationEventHandler.js";
import CalculatorLogService from "../business/CalculatorLogService.js";

export default class LogWindowEventHandler {


    /**
     * constructor initializing the instances, needed to process LogWindowEvents
     * @param {CalculationEventHandler} calculationEventHandler 
     * @param {CalculatorLogWindow} calculatorLogWindow 
     * @param {CalculatorLogService} calculatorLogService
     */
    constructor(calculationEventHandler, calculatorLogWindow, calculatorLogService) {
        this.__calculatorLogWindow = calculatorLogWindow;
        this.__calculationEventHandler = calculationEventHandler; 
        this.__calculatorLogService = calculatorLogService;
    }

    /**
     * Retrieves a pressedLastCalculationsTabEvent
     * Passes this event, without any changes to the calculatorLogGUI
     */
    handlePressedLastCalculationsTabEvent() {
        this.__calculatorLogWindow.switchToLastCalculationsTab();
    }

    /**
     * Retrieves a pressedLogOptionsTabEvent
     * Passes this event, without any changes to the calculatorLogGUI
     */
    handlePressedLogOptionsTabEvent() {
        this.__calculatorLogWindow.switchToLogOptionsTab();
    }

    /**
     * Retrieves a clickedonLoggedTermEvent
     * Extracts the result out of the clicked term and passes the result to the calculationEventHandler,
     * which will further pass it to the termBuilder
     * If an extraction of the result is not possible the method will write an exception to the console
     * @param {String} loggedTerm term the user clicked on  
     */
    handleClickedOnLoggedTermEvent(loggedTerm) {
        const splittedTerm = loggedTerm.split("=");
        const calculationResult = splittedTerm[1];
        if (splittedTerm.length === undefined || splittedTerm.length != 2) {
            console.error("could not retrieve a result for the logged term. That should never happen!")
        } else {
            const resultAsFloat = parseFloat(calculationResult);
            this.__calculationEventHandler.handleNumberEvent(resultAsFloat);
        }
    }

    /**
     * Retrieves a saveLogEvent and passes it, without any changes to the calculatorLogService
     * @param {String} fileName fileName under which the log should be saved
     */
    handleSaveLogEvent(fileName) {
        this.__calculatorLogService.saveCurrentLogToServer(fileName, () => {});
    }

    /**
     * Retrieves a deleteLogEvent and passes it, without any changes to the calculatorLogService
     * @param {String} fileName fileName of the log to be deleted
     */
    handleDeleteLogEvent(fileName) {
        this.__calculatorLogService.deleteLogFromServer(fileName, () => {});
    }

    /**
     * Retrieves a loadLogEvent and passes it, without any changes to the calculatorLogService
     * @param {String} fileName fileName of the log to be loaded 
     */
    handleLoadLogEvent(fileName) {
        this.__calculatorLogService.loadLogFromServer(fileName, () => {});
    }
}