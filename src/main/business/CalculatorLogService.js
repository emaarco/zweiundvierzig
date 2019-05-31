'use strict'

import CalculatorLogWindow from "../gui/CalculatorLogWindow.js";

export default class CalculatorLogService {

    /**
     * constructur initializing the log-Service variables to process the last 5 results
     * @param {CalculatorLogWindow} calculatorLogWindow logWindow to publish the last results to the user
     */
    constructor(calculatorLogWindow) {
        if (calculatorLogWindow instanceof CalculatorLogWindow) {
            this.__calculatorLogWindow = calculatorLogWindow;
        }
        this.__log = [];
    }

    // ****************************************************************************************** //
    // ************************** SAVE RESULTS TO THE TERM LOG ********************************** // 

    /**
     * saveCurrentLog the last 5 terms to array
     * @param {Term} term term to be saveCurrentLogd to the log
     */
    logCalculatedTerm(termToBeAdded) {
        if (this.__log.length < 5) {
            this.__log.push(termToBeAdded.toString());
            this.__calculatorLogWindow.addNewTermListEntry(termToBeAdded.toString(), this.__log.length-1);
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
     * save the current log to server
     * EXAMPLE CODE FROM exam.md NOT TESTED
     */
    saveCurrentLog(data, callback) {
        setTimeout(() => {
            let err = null;
    
            try {
                localStorage.setItem("myData", JSON.stringify(data));
            } catch (e) {
                err = e;
            }
            callback(err);
        }, 1000); // fake a response delay with 1000ms    
    }

    /**
     * Load the log from the server
     * EXAMPLE CODE FROM exam.md NOT TESTED
     */
    loadLogFromServer(callback) {
        setTimeout(() => {
            let err = null;
            let data;
    
            try {
                data = JSON.parse(localStorage.getItem("myData"));
            } catch (e) {
                err = e;
            }
            callback(err, data);
        }, 1000); // fake a response delay with 1000ms    
    }
}