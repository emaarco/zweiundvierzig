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
     * 
     * @param {*} logWindowEventListener 
     */
    setLogWindowEventListener(logWindowEventListener) {
        this.__logWindowEventListener = logWindowEventListener;
    }
    
    // ****************************************************************************************** //
    // ******************* MEHTODS HANLDING THE TAB NAVIGATION ********************************** // 

    /**
     * 
     */
    switchToLastCalculationsTab() {
        document.getElementById("calculationLogTab").className = navigationTabStatusEnum.ACTIVE_TAB;
        document.getElementById("logOptionsTab").className = navigationTabStatusEnum.INACTIVE_TAB;
        document.getElementById("calculationLogContent").className = navigationTabStatusEnum.ACTIVE_CONTENT;
        document.getElementById("logOptionsContent").className = navigationTabStatusEnum.INACTIVE_CONTENT;
    }

    /**
     * 
     */
    switchToLogOptionsTab() {
        document.getElementById("calculationLogTab").className = navigationTabStatusEnum.INACTIVE_TAB;
        document.getElementById("logOptionsTab").className = navigationTabStatusEnum.ACTIVE_TAB;
        document.getElementById("calculationLogContent").className = navigationTabStatusEnum.INACTIVE_CONTENT;
        document.getElementById("logOptionsContent").className = navigationTabStatusEnum.ACTIVE_CONTENT;
    }

    // ****************************************************************************************** //
    // ******************* MEHTODS HANLDING THE LOG PUBLICATION ********************************* // 

    /**
     * Create the HTML list items
     * Set termAsString as text
     * Set class "list-group-item"
     * set id log+length
     * @param {String} term 
     */
    addNewTermListEntry(term, atLogPosition) {
        const node = this.__createListItem(term, atLogPosition);
        document.getElementById("calculationLogList").appendChild(node);
    }

    /**
     * Change text of log+length element to new term
     * @param {Array<String>} term 
     */
    modifyTermListEntries(...calculationLog) {
        let entryPosition = 0;
        calculationLog.forEach((logEntry) => {
            document.getElementById(this.__getLogEntryHtmlID(entryPosition)).innerHTML = logEntry;
            entryPosition++;
        });
    }

    /**
     * 
     * @param {Term} term term to be added to be list
     * @returns {Node} entry to be added to the list
     */
    __createListItem(term, atLogPosition) {
        const node = document.createElement("li");
        const textnode = document.createTextNode(term);
        node.appendChild(textnode);
        node.className = "list-group-item";
        node.id = this.__getLogEntryHtmlID(atLogPosition);
        node.addEventListener("click", () => this.__logWindowEventListener.consumeClickedOnLoggedTermEvent(node.innerHTML));
        return node;
    }

    /**
     * 
     * @param {number} atLogPosition 
     */
    __getLogEntryHtmlID(atLogPosition) {
        return "log"+atLogPosition;
    }
}