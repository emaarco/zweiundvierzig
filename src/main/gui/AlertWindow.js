"use strict";

import AlertMessage from "../data/AlertMessage.js";
import alertTypeEnum from "../enum/AlertTypeEnum.js";
import operatorEnum from "../enum/OperatorEnum.js";

/**
 * A class used to publish alerts on the gui to inform the user about his input actions
 */
export default class AlertWindow {

    /**
     * 
     */
    constructor() {
        this.__currentDefaultAlert;
        this.__timeoutIncidentFlag = 0;
    }

    // ****************************************************************************************** //
    // ***************************** USER INPUT SPECIFIC ALERTS ********************************* // 

    /**
     * Shows a five seconds lasting alert to inform the user about an invalid keyboard event.
     * @param {String} buttonPressed asci-keycode of the pressed button
     */
    publishInvalidKeyboardInputWarning(buttonPressed) {
        const alertTitle = "WARNING";
        const alertDescription = buttonPressed + " is no valid calculator-Button";
        const alertNote = "Allowed operations are: operators (+,-,*,/;=), numbers (0-9), enter, delete, ESC";

        const newAlert = this.__buildAlert(alertTypeEnum.DANGER, alertTitle, alertDescription, alertNote, false);

        this.__parseMessageToDocument(newAlert);
        this.__waitAndReturnToDefaultAlert(2500);
    }

    /**
     * Publishes an alert to inform the user, that the calculator is turned off.
     */
    publishCalculatorOfflineAlert() {
        const alertTitle = "OFFLINE";
        const alertDescription = "The calculator is currently turned off";
        const alertNote = "In case you want to make a calculation, you need to turn it on";

        const newAlert = this.__buildAlert(alertTypeEnum.DARK, alertTitle, alertDescription, alertNote, false);

        this.__parseMessageToDocument(newAlert);
    }

    /**
     * Publishes an alert to inform the user, that the calculator is turned on
     */
    publishCalculatorOnlineAlert() {
        const alertTitle = "ONLINE";
        const alertDescription = "The calculator is turned on. You can enter your calculation now!";
        const alertNote = "You can use either your keyboard or the displayed buttons to enter a valid term.";

        const newAlert = this.__buildAlert(alertTypeEnum.SECONDARY, alertTitle, alertDescription, alertNote, true);

        this.__parseMessageToDocument(newAlert);
    }

    // ****************************************************************************************** //
    // ***************************** TERM SPECIFIC ALERTS *************************************** // 

    /**
     * 
     */
    publishValidCalculationAlert() {
        const alertTitle = "INFO";
        const alertDescription = "The current caluclation is valid";
        const alertNote = "Continue entering your calculation!";

        const newAlert = this.__buildAlert(alertTypeEnum.INFO, alertTitle, alertDescription, alertNote, true);

        this.__parseMessageToDocument(newAlert);
    }

    /**
     * 
     */    
    publishSeperatorAlreadySetAlert() {
        const alertTitle = "INFO";
        const alertDescription = "You have already set a seperator!";
        const alertNote = "You can't have two seperators in one number!";

        const newAlert = this.__buildAlert(alertTypeEnum.WARNING, alertTitle, alertDescription, alertNote, false);

        this.__parseMessageToDocument(newAlert);
        this.__waitAndReturnToDefaultAlert(2500);
    }

    /**
     * 
     */
    publishMinusMinusIsPlusAlert() {
        const alertTitle = "EASTEREGG:";
        const alertDescription = "You entered two consecutive minus signs, thats a plus!";
        const alertNote = "- + - = +";        

        const newAlert = this.__buildAlert(alertTypeEnum.INFO, alertTitle, alertDescription, alertNote, false);

        this.__parseMessageToDocument(newAlert);
        this.__waitAndReturnToDefaultAlert(2500);
    }

    /**
     * 
     * @param {*} op1 
     * @param {*} op2 
     */
    publishReplaceOperatorAlert(op1, op2) {
        const alertTitle = "INFO:";
        const alertDescription = "You cant input two operators consecutively.";
        const alertNote = "Replaced operator " + operatorEnum(op1) + " with " + operatorEnum(op2);
        
        const newAlert = this.__buildAlert(alertTypeEnum.WARNING, alertTitle, alertDescription, alertNote, false);

        this.__parseMessageToDocument(newAlert);
        this.__waitAndReturnToDefaultAlert(2500);
    }

    /**
     * 
     */
    publishTooManyOperatorAlert() {
        const alertTitle = "INFO:";
        const alertDescription = "You are only allowed to use one operator per calculation!";
        const alertNote = "Hit equal before inserting next calculation!";

        const newAlert = this.__buildAlert(alertTypeEnum.INFO, alertTitle, alertDescription, alertNote, false);

        this.__parseMessageToDocument(newAlert);
    }

    /**
     * 
     */
    publishMissingFirstNumberAlert() {
        const alertTitle = "WARNING:";
        const alertDescription = "Can't calculate with missing values!";
        const alertNote = "Please insert values!";

        const newAlert = this.__buildAlert(alertTypeEnum.DANGER, alertTitle, alertDescription, alertNote, false);

        this.__parseMessageToDocument(newAlert);
        this.__waitAndReturnToDefaultAlert(2500);
    }

    /**
     * 
     */
    publishMissingOperatorAlert() {
        const alertTitle = "WARNING:";
        const alertDescription = "Can't calculate without an operator!";
        const alertNote = "Please enter an operator!";

        const newAlert = this.__buildAlert(alertTypeEnum.DANGER, alertTitle, alertDescription, alertNote, false);
        
        this.__parseMessageToDocument(newAlert);
        this.__waitAndReturnToDefaultAlert(2500);
    }
    
    /**
     * 
     */
    publishMissingSecondNumberAlert() {
        const alertTitle = "WARNING:";
        const alertDescription = "Can't calculate without a second value!";
        const alertNote = "Enter a second value!";

        const newAlert = this.__buildAlert(alertTypeEnum.DANGER, alertTitle, alertDescription, alertNote, false);

        this.__parseMessageToDocument(newAlert);
        this.__waitAndReturnToDefaultAlert(2500);
    }

    /**
     * 
     */
    publishEnterTheVoidAlert(voidCount) {
        if (voidCount >= 5) {
            document.body.style.backgroundImage = "url('../../../img/The_Void.jpg')";
            document.getElementsByClassName("container")[0].style.visibility = "hidden";

            setTimeout(() => {
                document.getElementsByClassName("container")[0].style.visibility = "visible";
                document.body.style.backgroundImage = "none";
            }, 5000);
        }

        const alertTitle = "THE VOID:";
        const alertDescription = "You can't delete nothing! Stop hitting backspace!";
        const alertNote = "Do you want to enter the void?";

        const newAlert = this.__buildAlert(alertTypeEnum.DANGER, alertTitle, alertDescription, alertNote, false);
        
        this.__parseMessageToDocument(newAlert);
    }

    /**
     * 
     */
    publishInvalidTerm() {
        const alertTitle = "WARNING:";
        const alertDescription = "Invalid term!";
        const alertNote = "Enter a valid term!";

        const newAlert = this.__buildAlert(alertTypeEnum.DANGER, alertTitle, alertDescription, alertNote, false);

        this.__parseMessageToDocument(newAlert);
    }

    /**
     * 
     */
    publishCannotInsertAnsAlert() {
        const alertTitle = "WARNING:";
        const alertDescription = "You cant insert an ANS with decimals into a decimal number!";
        const alertNote = "Delete the decimal in number before hitting ANS!";

        const newAlert = this.__buildAlert(alertTypeEnum.DANGER, alertTitle, alertDescription, alertNote, false);

        this.__parseMessageToDocument(newAlert);
    }

    /**
     * 
     */
    publishAnsIsEmptyAlert() {
        const alertTitle = "NOT POSSIBLE:";
        const alertDescription = "ANS is empty!";
        const alertNote = "Calculate something before trying to insert ANS!";

        const newAlert = this.__buildAlert(alertTypeEnum.WARNING, alertTitle, alertDescription, alertNote, false);

        this.__parseMessageToDocument(newAlert);
        this.__waitAndReturnToDefaultAlert(2500);
    }

    /**
     * Publishes an alert to inform the user, that the calculation has been deleted. 
     */
    publishClearAllAlert() {
        const alertTitle = "INFO:";
        const alertDescription = "Your recent calculation has been deleted";
        const alertNote = "You can now start entering a new calculation";

        const newAlert = this.__buildAlert(alertTypeEnum.INFO, alertTitle, alertDescription, alertNote, false);

        this.__parseMessageToDocument(newAlert);
        this.__waitAndReturnToDefaultAlert(2500);
    }

    // ****************************************************************************************** //
    // ******************************* RESULT SPECIFIC ALERTS *********************************** // 

    /**
     * 
     */
    publishTermSuccessfullyCalculatedAlert() {
        const alertTitle = "GENIOUS:";
        const alertDescription = "Your calculation got caluclated successfully!";
        const alertNote = "You can use the result directly for your next calculation!";

        const newAlert = this.__buildAlert(alertTypeEnum.SUCCESS, alertTitle, alertDescription, alertNote, false);

        this.__parseMessageToDocument(newAlert);
        this.__waitAndReturnToDefaultAlert(5000);
    }

    /**
     * 
     */
    publishDivisionZero() {
        const alertTitle = "WARNING:";
        const alertDescription = "You cant divide through 0!";
        const alertNote = "Enter a valid number greater 0!";

        const newAlert = this.__buildAlert(alertTypeEnum.DANGER, alertTitle, alertDescription, alertNote, false);

        this.__parseMessageToDocument(newAlert);
    }


    // ****************************************************************************************** //
    // ******************************* LOGGING SPECIFIC ALERTS ********************************** // 

    /**
     * 
     * @param {String} logKey 
     */
    publishLogSuccessfullySavedAlert(logKey, logGotOverwriten) {
        const alertTitle = "INFO:";
        const alertDescription = "Your recent calculations have been saved to " + logKey;

        let alertNote = "";
        if (logGotOverwriten) {
            alertNote = "As there was allready an existing log under this file-name, the previos log got overwritten";
        } else {
            alertNote = "You can access them by loading the file with the mentioned name";
        }
        
        const newAlert = this.__buildAlert(alertTypeEnum.SUCCESS, alertTitle, alertDescription, alertNote, false);

        this.__parseMessageToDocument(newAlert);
        this.__waitAndReturnToDefaultAlert(5000);
    }

    /**
     * 
     * @param {String} logKey 
     */
    publishLogSuccessfullyLoadedAlert(logKey) {
        const alertTitle = "INFO:";
        const alertDescription = "Successfully loaded the '" + logKey + "' log.";
        const alertNote = "You can access the, in there saved calculations, by switching to the 'Last Calculations' tab!";
        
        const newAlert = this.__buildAlert(alertTypeEnum.SUCCESS, alertTitle, alertDescription, alertNote, false);

        this.__parseMessageToDocument(newAlert);
        this.__waitAndReturnToDefaultAlert(5000);
    }

    /**
     * 
     * @param {String} logKey 
     */
    publishLogSuccessfullyDeletedAlert(logKey) {
        const alertTitle = "INFO:";
        const alertDescription = "Successfully deleted the '" + logKey + "' log.";
        const alertNote = "The log got deleted and cannot be recovered";
        
        const newAlert = this.__buildAlert(alertTypeEnum.SUCCESS, alertTitle, alertDescription, alertNote, false);

        this.__parseMessageToDocument(newAlert);
        this.__waitAndReturnToDefaultAlert(5000);
    }

    // ****************************************************************************************** //
    // ***************************** PRIVATE HELPER METHODS ************************************* // 

    /**
     * Factory method to create a new alert.
     * Will set the alert created, as the default alert, in case "isDefault" is true
     * @param {alertTypeEnum} alertType type of the alert (css-id / class type)
     * @param {String} alertTitle alert title to be shown in the gui
     * @param {String} alertDescription alert description to be shown in the gui
     * @param {String} alertNote alert note to be shown in the gui
     * @param {boolean} isDefault defines whether the alert is an default alert or not
     * @returns {AlertMessage} the alert, created
     */
    __buildAlert(alertType, alertTitle, alertDescription, alertNote, isDefault) {
        const newAlert = new AlertMessage(alertType, alertTitle, alertDescription, alertNote, isDefault);

        newAlert.setAlertType(alertType);
        newAlert.setAlertTitle(alertTitle);
        newAlert.setAlertDescription(alertDescription);
        newAlert.setAlertNote(alertNote);
        newAlert.setIsDefaultAlert(isDefault);

        if (newAlert.isDefaultAlert) {
            this.__currentDefaultAlert = newAlert;
        }

        return newAlert;   
    }

    /**
     * Displays a new alert in the gui
     * @param {AlertMessage} alertMessage alert to be shown in the gui
     */
    __parseMessageToDocument(alertMessage) {
        if (alertMessage instanceof AlertMessage) {
            document.getElementById("alertMessage").className = alertMessage.alertType;
            document.getElementById("alertHeading").innerHTML = alertMessage.alertTitle;
            document.getElementById("alertDescription").innerHTML = alertMessage.alertDescription;
            document.getElementById("alertNote").innerHTML = alertMessage.alertNote;
        }
    }

    /**
     * Will wait for 2.5 seconds. After the timeout it will publish the current default alert 
     * Will not publish the current default alert if during this time, another interrupting timeout alert got published!
     */
    __waitAndReturnToDefaultAlert(waitForMiliseconds) {
        this.__timeoutIncidentFlag += 1 
        const currentIncident_Flag = this.__timeoutIncidentFlag;

        setTimeout(() => {
            // Checks if the currently visible alert 
            // is still the alert, which was active before starting the timeout
            if (this.__timeoutIncidentFlag === currentIncident_Flag) {
                this.__parseMessageToDocument(this.__getCurrentDefaultAlert());
            }
        }, waitForMiliseconds);
    }

    /**
     * Setter method to set a default Alert
     * @param {AlertMessage} defaultAlert new default alert
     */
    __setCurrentDefaultAlert(defaultAlert) {
        if (defaultAlert instanceof AlertMessage) {
            this.__currentDefaultAlert = defaultAlert;
        }
    }

    /**
     * Getter metohd to retrieve to current default alert
     * @returns {AlertMessage} current Default alert
     */
    __getCurrentDefaultAlert() {
        return this.__currentDefaultAlert;
    }
} 