'use strict'

import CalculatorLogWindow from "../gui/CalculatorLogWindow.js";
import AlertWindow from "../gui/AlertWindow.js";

export default class CalculatorLogService {

    /**
     * constructur initializing the log-Service variables to process the last 5 results
     * @param {CalculatorLogWindow} calculatorLogWindow logWindow to publish the last results to the user
     */
    constructor(calculatorLogWindow, alertWindow) {
        if (calculatorLogWindow instanceof CalculatorLogWindow
            && alertWindow instanceof AlertWindow) {
            this.__calculatorLogWindow = calculatorLogWindow;
            this.__alertWindow = alertWindow;
        }
        this.__log = [];
        this.__initializeSavedLogsFromLocalStorage();
    }


    // ****************************************************************************************** //
    // ************************** SAVE RESULTS TO THE TERM LOG ********************************** // 

    /**
     * Saves the given term to the calculation log.
     * A new entry will be created if there are less than five existing entries
     * If there are allready five entries, the last term will be overwriten
     * @param {Term} term term to be saved to the log
     */
    logCalculatedTerm(termToBeAdded) {
        this.__alertWindow.publishTermSuccessfullyCalculatedAlert();
        if (this.__log.length < 5) {
            this.__log.push(termToBeAdded.toString());
            this.__calculatorLogWindow.addNewTermListEntry(termToBeAdded.toString(), this.__log.length - 1);
        } else {
            this.__addTermToLogAndRemoveLastItem(termToBeAdded.toString());
            this.__calculatorLogWindow.modifyTermListEntries(...this.__log);
        }
    }

    /**
     * Puts every log entry to the next possible position in the log (currentPosition + 1)
     * The last item will get 'removed' as the log would overflow otherwise.
     * @param {String} term term to be added to the log
     */
    __addTermToLogAndRemoveLastItem(termToBeAdded) {
        this.__log.unshift(termToBeAdded);
        this.__log.pop();
    }

    // ****************************************************************************************** //
    // ************************** SAVE / LOAD MY CALCULATION LOGS ******************************* // 

    /**
     * Saves a log under a specific file name on the fake server
     * @param {String} logKey key / filename under which, the log will be saved
     * @param {Function} callback callback for handling possible falling exceptions
     */
    saveCurrentLogToServer(logKey, callback) {

        let exception = null;

        try {
            setTimeout(() => {

                let savedLogs = this.__getAllLocalStorageKeys();
                const keyExists = savedLogs.indexOf(logKey) === -1 ? false : true;

                localStorage.setItem(logKey, JSON.stringify(this.__log));
                this.__alertWindow.publishLogSuccessfullySavedAlert(logKey, keyExists);

                if (!keyExists) {
                    this.__calculatorLogWindow.addLogToSelectableLogs(logKey);
                }

            }, 2500);
        } catch (ex) {
            exception = ex;
        }
        callback(exception);
    }

    /**
     * Deletes a log which is saved by a specific file name from the fake server.
     * @param {String} logKey key / filename of the saved log, to be deleted
     * @param {Function} callback callback for handling possible falling exceptions
     */
    deleteLogFromServer(logKey, callback) {

        let exception = null;

        try {
            localStorage.removeItem(logKey);
            setTimeout(() => {
                this.__calculatorLogWindow.removeLogFromSelectableLogs(logKey);
                this.__alertWindow.publishLogSuccessfullyDeletedAlert(logKey);
            }, 2500);
        } catch (ex) {
            exception = e;
        }
        callback(exception);
    }

    /**
     * Loads a selected log from the fake server and replaces the existing log with it
     * @param {String} logKey key / filename of the saved log to be loaded
     * @param {Function} callback callback for handling possible falling exceptions
     */
    loadLogFromServer(logKey, callback) {

        let exception = null;
        let loadedLog = [];

        try {
            setTimeout(() => {
                loadedLog = JSON.parse(localStorage.getItem(logKey));
                if (loadedLog.length !== 0) {
                    loadedLog.reverse;
                    loadedLog.forEach((logEntry) => {
                        this.logCalculatedTerm(logEntry);
                    });
                    this.__alertWindow.publishLogSuccessfullyLoadedAlert(logKey);
                }
            }, 2500);

        } catch (ex) {
            exception = ex;
        }
        callback(exception, loadedLog);
    }

    /**
     * setup method, to retrieve all logs, which are currently saved to the local-storage.
     * it is initializing them to the calculatorLogGUI 
     */
    __initializeSavedLogsFromLocalStorage() {
        const savedLogs = this.__getAllLocalStorageKeys();
        savedLogs.forEach((log) => {
            this.__calculatorLogWindow.addLogToSelectableLogs(log);
        });
    }

    /**
     * gets all current keys of the local storage items
     * @returns {Array} array containg all local storage items
     */
    __getAllLocalStorageKeys() {
        const localStorageItems = Object.keys(localStorage);
        return localStorageItems;
    }

}