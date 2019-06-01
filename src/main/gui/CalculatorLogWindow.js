"use strict";

import navigationTabStatusEnum from "../enum/NavigationTabStatusEnum.js";

export default class CalculatorLogWindow {

    /**
     * Constructor defining a variable for an event handler which will recieve clickEvents, 
     * on the here defined log-items 
     */
    constructor() {
        this.__logWindowEventListener;
    }

    // ****************************************************************************************** //
    // ***************************** MAINTANDANCE METHODS** ************************************* // 
    
    /**
     * Setter method to initialize the logWindowEventListener, 
     * which gets used to create event-listeners on the generated log-list-items
     * @param {logWindowEventListener} logWindowEventListener 
     */
    setLogWindowEventListener(logWindowEventListener) {
        this.__logWindowEventListener = logWindowEventListener;
    }
    
    // ****************************************************************************************** //
    // ******************* MEHTODS HANLDING THE TAB NAVIGATION ********************************** // 

    /**
     * Switch the current calculation-log tab to the 'lastCalculations' tab
     */
    switchToLastCalculationsTab() {
        document.getElementById("calculationLogTab").className = navigationTabStatusEnum.ACTIVE_TAB;
        document.getElementById("logOptionsTab").className = navigationTabStatusEnum.INACTIVE_TAB;
        document.getElementById("calculationLogContent").className = navigationTabStatusEnum.ACTIVE_CONTENT;
        document.getElementById("logOptionsContent").className = navigationTabStatusEnum.INACTIVE_CONTENT;
    }

    /**
     * Switch the current calculation-log tab to the 'logOptions' tab
     */
    switchToLogOptionsTab() {
        document.getElementById("calculationLogTab").className = navigationTabStatusEnum.INACTIVE_TAB;
        document.getElementById("logOptionsTab").className = navigationTabStatusEnum.ACTIVE_TAB;
        document.getElementById("calculationLogContent").className = navigationTabStatusEnum.INACTIVE_CONTENT;
        document.getElementById("logOptionsContent").className = navigationTabStatusEnum.ACTIVE_CONTENT;
    }

    // ****************************************************************************************** //
    // *********************** MANAGING CALCULATION LOG ENTRIES ********************************* // 

    /**
     * Creates a new html list element containg the current calculation to be shown in the log 
     * This list element is getting published to the gui
     * @param {String} term term to be added to the current log
     */
    addNewTermListEntry(term, atLogPosition) {
        const option = this.__createTermListItem(term, atLogPosition);
        document.getElementById("calculationLogList").appendChild(option);
    }

    /**
     * Overwrite the currently saved terms, with the given calculation log
     * @param {...String} calculationLog String array containing multiple caluclations (best case - 5x)
     */
    modifyTermListEntries(...calculationLog) {
        let entryPosition = 0;
        calculationLog.forEach((logEntry) => {
            document.getElementById(this.__getLogEntryHtmlID(entryPosition)).innerHTML = logEntry;
            entryPosition++;
        });
    }

    /**
     * Creates a html list object, which can be added to the gui / html-file
     * @param {Term} term term to be added to be list
     * @returns {option} entry to be added to the list
     */
    __createTermListItem(term, atLogPosition) {
        const option = document.createElement("li");
        option.className = "list-group-item";
        option.innerHTML = term;
        option.id = this.__getLogEntryHtmlID(atLogPosition);
        option.addEventListener("click", () => this.__logWindowEventListener.consumeClickedOnLoggedTermEvent(option.innerHTML));
        return option;
    }

    /**
     * Reconstructs the html id for the current log entry
     * @param {number} atLogPosition id of the log-entry
     * @returns {String} html-id
     */
    __getLogEntryHtmlID(atLogPosition) {
        return "log"+atLogPosition;
    }

    // ****************************************************************************************** //
    // ****************************** SAVE / LOAD / DELETE LOGS ********************************* // 

    /**
     * 
     * @param {String} logKey 
     */
    addLogToSelectableLogs(logKey) {
        const deleteOption = this.__createLogSelectOption(logKey);
        const loadOption = this.__createLogSelectOption(logKey);

        document.getElementById("loadLogOptions").appendChild(loadOption);
        document.getElementById("deleteLogOptions").appendChild(deleteOption);
    }

    /**
     * 
     * @param {String} logKey 
     */
    removeLogFromSelectableLogs(logKey) {

        const deleteOptions = document.getElementById("loadLogOptions").childNodes;
        const loadOptions = document.getElementById("deleteLogOptions").childNodes;

        deleteOptions.forEach((option) => {
            if (option.innerHTML === logKey) {
                option.remove();
            }
        });

        loadOptions.forEach((option) => {
            if (option.innerHTML === logKey) {
                option.remove();
            }
        });
    }

    /**
     * 
     * @param {String} logKey 
     */
    __createLogSelectOption(logKey) {
        const option = document.createElement("option");
        option.innerHTML = logKey;
        return option;
    }

}